import { Request, Response } from "express";

export class UsersController {
  constructor() {}

  /* se está pasando como función flecha en lugar de función tradicional para poder tener correctamente el contexto del ".this" sin necesidad de hacer el ".bind(.....)" en las rutas */
  public getUsers = (request: Request, response: Response) => {
    response
      .status(200)
      .json({ data: [], message: "users obtained successfully" });
  };
}
