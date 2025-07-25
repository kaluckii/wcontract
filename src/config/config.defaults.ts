import { Config } from './config.schemas.js';

export const defaultConfig: Config = {
  $schema: 'https://raw.githubusercontent.com/kaluckii/wcontract/refs/heads/main/static/wcontract.schema.json',
  appName: 'your-app',
  externalSources: [],
  contracts: [],
};
