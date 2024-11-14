import csvToJson from "convert-csv-to-json";

export const convertCsvToJsonAdapter = {
  csvStringToJson: (csvString: string) => {
    return csvToJson.csvStringToJson(csvString);
  },
};
