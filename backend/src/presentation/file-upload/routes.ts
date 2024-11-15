import { Router } from "express";
import { FileUploadController } from "./controller";
import { MulterAdapter } from "../../config";
import { FileUploadService } from "../services/file-upload.service";

export class FileUploadRoutes {
  constructor(private fileUploadService: FileUploadService) {}

  /* se quita static para facilitar la inyección de dependencias. Al quitar el static, se puede realizar la inyección de dependencias más fácilmente, en este caso, para pasar las instancias de los servicios directamente a través del constructor, lo que mejora la flexibilidad de la aplicación y facilita la reutilización de las instancias de los servicios */
  /* Cuando se utiliza el modificador static en un método, el método se vuelve estático, lo que significa que no se necesita crear una instancia de la clase para llamar al método. Esto es útil si no se necesita dependencias dinámicas. Sin embargo, en el caso de que se quiera inyectar dependencias (como en este caso, las instancias de FileUploadService y UsersService), eliminando static nos permite que el constructor reciba las dependencias que se necesita para crear las rutas */
  public get routes(): Router {
    const router = Router();

    const fileUploadController = new FileUploadController(
      this.fileUploadService
    );

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
