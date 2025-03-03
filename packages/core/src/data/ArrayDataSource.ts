/**
 * Implementation of DataSource using JavaScript arrays
 */

import { DataSource, DataField, DataRow, DataProcessor } from './DataSource';

/**
 * A data source implementation that uses JavaScript arrays as the backing store
 */
export class ArrayDataSource implements DataSource {
  /**
   * The schema defining the fields in this data source
   */
  fields: DataField[];

  /**
   * The raw data
   */
  private data: DataRow[];

  /**
   * The data processors to apply
   */
  private processors: DataProcessor[] = [];

  /**
   * Creates a new array data source
   *
   * @param data The data rows
   * @param fields The field definitions. If not provided, will be inferred from the first data row
   */
  constructor(data: DataRow[], fields?: DataField[]) {
    this.data = [...data]; // Make a copy to avoid external mutation

    if (fields) {
      this.fields = [...fields];
    } else {
      this.fields = this.inferFields(data);
    }
  }

  /**
   * Get all data rows from this source
   *
   * @returns Promise resolving to an array of data rows
   */
  async getData(): Promise<DataRow[]> {
    return this.processData(this.data);
  }

  /**
   * Get a subset of data from this source
   *
   * @param start The starting index
   * @param limit The maximum number of rows to return
   * @returns Promise resolving to an array of data rows
   */
  async getDataSlice(start: number, limit: number): Promise<DataRow[]> {
    const slice = this.data.slice(start, start + limit);
    return this.processData(slice);
  }

  /**
   * Get the total number of records in this data source
   *
   * @returns Promise resolving to the number of records
   */
  async getCount(): Promise<number> {
    return this.data.length;
  }

  /**
   * Add a data processor to the processing pipeline
   *
   * @param processor The processor to add
   */
  addProcessor(processor: DataProcessor): void {
    this.processors.push(processor);
  }

  /**
   * Remove a data processor from the pipeline
   *
   * @param processor The processor to remove
   */
  removeProcessor(processor: DataProcessor): void {
    const index = this.processors.indexOf(processor);
    if (index !== -1) {
      this.processors.splice(index, 1);
    }
  }

  /**
   * Clear all data processors
   */
  clearProcessors(): void {
    this.processors = [];
  }

  /**
   * Refresh the data from its original source
   * For ArrayDataSource, this is a no-op since the data is already in memory
   *
   * @returns Promise that resolves when the data is refreshed
   */
  async refresh(): Promise<void> {
    // No-op for array data source
    return Promise.resolve();
  }

  /**
   * Set new data for this data source
   *
   * @param data The new data rows
   */
  setData(data: DataRow[]): void {
    this.data = [...data];
  }

  /**
   * Apply all processors to the given data
   *
   * @param data The data to process
   * @returns The processed data
   */
  private async processData(data: DataRow[]): Promise<DataRow[]> {
    let result = [...data];

    for (const processor of this.processors) {
      result = processor.process(result);
    }

    return result;
  }

  /**
   * Infer field definitions from a sample of data
   *
   * @param data The data to infer fields from
   * @returns The inferred field definitions
   */
  private inferFields(data: DataRow[]): DataField[] {
    if (data.length === 0) {
      return [];
    }

    const sampleRow = data[0];
    const fields: DataField[] = [];

    for (const key of Object.keys(sampleRow)) {
      const value = sampleRow[key];
      const type = this.inferType(value);

      fields.push({
        name: key,
        type,
        label: key // Default label is the same as the field name
      });
    }

    return fields;
  }

  /**
   * Infer the data type of a value
   *
   * @param value The value to infer the type of
   * @returns The inferred type
   */
  private inferType(value: any): DataField['type'] {
    if (value === null || value === undefined) {
      return 'string'; // Default to string for null/undefined
    }

    if (typeof value === 'number') {
      return 'number';
    }

    if (typeof value === 'boolean') {
      return 'boolean';
    }

    if (typeof value === 'string') {
      // Check if it's a date string
      const date = new Date(value);
      if (!isNaN(date.getTime()) && value.includes('-')) {
        return 'date';
      }
      return 'string';
    }

    if (value instanceof Date) {
      return 'date';
    }

    return 'string'; // Default to string for everything else
  }
}