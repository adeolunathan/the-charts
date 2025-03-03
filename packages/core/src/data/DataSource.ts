/**
 * Data source and transformation interfaces for BizCharts
 */

/**
 * Represents a column/field in a dataset
 */
export interface DataField {
  /**
   * The name/key of the field
   */
  name: string;

  /**
   * The data type of the field
   */
  type: 'string' | 'number' | 'date' | 'boolean' | 'category';

  /**
   * Optional display label for the field
   */
  label?: string;

  /**
   * Optional format string for displaying values
   */
  format?: string;

  /**
   * For category fields, the possible values
   */
  categories?: string[];
}

/**
 * Represents a row of data
 */
export type DataRow = Record<string, any>;

/**
 * Interface for data processing callbacks
 */
export interface DataProcessor {
  /**
   * Process the data before it's used for rendering
   * @param data The raw data to process
   * @returns The processed data
   */
  process(data: DataRow[]): DataRow[];
}

/**
 * Base interface for all data sources
 */
export interface DataSource {
  /**
   * The schema defining the fields in this data source
   */
  fields: DataField[];

  /**
   * Get all data rows from this source
   * @returns Promise resolving to an array of data rows
   */
  getData(): Promise<DataRow[]>;

  /**
   * Get a subset of data from this source
   * @param start The starting index
   * @param limit The maximum number of rows to return
   * @returns Promise resolving to an array of data rows
   */
  getDataSlice(start: number, limit: number): Promise<DataRow[]>;

  /**
   * Get the total number of records in this data source
   * @returns Promise resolving to the number of records
   */
  getCount(): Promise<number>;

  /**
   * Add a data processor to the processing pipeline
   * @param processor The processor to add
   */
  addProcessor(processor: DataProcessor): void;

  /**
   * Remove a data processor from the pipeline
   * @param processor The processor to remove
   */
  removeProcessor(processor: DataProcessor): void;

  /**
   * Clear all data processors
   */
  clearProcessors(): void;

  /**
   * Refresh the data from its original source
   * @returns Promise that resolves when the data is refreshed
   */
  refresh(): Promise<void>;
}