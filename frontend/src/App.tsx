import { useState } from "react";
import "./App.css";
import { FileCharacteristics } from "./components/FileCharacteristics";
import { InputUploadFile } from "./components/InputUploadFile";
import { FileCharacteristicsInterface } from "./interfaces/FileCharacteristicsInterface";
import { APP_STATUS, AppStatusType } from "./constants";

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.INIT);
  const [file, setFile] = useState({} as FileCharacteristicsInterface);

  return (
    <>
      <h1>FullStack Project: Upload CSV + Search</h1>

      <div
        style={{
          display: "flex",
          border: "2px solid #fff",
          borderRadius: "20px",
          padding: "2.5rem 1.5rem",
          textAlign: "center",
          justifyContent: "space-evenly",
        }}
      >
        <InputUploadFile
          setFile={setFile}
          setAppStatus={setAppStatus}
          appStatus={appStatus}
        />

        <FileCharacteristics file={file} appStatus={appStatus} />
      </div>
    </>
  );
}

export default App;
