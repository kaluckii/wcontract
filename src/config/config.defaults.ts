import { Config } from './config.schemas.js';

export const defaultConfig: Config = {
  $schema: 'https://raw.githubusercontent.com/your-org/wcontract/main/schema.json',
  appName: 'your-app',
  externalSources: [],
  contracts: [],
};
