export class UsersService {
  /* nuestro constructor será para poder hacer la inyección de dependencias en caso se necesite */
  constructor() {}

  /* -- Array<Record<string, string>> -- es una manera de declarar un tipo en TypeScript que representa un arreglo de objetos, donde:

      - Record<K, V> es un tipo genérico en TypeScript que se utiliza para describir objetos.
      - K (string en este caso) representa los nombres de las claves del objeto.
      - V (string en este caso) representa los valores de esas claves.

  Por lo tanto, Record<string, string> significa "un objeto cuyas claves son cadenas (string) y cuyos valores también son cadenas (string)" y el Array<......> es para representar un array
  */
  public usersData: Array<Record<string, string>> = [];

  public getFilteredUsers = async (query: string = "") => {
    // console.log({ query });
    // console.log({ usersData: this.usersData });

    try {
      if (!query) {
        throw { data: null, message: "query param is required" };
      }

      if (!this.usersData.length) {
        throw {
          data: [],
          message: "No data available. Please upload the file first",
        };
      }

      const search = query.toLowerCase();
      const filteredData = this.usersData.filter((rowElement) => {
        // console.log({ rowElement, ObjectValues: Object.values(rowElement) });

        return Object.values(rowElement).some((value) => {
          // console.log({ value });

          return value.toLowerCase().includes(search);
        });
      });
      // console.log({ filteredData });

      return {
        query: query,
        filteredData: filteredData,
      };
    } catch (error) {
      console.log("error in users.service in services", { error });

      throw error;
    }
  };
}
