// import csvToJson from "convert-csv-to-json";

export const ConvertCsvToJsonAdapter = {
  /* se está colocando el delimitador que, según la librería, el valor por defecto que usa es ";" */
  // csvStringToJson: (csvString: string) => {
  //   return csvToJson.fieldDelimiter(",").csvStringToJson(csvString);
  // },

  /* lo haremos de forma manual porque hacerlo con la librería no nos da en formato JSON, queda como deuda téncina ver cómo funciona la librería y qué configuración adicional hay que hacer para hacer la conversión correcta */
  csvStringToJson: (csvString: string) => {
    const lines = csvString.split("\n");
    const headers = lines[0].split(",");
    // console.log({ lines, headers });

    /* FORMA 1 */
    /* se coloca -- Record<string, string | null> -- para que no nos de error al querer colocar un valor null a una propiedad que espera ser de tipo string, con este cambio, el objeto resultante podrá contener valores que sean string o null */
    // return lines.slice(1).map((line) => {
    //   const values = line.split(",");

    //   return headers.reduce((obj, header, index) => {
    //     obj[header.trim()] = values[index]?.trim() || null;
    //     return obj;
    //   }, {} as Record<string, string | null>);
    // });

    /* FORMA 2 */
    /* evitar null y asignar un valor predeterminado (si se prefiere "" para valores faltantes). Si prefieres que las propiedades sean siempre de tipo string, incluso si no hay un valor válido, se puede utilizar una cadena vacía ("") como valor predeterminado */
    return lines.slice(1).map((line) => {
      const values = line.split(",");

      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim() || "";
        return obj;
      }, {} as Record<string, string>);
    });
  },
};
