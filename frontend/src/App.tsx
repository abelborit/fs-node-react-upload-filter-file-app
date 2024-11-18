import { useState } from "react";
import "./App.css";
import { FileCharacteristics } from "./components/FileCharacteristics";
import { InputUploadFile } from "./components/InputUploadFile";
import { APP_STATUS, AppStatusType } from "./constants";
import { FileDataResponseInterface } from "./interfaces/FileDataResponse.interface";
import { Toaster } from "sonner";
import { UsersTable } from "./components/UsersInfoTable";

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.INIT);
  const [file, setFile] = useState({} as File);
  const [dataResponse, setDataResponse] = useState(
    {} as FileDataResponseInterface
  );
  // console.log(dataResponse);

  return (
    <>
      <h1>FullStack Project: Upload CSV + Search</h1>

      <Toaster />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid #fff",
          borderRadius: "20px",
          padding: "2.5rem 1.5rem",
          textAlign: "center",
          justifyContent: "space-evenly",
        }}
      >
        {appStatus === APP_STATUS.READY_TO_USAGE ? (
          <FileCharacteristics file={file} appStatus={appStatus} />
        ) : (
          <InputUploadFile
            setFile={setFile}
            setAppStatus={setAppStatus}
            setDataResponse={setDataResponse}
            appStatus={appStatus}
            file={file}
          />
        )}

        {appStatus === APP_STATUS.READY_TO_USAGE ? (
          <div
            style={{
              borderBottom: "1px solid #fff",
              width: "90%",
              margin: "2rem auto",
            }}
          />
        ) : null}

        {appStatus === APP_STATUS.READY_TO_USAGE ? (
          <UsersTable dataResponse={dataResponse} />
        ) : null}
      </div>
    </>
  );
}

export default App;
