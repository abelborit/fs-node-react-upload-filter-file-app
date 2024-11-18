import { FileCharacteristicsInterface } from "../../interfaces/FileCharacteristicsInterface";

interface InputUploadFileProps {
  setFile: React.Dispatch<
    React.SetStateAction<FileCharacteristicsInterface>
  >;
}

export const InputUploadFile = ({
  setFile,
}: InputUploadFileProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event);
    // console.log(event.target.files);

    /* FORMA 1 */
    // const [file] = event.target.files || [];
    // console.log(file);

    /* FORMA 2 */
    const file =
      event.target.files?.[0] || ({} as FileCharacteristicsInterface);
    // console.log(file);

    setFile(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // console.log(event);
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
      }}
    >
      {/* se coloca el name con "file" porque es el mismo nombre que se espera recibir en el backend */}
      <label>
        <input
          type="file"
          accept=".csv"
          name="file"
          id="upload-file"
          onChange={handleInputChange}
        />
      </label>

      <button>Upload File</button>
    </form>
  );
};
