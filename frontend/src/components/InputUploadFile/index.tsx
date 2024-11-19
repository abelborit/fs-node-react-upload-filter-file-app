import { APP_STATUS, AppStatusType, BUTTON_TEXT } from "../../constants";
import { FileDataResponseInterface } from "../../interfaces/FileDataResponse.interface";
import { fileUploadService } from "../../services/file-upload.service";
import { toast } from "sonner";

interface InputUploadFileProps {
  setFile: React.Dispatch<React.SetStateAction<File>>;
  setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>;
  setDataResponse: React.Dispatch<
    React.SetStateAction<FileDataResponseInterface>
  >;

  appStatus: AppStatusType;
  file: File;
}

export const InputUploadFile = ({
  setFile,
  setAppStatus,
  setDataResponse,

  appStatus,
  file,
}: InputUploadFileProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event);
    // console.log(event.target.files);

    /* FORMA 1 */
    // const [file] = event.target.files || [];
    // console.log(file);

    /* FORMA 2 */
    const file = event.target.files?.[0] || ({} as File);
    // console.log(file);

    if (!file) {
      throw new Error("A file is required");
    }

    setFile(file);
    setAppStatus(APP_STATUS.READY_TO_UPLOAD);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // console.log(event);
    event.preventDefault();
    setAppStatus(APP_STATUS.UPLOADING);

    const [dataResponse, errorResponse] = await fileUploadService(file);
    // console.log([dataResponse, errorResponse]);

    if (errorResponse) {
      setAppStatus(APP_STATUS.ERROR);
      toast.error(errorResponse.message);
      return;
    }

    setAppStatus(APP_STATUS.READY_TO_USAGE);
    setDataResponse(dataResponse);
    toast.success("File Uploated Successfully");
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
