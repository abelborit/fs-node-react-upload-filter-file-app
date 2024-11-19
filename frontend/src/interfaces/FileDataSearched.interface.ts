export interface FileDataSearchedInterface {
  data: Data;
  message: string;
}

interface Data {
  query: string;
  filteredData: DataFile[];
}

interface DataFile {
  id: string;
  nombre: string;
  apellido: string;
  edad: string;
  departamento: Departament;
  email: string;
}

enum Departament {
  Administración = "Administración",
  Desarrollo = "Desarrollo",
  Marketing = "Marketing",
  RecursosHumanos = "Recursos Humanos",
  Ventas = "Ventas",
}
