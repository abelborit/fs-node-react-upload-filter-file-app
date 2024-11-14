/* todo lo que va de express usualmente se coloca en la carpeta de presentation para no afectar la lógica de negocio. Aquí se podría decir que es una dependencia oculta pero en realidad se va a utilizar express en muy pocos archivos y por eso se puede colocar normal en los archivos donde haga falta */
import express, { Router } from "express";

interface AppServerOptions {
  port: number;
  routes: Router;
}

export class AppServer {
  /* inicializar express */
  /* lo cambiamos a public readonly para que al probar en nuestro test nos aparezca también la inicialización de express (la variable app) y no solo los métodos de la clase Server */
  public readonly app = express();

  /* opcional porque en algún punto en el tiempo no va a tener un valor, porque hasta que se levanta el servidor recién lo tendrá. Tiene de tipo any solo para no hacerlo más complicado, pero se podría buscar el tipo correcto */
  private serverListener?: any;

  /* variables a utilizar */
  private readonly port: number;
  private readonly routes: Router;

  /* nuestro constructor será para poder hacer la inyección de dependencias */
  constructor(appServerOptions: AppServerOptions) {
    const { port, routes } = appServerOptions;

    /* la propiedades readonly solo se pueden modificar en el constructor, ya después no se puede */
    this.port = port;
    this.routes = routes;
  }

  async start() {
    /* Middlewares */
    /* Los Middlewares son funciones que se van a ejecutar en todo momento que se pase por una ruta. Los Middlewares son softwares que se sitúan entre un sistema operativo y las aplicaciones que se ejecutan en él. Básicamente, funcionan como una capa de traducción oculta para permitir la comunicación y la administración de datos en aplicaciones distribuidas las cuales estas son una aplicación con distintos componentes que se ejecutan en entornos separados, normalmente en diferentes plataformas conectadas a través de una red. */
    /* por defecto hay que decirle a Express cómo se quiere manejar la serialización de las peticiones POST, es decir, hay que decirle a Express cómo va a venir la data del body, que por lo general viene en formato JSON. En Express ya hay un middleware que ya nos sirve para parsear la información que viene en el body y la transforme en un objeto JSON usando express.json(). Entonces cualquier petición pasará por aquí y si tiene un body lo va a serializar a JSON. Si no se coloca esta serialización y se va a postman directamente para probar el envío del body con petición POST, entonces estará vacía la respuesta, que técnicamente es un undefined pero ese undefined no lo mostrará en postman */
    this.app.use(express.json()); // middleware para el tipo raw para serializarlo a JSON (que es el más común)
    this.app.use(express.urlencoded({ extended: true })); // middleware para serializarlo para el tipo x-www-form-urlencoded (por ejemplo para Angular con las peticiones por defecto que realiza). Si no se coloca este middleware y si se usa x-www-form-urlencoded, los datos no se envían en el body del request como un objeto JSON, sino que se envían como un conjunto de pares key value, por eso es que se ve el request.body vacío por ejemplo así {}

    /* Routes de las API */
    this.app.use(this.routes);

    /* colocar a nuestra aplicación a escuchar peticiones. El puerto debe venir por variables de entorno */
    /* para detener el procedimiento y cerrar los listeners que tenemos haremos uso del .close() que se está llamando en la función close() de abajo */
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`server running on port ${this.port} ✅`);
    });
  }

  public close() {
    /* aquí no aparecerá el autocompletado del .close() porque como arriba se puso de tipo any entonces puede ser cualquier valor */
    this.serverListener?.close();
  }
}
