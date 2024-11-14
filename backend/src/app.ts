import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { AppServer } from "./presentation/server";

const main = async () => {
  const appSever = new AppServer({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  appSever.start();
};

(async () => {
  main();
})();
