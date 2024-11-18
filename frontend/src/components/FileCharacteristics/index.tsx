import { FileCharacteristicsInterface } from "../../interfaces/FileCharacteristicsInterface";

interface FileCharacteristicsProps {
  fileCharacteristics: FileCharacteristicsInterface;
}

export const FileCharacteristics = ({
  fileCharacteristics,
}: FileCharacteristicsProps) => {
  // console.log(fileCharacteristics);

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
      {fileCharacteristics.name ? (
        <>
          <p style={{ padding: "0px", margin: "0px" }}>
            <span style={{ fontWeight: "bold" }}>Name File: </span>
            <span>
              {fileCharacteristics.name || "No file selected to upload"}
            </span>
          </p>

          <p style={{ padding: "0px", margin: "0px" }}>
            <span style={{ fontWeight: "bold" }}>Size File: </span>
            <span>
              {fileCharacteristics.size || "No file selected to upload"}
            </span>
          </p>

          <p style={{ padding: "0px", margin: "0px" }}>
            <span style={{ fontWeight: "bold" }}>Type File: </span>
            <span>
              {fileCharacteristics.type || "No file selected to upload"}
            </span>
          </p>
        </>
      ) : (
        <p style={{ fontSize: "1.25rem" }}>No file selected to upload</p>
      )}
    </div>
  );
};
