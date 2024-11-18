export interface FileDataResponseInterface {
  data: Data;
  message: string;
}

export interface Data {
  propsFile: PropsFile;
  dataFile: DataFile[];
}

export interface DataFile {
  id: string;
  nombre: string;
  apellido: string;
  edad: string;
  departamento: Departament;
  email: string;
}

export enum Departament {
  Administración = "Administración",
  Desarrollo = "Desarrollo",
  Marketing = "Marketing",
  RecursosHumanos = "Recursos Humanos",
  Ventas = "Ventas",
}

export interface PropsFile {
  fieldname: string;
  originalname: string;
  mimetype: string;
}
