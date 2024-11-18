import { FileCharacteristicsInterface } from "../../interfaces/FileCharacteristicsInterface";

interface FileCharacteristicsProps {
  file: FileCharacteristicsInterface;
}

export const FileCharacteristics = ({
  file,
}: FileCharacteristicsProps) => {
  // console.log(file);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      {file.name ? (
        <>
          <p style={{ padding: "0px", margin: "0px" }}>
            <span style={{ fontWeight: "bold" }}>Name File: </span>
            <span>
              {file.name || "No file selected to upload"}
            </span>
          </p>

          <p style={{ padding: "0px", margin: "0px" }}>
            <span style={{ fontWeight: "bold" }}>Size File: </span>
            <span>
              {file.size || "No file selected to upload"}
            </span>
          </p>

          <p style={{ padding: "0px", margin: "0px" }}>
            <span style={{ fontWeight: "bold" }}>Type File: </span>
            <span>
              {file.type || "No file selected to upload"}
            </span>
          </p>
        </>
      ) : (
        <p style={{ fontSize: "1.25rem" }}>No file selected to upload</p>
      )}
    </div>
  );
};
