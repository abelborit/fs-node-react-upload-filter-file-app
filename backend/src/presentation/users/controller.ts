import { Request, Response } from "express";
import { UsersService } from "../services/users.service";

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* se está pasando como función flecha en lugar de función tradicional para poder tener correctamente el contexto del ".this" sin necesidad de hacer el ".bind(.....)" en las rutas */
  public getUsers = (request: Request, response: Response) => {
    /* se coloca el -- as { q: string | undefined } -- para que tenga un tipado y no salga un error similar a -- error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'. Type 'undefined' is not assignable to type 'string'. -- */
    const { q } = request.query as { q: string | undefined };

    return this.usersService
      .getFilteredUsers(q)
      .then((queryParameterAndData) => {
        // console.log({ queryParameterAndData });

        response.status(200).json({
          data: queryParameterAndData,
          message: "users obtained successfully",
        });
      })
      .catch((error) => {
        // console.log({ error });

        switch (error.message) {
          case "query param is required":
            return response
              .status(404)
              .json({ data: [], message: "query param is required" });

          case "No data available. Please upload the file first":
            return response.status(400).json({
              data: [],
              message: "No data available. Please upload the file first",
            });

          default:
            return response
              .status(500)
              .json({ data: null, message: "Internal Server Error" });
        }
      });
  };
}
