/* el uso de "as const" asegura que los valores dentro de APP_STATUS sean tratados como valores literales y no como simples string, lo que también nos debería permitir que el autocompletado funcione correctamente al querer usar el "APP_STATUS" en otros archivo */
export const APP_STATUS = {
  INIT: "init", // al entrar a la aplicación
  ERROR: "error", // si hay un error
  READY_TO_UPLOAD: "ready_to_upload", // al elegir el archivo y antes de subirlo
  UPLOADING: "uploading", // mientras se está subiendo el archivo
  READY_TO_USAGE: "ready_to_usage", // después de subir el archivo
} as const;

export type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

export const BUTTON_TEXT = {
  [APP_STATUS.INIT]: "Upload File",
  [APP_STATUS.ERROR]: "Try Again",
  [APP_STATUS.READY_TO_UPLOAD]: "Upload File",
  [APP_STATUS.UPLOADING]: "Uploading...",
  [APP_STATUS.READY_TO_USAGE]: "File uploated",
};
