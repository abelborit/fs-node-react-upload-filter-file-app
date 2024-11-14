import { Router } from "express";
import { FileUploadController } from "./controller";
import { MulterAdapter } from "../../config";

export class FileUploadRoutes {
  /* aquí se utiliza static functions porque como no se hará inyección de dependencias entonces no sería necesario instsanciar la clase AppRoutes y solo se coloca directo. También se están usando el get function para tener otra forma de realizar esta función, se podría realizar sin ese get (son solo diferentes formas de hacerlo) */
  static get routes(): Router {
    const router = Router();

    const fileUploadController = new FileUploadController();

    router.post(
      "/single",
      [MulterAdapter.uploadSingle("file")], // si es un solo middleware se puede colocar directo MulterAdapter.upload sin el arreglo. El "file" es el nombre que tendrá en la solicitud del cuerpo, es decir, este middleware hará que en la request se cree una propiedad llamada "file"
      fileUploadController.uploadSingleFile
    );

    return router;
  }
}
