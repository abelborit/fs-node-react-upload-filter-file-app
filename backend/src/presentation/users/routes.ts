import { Router } from "express";
import { UsersController } from "./controller";
import { UsersService } from "../services/users.service";

export class UsersRoutes {
  constructor(private usersService: UsersService) {}

  /* se quita static para facilitar la inyección de dependencias. Al quitar el static, se puede realizar la inyección de dependencias más fácilmente, en este caso, para pasar las instancias de los servicios directamente a través del constructor, lo que mejora la flexibilidad de la aplicación y facilita la reutilización de las instancias de los servicios */
  /* Cuando se utiliza el modificador static en un método, el método se vuelve estático, lo que significa que no se necesita crear una instancia de la clase para llamar al método. Esto es útil si no se necesita dependencias dinámicas. Sin embargo, en el caso de que se quiera inyectar dependencias (como en este caso, las instancias de FileUploadService y UsersService), eliminando static nos permite que el constructor reciba las dependencias que se necesita para crear las rutas */
  public get routes(): Router {
    const router = Router();

    const usersController = new UsersController(this.usersService);

    router.get("/", usersController.getUsers);

    return router;
  }
}
