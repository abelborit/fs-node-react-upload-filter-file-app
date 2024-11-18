type DataFileResponse = Array<Record<string, string>>;

/* lo que regresaremos será un tupla para tener el error y la data en caso haya uno o el otro */
export const fileUploadService = async (
  file: File
): Promise<[Error?, DataFileResponse?]> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:3000/api/upload/single", {
      method: "POST",
      body: formData, // Enviar el archivo con FormData
    });

    if (!response.ok) {
      throw new Error("Error when uploading file...");
    }

    const data = await response.json();
    console.log("Response from server", data);

    return [undefined, data];
  } catch (error: unknown) {
    /* En TypeScript, error dentro del bloque catch tiene el tipo unknown por defecto. Esto significa que TypeScript no sabe qué tipo de objeto es el error */
    console.error("Error file-upload.service.ts - frontend", error);

    /* Verificación de tipo para asegurarnos de que el error es una instancia de Error */
    /* Este es un type guard que verifica si el error es una instancia de la clase Error. Si es así, lo tratamos como un error y lo devolvemos de la forma correcta */
    if (error instanceof Error) {
      return [error, []]; // Si es un error, lo devolvemos correctamente
    }

    /* Si no es un Error, devolvemos un Error genérico */
    /* Si el error no es una instancia de Error (lo cual podría suceder en algunos casos, como errores lanzados explícitamente con otros tipos), devolvemos un error genérico con un mensaje adecuado */
    return [new Error("An unknown error occurred"), []];
  }
};
