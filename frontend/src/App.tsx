import { useState } from "react";
import "./App.css";
import { FileCharacteristics } from "./components/FileCharacteristics";
import { InputUploadFile } from "./components/InputUploadFile";
import { FileCharacteristicsInterface } from "./interfaces/FileCharacteristicsInterface";

function App() {
  const [fileCharacteristics, setFileCharacteristics] = useState(
    {} as FileCharacteristicsInterface
  );

  return (
    <>
      <h1>FullStack Project: Upload CSV + Search</h1>

      <div
        style={{
          display: "flex",
          border: "2px solid #fff",
          borderRadius: "20px",
          padding: "1rem",
          textAlign: "center",
          justifyContent: "space-evenly",
        }}
      >
        <InputUploadFile setFileCharacteristics={setFileCharacteristics} />

        <FileCharacteristics fileCharacteristics={fileCharacteristics} />
      </div>
    </>
  );
}

export default App;
