export class UsersService {
  /* nuestro constructor será para poder hacer la inyección de dependencias en caso se necesite */
  constructor() {}

  public usersData: any[] = [];

  public getUsers = async (query: string = "") => {
    // console.log({ query });
    console.log({ usersData: this.usersData });

    try {
      return {
        query: query,
        filteredData: [],
      };
    } catch (error) {
      console.log("error in users.service in services", { error });

      throw error;
    }
  };
}
