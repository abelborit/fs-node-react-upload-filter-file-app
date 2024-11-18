import { APP_STATUS, AppStatusType, BUTTON_TEXT } from "../../constants";
import { FileCharacteristicsInterface } from "../../interfaces/FileCharacteristicsInterface";

interface InputUploadFileProps {
  setFile: React.Dispatch<React.SetStateAction<FileCharacteristicsInterface>>;
  setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>;

  appStatus: AppStatusType;
}

export const InputUploadFile = ({
  setFile,
  setAppStatus,

  appStatus,
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

    if (!file) {
      throw new Error("A file is required");
    }

    setFile(file);
    setAppStatus(APP_STATUS.READY_TO_UPLOAD);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // console.log(event);
    event.preventDefault();
    setAppStatus(APP_STATUS.UPLOADING);
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
          disabled={appStatus === APP_STATUS.UPLOADING}
          type="file"
          accept=".csv"
          name="file"
          id="upload-file"
          onChange={handleInputChange}
        />
      </label>

      <button disabled={appStatus !== APP_STATUS.READY_TO_UPLOAD}>
        {BUTTON_TEXT[appStatus]}
      </button>
    </form>
  );
};
