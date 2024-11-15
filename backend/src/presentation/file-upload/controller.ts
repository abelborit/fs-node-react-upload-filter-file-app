import { Request, Response } from "express";
import { FileUploadService } from "../services/file-upload.service";

/* el controlador será una clase que nos permita hacer inyección de dependencias y también tendrá todos los handlers los cuales recibirán la información para poder realizar alguna acción pero los handlers en el controlador no deberían realizar los trabajos de creación, validación y los demás procesos, ya que simplemente este es el controlador de la ruta y en este caso quien va a realizar esas tareas será un servicio que sería algo similar a un gestor de estado y será quien se encargue de ejecutar toda la parte pesada, es decir, todos los procesos o tareas de creación, validación, etc, entonces nuestro controlador es quien delegará la información al servicio quien realizará la lógica */
export class FileUploadController {
  /* nuestro constructor será para poder hacer la inyección de dependencias */
  constructor(private readonly fileUploadService: FileUploadService) {}

  public uploadSingleFile(request: Request, response: Response) {
    const { file } = request;
    // console.log({ file });

    this.fileUploadService
      .uploadSingleFile(file)
      .then((fileUploated) => {
        // console.log({ fileUploated });

        return response.status(201).json({
          data: fileUploated,
          message: "file uploated successfully",
        });
      })
      .catch((error) => {
        // console.log({ error });

        switch (error.message) {
          case "file is required":
            return response
              .status(404)
              .json({ data: null, message: "file is required" });

          case "it is not a valid extention":
            return response
              .status(404)
              .json({ data: null, message: "it is not a valid extention" });

          default:
            return response
              .status(500)
              .json({ data: null, message: "Internal Server Error" });
        }
      });
  }
}
