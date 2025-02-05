
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      console.log("validation completed");
      req.body=parsedData.body
      req.query = parsedData.query;
      req.params = parsedData.params;

      next();
    } catch (error) {
        next(error)
    }
  };

