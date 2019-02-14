import { config } from 'dotenv';
config();

import chalk from 'chalk';
import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as swaggerUI from 'swagger-ui-express';
import * as methodOverride from 'method-override';
import * as swaggerJSON from './swagger.json';
import { Project } from './project/model';
import errorHandler from './errorHandler';
import { User } from './login/model';
import { sequelize } from './db/sql';

import './project/controller';
import './login/controller';
import { RegisterRoutes } from './routes';

// tslint:disable-next-line: no-console
const log = console.log;

sequelize.addModels([Project, User]);

const server = () => {
    const app = express()
      .use(bodyParser.urlencoded({ extended: true }))
      .use(bodyParser.json())
      .use(methodOverride())
  
// tslint:disable-next-line: variable-name
      .use((_req: any, res: any, next: () => void) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        );
        next();
      });

    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
    RegisterRoutes(app);
    errorHandler(app);

    const port = process.env.PORT ? process.env.PORT : 1202;
  
    return new Promise<http.Server>((resolve) => {
      const s = app.listen(port, () => {
        log(chalk.blueBright(`✓ Started API server at http://localhost:${port}`));
        log(chalk.greenBright(`✓ Started Swagger UI at http://localhost:${port}/docs`));
        resolve(s);
      });
    });
  };
  
server();
