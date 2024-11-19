import { FileDataSearchedInterface } from "../interfaces/FileDataSearched.interface";

export const searchUserService = async (
  query: string
): Promise<[FileDataSearchedInterface, Error?]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/users?q=${query}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error when searching data...");
    }

    const data = await response.json();
    console.log("Response from server", data);

    return [data, undefined];
  } catch (error: unknown) {
    /* En TypeScript, error dentro del bloque catch tiene el tipo unknown por defecto. Esto significa que TypeScript no sabe qué tipo de objeto es el error */
    console.error("Error search-user.service.ts - frontend", error);

    /* Verificación de tipo para asegurarnos de que el error es una instancia de Error */
    /* Este es un type guard que verifica si el error es una instancia de la clase Error. Si es así, lo tratamos como un error y lo devolvemos de la forma correcta */
    if (error instanceof Error) {
      return [{} as FileDataSearchedInterface, error]; // Si es un error, lo devolvemos correctamente
    }

    /* Si no es un Error, devolvemos un Error genérico */
    /* Si el error no es una instancia de Error (lo cual podría suceder en algunos casos, como errores lanzados explícitamente con otros tipos), devolvemos un error genérico con un mensaje adecuado */
    return [
      {} as FileDataSearchedInterface,
      new Error("An unknown error occurred"),
    ];
  }
};
