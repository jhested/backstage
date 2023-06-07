import { PluginEnvironment } from '../types';
import winston from 'winston';
import { setRootLogger } from '@backstage/backend-common';
import createPlugin from './app'; // path to your .ts file

// Mock dependencies
jest.mock('@backstage/backend-common', () => ({
    ...jest.requireActual('@backstage/backend-common'),
    setRootLogger: jest.fn(),
  }));

describe('createPlugin', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call setRootLogger with the correct logger in production environment', () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    const unbreaker = {} as PluginEnvironment;
    const mockLogger = winston.createLogger();

    // Call your function
    createPlugin(unbreaker);

    expect(setRootLogger).toHaveBeenCalledWith(mockLogger);

    process.env.NODE_ENV = originalNodeEnv;
  });

  // Other tests for createPlugin function...
});