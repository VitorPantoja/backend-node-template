import { DataSource, type DataSourceOptions } from 'typeorm';

export class DataSourceService extends DataSource {
  constructor(options: DataSourceOptions) {
    super(options);
  }

  async connectt() {
    return {};
  }
}
