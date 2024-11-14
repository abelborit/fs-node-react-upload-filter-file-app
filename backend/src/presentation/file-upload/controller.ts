import { Request, Response } from "express";
import { ConvertCsvToJsonAdapter } from "../../config";

/* el controlador será una clase que nos permita hacer inyección de dependencias y también tendrá todos los handlers los cuales recibirán la información para poder realizar alguna acción pero los handlers en el controlador no deberían realizar los trabajos de creación, validación y los demás procesos, ya que simplemente este es el controlador de la ruta y en este caso quien va a realizar esas tareas será un servicio que sería algo similar a un gestor de estado y será quien se encargue de ejecutar toda la parte pesada, es decir, todos los procesos o tareas de creación, validación, etc, entonces nuestro controlador es quien delegará la información al servicio quien realizará la lógica */
export class FileUploadController {
  /* nuestro constructor será para poder hacer la inyección de dependencias */
  constructor() {}

  public uploadSingleFile(request: Request, response: Response) {
    const { file } = request;
    // console.log({ file });

    const validExtentions: string[] = ["csv"];

    try {
      if (!file) {
        throw { data: null, message: "file is required" };
      }

      const fileExtension = file.mimetype.split("/").at(1) ?? ""; // para tomar la segunda posición por ejemplo image/jpeg -> jpeg y si no viene nada entonces que le coloque un string vacío

      if (!validExtentions.includes(fileExtension)) {
        throw { data: null, message: "it is not a valid extention" };
      }

      const { fieldname, originalname, mimetype, size, ...restOfArgs } = file;

      /* el buffer de un archivo es un espacio de memoria temporal que almacena los datos binarios de ese archivo en bruto (es decir, no interpretados) antes de que se procese o manipule. En Node.js y muchos otros entornos, un buffer permite trabajar con los datos de archivos u otros flujos binarios (como imágenes, videos o datos transmitidos en red) de manera eficiente  */
      /* cuando se sube un archivo usando una librería como Multer en Node.js, el archivo puede almacenarse en un buffer dentro de la memoria si configuras la opción memoryStorage. Este buffer contiene el contenido completo del archivo como una secuencia de bytes, lo cual permite:

          - Manipular el contenido sin guardarlo en disco: Esto es útil si quieres procesar o analizar el archivo temporalmente sin tener que almacenarlo.

          - Transformar o convertir los datos: Puedes modificar los datos del archivo directamente en el buffer, como cambiar el formato de una imagen o aplicar filtros.

          - Transferir el archivo fácilmente: El buffer permite enviar datos binarios sin necesidad de acceder continuamente al sistema de archivos, ya que todo está en memoria.
      */
      const dataBufferToCsv = Buffer.from(file.buffer).toString("utf-8"); // para tenerlo como un string y no como un código binario
      // console.log(dataBufferToCsv);

      /* para convertir la data que está como un string y pasarla a Json */
      const dataCsvToJson =
        ConvertCsvToJsonAdapter.csvStringToJson(dataBufferToCsv);
      // console.log({ dataCsvToJson });

      response.status(201).json({
        // data: file,
        // data: { fieldname, originalname, mimetype, size },
        data: {
          propsFile: { fieldname, originalname, mimetype, size },
          dataFile: dataCsvToJson,
        },
        message: "file uploated successfully",
      });

      return;
    } catch (error: any) {
      console.log("error in controller in file-upload", { error });

      switch (error.message) {
        case "file is required":
          response
            .status(404)
            .json({ data: null, message: "file is required" });
          return;

        case "it is not a valid extention":
          response
            .status(404)
            .json({ data: null, message: "it is not a valid extention" });
          return;

        default:
          response
            .status(500)
            .json({ data: null, message: "Internal Server Error" });
          return;
      }
    }
  }
}
