import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const handleInputErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores, devuelve una respuesta con el estado 400
    res.status(400).json({ errors: errors.array() });
    return; // Termina la ejecución aquí para que no llame a next()
  }

  next(); // Si no hay errores, pasa al siguiente middleware o controlador
};

export default handleInputErrors;

