import { useEffect, useState } from "react";
import { FileDataResponseInterface } from "../../interfaces/FileDataResponse.interface";
import { searchUserService } from "../../services/search-user.service";
import { APP_STATUS, AppStatusType } from "../../constants";
import { toast } from "sonner";
import { useDebounce } from "../../hooks/useDebounce";

interface UsersTableProps {
  dataResponse: FileDataResponseInterface;
  setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>;
}

export const UsersTable = ({ dataResponse, setAppStatus }: UsersTableProps) => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    /* se hace de esta forma para que si se copia la url y se coloca en otro lado entonces solo bastaría subir el archivo para que cuando se suba ya realice la búsqueda por defecto a través de los parámetros de la query */
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q") ?? "";
  });

  const [data, setData] = useState(dataResponse.data.dataFile);

  const debouncedQuery = useDebounce(searchQuery, 300); // 300 ms de debounce

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event);
    setSearchQuery(event.target.value);
  };

  /* FORMA 1 */
  // useEffect(() => {
  //   if (searchQuery === "") {
  //     window.history.pushState({}, "", window.location.pathname);
  //     return;
  //   }

  //   window.history.pushState({}, "", `?=${searchQuery}`);
  // }, [searchQuery]);

  /* FORMA 2 */
  useEffect(() => {
    /* Ventajas de Este Enfoque:
        - Sin Recarga de Página: La URL cambia dinámicamente sin necesidad de recargar la página.

        - Sin Ensuciar el Historial: Usar replaceState evita que el historial de navegación se llene con entradas redundantes cada vez que el usuario modifica searchQuery.

        - Sincronización de Estado: Al copiar la URL y pegarla en otra pestaña, puedes inicializar searchQuery desde la query string.
    */

    /* Si searchQuery está vacío (""), se utiliza el pathname actual (window.location.pathname) para limpiar cualquier query string existente. Esto significa que elimina la parte "?q=algo" de la URL si no hay un término de búsqueda */
    const newPathname =
      searchQuery === "" ? window.location.pathname : `?q=${searchQuery}`;

    /* se puede hacer con un "pushState" o con un "replaceState", la diferencia es que si hacemos con un "pushState" tendremos el historial para poder ir navegando asi atrás mientras que con el "replaceState" reemplazará la url con cada cambio */
    window.history.replaceState({}, "", newPathname);
  }, [searchQuery]);

  useEffect(() => {
    if (!debouncedQuery) {
      setData(dataResponse.data.dataFile);
      return;
    }

    searchUserService(debouncedQuery).then((response) => {
      const [dataResponse, errorResponse] = response;
      // console.log([dataResponse, errorResponse]);

      if (errorResponse) {
        setAppStatus(APP_STATUS.ERROR);
        toast.error(errorResponse.message);
        return;
      }

      setAppStatus(APP_STATUS.READY_TO_USAGE);
      setData(dataResponse.data.filteredData);
      toast.success("Data Searched Successfully");
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "auto",
        gap: "1.5rem",
      }}
    >
      <input
        type="search"
        placeholder="Search some user here..."
        onChange={handleSearch}
        value={searchQuery}
      />

      {data.length === 0 ? (
        <p style={{ fontSize: "24px" }}>No users found ❌</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th style={headerStyle}>ID</th>
              <th style={headerStyle}>Name</th>
              <th style={headerStyle}>Lastname</th>
              <th style={headerStyle}>Age</th>
              <th style={headerStyle}>Department</th>
              <th style={headerStyle}>Email</th>
            </tr>
          </thead>

          <tbody>
            {data.map((element) => (
              <tr key={element.id + element.nombre + element.apellido}>
                <td style={cellStyle}>{element.id}</td>
                <td style={cellStyle}>{element.nombre}</td>
                <td style={cellStyle}>{element.apellido}</td>
                <td style={cellStyle}>{element.edad}</td>
                <td style={cellStyle}>{element.departamento}</td>
                <td style={cellStyle}>{element.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const headerStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "0.5rem 1.25rem",
  background: "#f4f4f4",
  textAlign: "center",
  color: "#333",
};

const cellStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "0.5rem 1.25rem",
  textAlign: "center",
};
