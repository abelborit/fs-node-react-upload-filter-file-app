import "dotenv/config"; // para que use la configuración por defecto y cargue mis variables de entorno acorde a mi archivo .env
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
};
