// import { dataSource } from './application/services/datasource.service';
import { startServer } from './application/usecases/http-server';
import { server } from './infrastructure/api/rest';

// startServer(server, dataSource);
startServer(server);
