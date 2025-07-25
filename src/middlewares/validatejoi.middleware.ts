import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

interface ExtendedSchemas {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
}

export function validateBody(schemas: ObjectSchema | ExtendedSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    let bodySchema: ObjectSchema | undefined;
    let paramsSchema: ObjectSchema | undefined;
    let querySchema: ObjectSchema | undefined;

    if ('validate' in schemas) {
      bodySchema = schemas as ObjectSchema;
    } else {
      const extended = schemas as ExtendedSchemas;
      bodySchema = extended.body;
      paramsSchema = extended.params;
      querySchema = extended.query;
    }

    const validations: {
      key: 'body' | 'params' | 'query';
      data: Record<string, unknown>;
      schema?: ObjectSchema;
    }[] = [
      { key: 'body', data: req.body, schema: bodySchema },
      { key: 'params', data: req.params, schema: paramsSchema },
      { key: 'query', data: req.query, schema: querySchema },
    ];

    for (const { key, data, schema } of validations) {
      if (schema) {
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
          return res.status(400).json({
            message: `Validation failed for ${key}`,
            details: error.details.map((d) => d.message),
          });
        }
      }
    }

    next();
  };
}
