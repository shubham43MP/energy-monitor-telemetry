import path from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
