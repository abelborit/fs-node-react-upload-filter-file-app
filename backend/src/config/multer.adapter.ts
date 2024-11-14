import multer from "multer";

export class MulterAdapter {
  /* si fuera sin el "get" entonces en el método "upload" tendría que ser -- { storage: this.storage() } -- */
  static get storage() {
    return multer.memoryStorage();
  }

  static uploadSingle(nameFile: string) {
    /* aquí se tiene que retornar la función middleware de multer para luego poder usarlo correctamente como un middleware en las rutas que necesitemos */
    return multer({ storage: this.storage }).single(nameFile);
  }
}
