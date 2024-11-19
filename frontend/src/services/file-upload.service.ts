import { envs } from "../config/envs.plugin";
import { FileDataResponseInterface } from "../interfaces/FileDataResponse.interface";

/* lo que regresaremos será un tupla para tener el error y la data en caso haya uno o el otro. Tener en cuenta que TypeScript no permite que un elemento obligatorio venga después de un elemento opcional en una tupla. En una tupla, los elementos opcionales deben ir al final */
export const fileUploadService = async (
  file: File
): Promise<[FileDataResponseInterface, Error?]> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${envs.VITE_API_HOST}/upload/single`, {
      method: "POST",
      body: formData, // Enviar el archivo con FormData
    });

    if (!response.ok) {
      throw new Error("Error when uploading file...");
    }

    const data = await response.json();
    console.log("Response from server", data);

    return [data, undefined];
  } catch (error: unknown) {
    /* En TypeScript, error dentro del bloque catch tiene el tipo unknown por defecto. Esto significa que TypeScript no sabe qué tipo de objeto es el error */
    console.error("Error file-upload.service.ts - frontend", error);

    /* Verificación de tipo para asegurarnos de que el error es una instancia de Error */
    /* Este es un type guard que verifica si el error es una instancia de la clase Error. Si es así, lo tratamos como un error y lo devolvemos de la forma correcta */
    if (error instanceof Error) {
      return [{} as FileDataResponseInterface, error]; // Si es un error, lo devolvemos correctamente
    }

    /* Si no es un Error, devolvemos un Error genérico */
    /* Si el error no es una instancia de Error (lo cual podría suceder en algunos casos, como errores lanzados explícitamente con otros tipos), devolvemos un error genérico con un mensaje adecuado */
    return [
      {} as FileDataResponseInterface,
      new Error("An unknown error occurred"),
    ];
  }
};
