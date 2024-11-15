import { Router } from "express";
import { FileUploadController } from "./controller";
import { MulterAdapter } from "../../config";
import { FileUploadService } from "../services/file-upload.service";

export class FileUploadRoutes {
  /* aquí se utiliza static functions porque como no se hará inyección de dependencias entonces no sería necesario instsanciar la clase AppRoutes y solo se coloca directo. También se están usando el get function para tener otra forma de realizar esta función, se podría realizar sin ese get (son solo diferentes formas de hacerlo) */
  static get routes(): Router {
    const router = Router();

    const fileUploadService = new FileUploadService();
    const fileUploadController = new FileUploadController(fileUploadService);

    router.post(
      "/single",
      [MulterAdapter.uploadSingle("file")], // si es un solo middleware se puede colocar directo MulterAdapter.upload sin el arreglo. El "file" es el nombre que tendrá en la solicitud del cuerpo, es decir, este middleware hará que en la request se cree una propiedad llamada "file"

      /* aquí sería necesario hacer el -- .bind(......) -- porque sino entonces nos saldrá un error similar a "TypeError: Cannot read properties of undefined (reading 'fileUploadService')" debido a que el controlador "FileUploadController" no está recibiendo correctamente la instancia de "FileUploadService" en su constructor, por lo que "fileUploadService" es undefined */
      /* En Express, cuando se pasa un método de clase directamente como middleware (fileUploadController.uploadSingleFile), el "this" del método puede perder el contexto de la instancia. Esto es debido a cómo JavaScript maneja el contexto de this, por lo tanto, es recomendable hacer bind al método. Entonces aplicamosel .bind para que el método uploadSingleFile mantenga el contexto de this */
      /* NOTA: Para evitar el bind, una forma común es definir "uploadSingleFile" (el que viene de fileUploadController) como una función flecha en el controlador, ya que las funciones flecha mantienen el contexto de this de la clase sin necesidad de hacer bind explícito. Al definir "uploadSingleFile" como una función flecha, el valor de this se refiere automáticamente a la instancia de "FileUploadController" y se elimina la necesidad de hacer bind en el archivo de rutas */
      // fileUploadController.uploadSingleFile
      fileUploadController.uploadSingleFile.bind(fileUploadController)
    );

    return router;
  }
}
