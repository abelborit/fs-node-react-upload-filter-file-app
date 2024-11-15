import { ConvertCsvToJsonAdapter } from "../../config";
import { UsersService } from "./users.service";

export class FileUploadService {
  /* nuestro constructor será para poder hacer la inyección de dependencias en caso se necesite */
  constructor(private readonly usersService: UsersService) {}

  public async uploadSingleFile(file: Express.Multer.File | undefined) {
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

      this.usersService.usersData = dataCsvToJson;

      return {
        propsFile: { fieldname, originalname, mimetype },
        dataFile: dataCsvToJson,
      };
    } catch (error: any) {
      console.log("error in file-upload.service in services", { error });

      throw error;
    }
  }
}
