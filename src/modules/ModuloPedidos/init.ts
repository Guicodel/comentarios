//en los archivos init se importa el archivo de las rutas
// este archivo init exporta el modulo en si, asi que cada 
//modulo tiene su archivo init.ts, asi como tambien su
//archivo de rutas 

import { Express } from "express";
import RoutesPedidosProductosModule from "./routesPedidos-ProductosModule";
class ModuloPedidos {
    private routes: RoutesPedidosProductosModule;
    constructor(root: string, app: Express) {
        console.log("Init pedidos module");
        this.routes = new RoutesPedidosProductosModule(root, app);

    }
}
export default ModuloPedidos;