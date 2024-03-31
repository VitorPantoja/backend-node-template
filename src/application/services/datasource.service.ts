import { options } from '../../infrastructure/database/database.helper';
import { DataSourceService } from '../../infrastructure/datasource';

export const dataSource = new DataSourceService({ ...options });
