import csvToJson from "convert-csv-to-json";

export const ConvertCsvToJsonAdapter = {
  csvStringToJson: (csvString: string) => {
    return csvToJson.csvStringToJson(csvString);
  },
};
