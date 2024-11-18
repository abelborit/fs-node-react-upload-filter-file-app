import { FileDataResponseInterface } from "../../interfaces/FileDataResponse.interface";

interface UsersTableProps {
  dataResponse: FileDataResponseInterface;
}

export const UsersTable = ({ dataResponse }: UsersTableProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "auto",
      }}
    >
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
          {dataResponse.data.dataFile.map((element) => (
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
