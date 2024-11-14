import { Request, Response } from "express";

export class UsersController {
  constructor() {}

  public getUsers(request: Request, response: Response) {
    response
      .status(200)
      .json({ data: [], message: "users obtained successfully" });
  }
}
