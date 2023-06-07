import { createRouter } from '@backstage/plugin-app-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import winston from 'winston';

import ecsFormat from '@elastic/ecs-winston-format'
import { setRootLogger } from '@backstage/backend-common';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  if(process.env.NODE_ENV === 'production') {
    const logger = winston.createLogger({  
      format: ecsFormat(),  // Use ecsFormat here
      transports: [
        new winston.transports.Console()
      ],
    });
    
    // Then inject the logger into the app like so:
    setRootLogger(logger);
  }

  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    appPackageName: 'app',
  });
}
