import { Router } from "express";
import { FileUploadRoutes } from "./file-upload/routes";
import { UsersRoutes } from "./users/routes";
import { UsersService } from "./services/users.service";
import { FileUploadService } from "./services/file-upload.service";

/* Crear instancias de los servicios */
const usersService = new UsersService();
const fileUploadService = new FileUploadService(usersService);

export class AppRoutes {
  /* aquí se utiliza static functions porque como no se hará inyección de dependencias entonces no sería necesario instanciar la clase AppRoutes y solo se colocaría directamente. También se están usando el get function para tener otra forma de realizar esta función, se podría realizar sin ese get (son solo diferentes formas de hacerlo) */
  static get routes(): Router {
    const router = Router();

    /* Routes de las API */
    /* este sería un middelware básicamente porque es una función que se va a ejecutar cuando pase la ruta por aquí en "/api/todos" */
    // router.use("/api/todos", TodosRoutes.routes); // ejemplo de lo que podría crearse a futuro para usar en este archivo de routes

    /* se hará refactorizaciones para compartir las mismas instancias de servicios (cuando se crea la primera vez) entre las distintas rutas que hayan, como por ejemplo, de FileUploadRoutes y UsersRoutes. Entonces hay que asegurarnos de que las instancias de los servicios, como UsersService y FileUploadService, se compartan correctamente para usar la misma instancia de los servicios en ambas rutas */
    /* ya no se crearán instancias separadas dentro de FileUploadRoutes y UsersRoutes (porque ahí se estában creando nuevas instancias de los servicios y por ende al querer comunicar los datos o propiedades llegaban vacíos porque se estaba creando nuevas instancias cada que se creaba la clase llamando al endpoint) */
    router.use("/api/upload", new FileUploadRoutes(fileUploadService).routes);
    router.use("/api/users", new UsersRoutes(usersService).routes);

    return router;
  }
}
