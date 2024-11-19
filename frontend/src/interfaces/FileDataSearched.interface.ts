export interface FileDataSearchedInterface {
  data: Data;
  message: string;
}

export interface Data {
  query: string;
  filteredData: FilteredDatum[];
}

export interface FilteredDatum {
  id: string;
  nombre: string;
  apellido: string;
  edad: string;
  departamento: string;
  email: string;
}
