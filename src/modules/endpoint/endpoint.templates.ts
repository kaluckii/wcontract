export const endpointsTemplate = (appName: string) => `// This file is auto-generated. Do not edit manually.

import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import z from 'zod';

import { readContract, readContractConfig } from './contract.repository';

const staticHeaders = (file: string) => ({
  'Content-Type': 'application/typescript',
  'Content-Disposition': 'inline; filename=' + file,
});

const contractStatic = new Hono()
  .get('/contract', zValidator('query', z.object({ name: z.string() })), async (c) => {
    const { name } = c.req.valid('query');
    const { content, file } = await readContract('${appName}', name);
    return c.text(content, 200, staticHeaders(file));
  })

  .get('/contract/config', async (c) => {
    const config = await readContractConfig();
    return c.json(config, 200, { 'Content-Type': 'application/json' });
  });

export { contractStatic };
`;

export const repositoryTemplate = `// This file is auto-generated. Do not edit manually.

import { readFile } from 'fs/promises';
import { HTTPException } from 'hono/http-exception';

export async function readContract(app: string, name: string): Promise<{ content: string; file: string }> {
  // This function reads a contract file for the specified app and name.
  // It constructs the file path based on the app and name, and returns the content and file name.

  const fileName = \`\${app}.contract.\${name}.d.ts\`;
  const contractPath = \`./contract/export/\${fileName}\`;

  try {
      const content = await readFile(contractPath, 'utf-8');
      return { content, file: fileName };
  } catch (err) {
      throw new HTTPException(404, {
          message: \`Contract file not found at \${contractPath}\`,
      });
  }
}

export async function readContractConfig(): Promise<{ emit: boolean }> {
  // This function reads the contract configuration file.
  // It is used to determine fore external synchronization.

  const configPath = './wcontract.config.json';
  try {
      const configContent = await readFile(configPath, 'utf-8');
      return JSON.parse(configContent);
  } catch (err) {
      throw new HTTPException(500, {
          message: \`Failed to read wcontract configuration from \${configPath}\`,
      });
  }
}
`;

export const indexTemplate = `// This file is auto-generated. Do not edit manually.

export { contractStatic } from './contract.endpoints';
`;
