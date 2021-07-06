//en este archivo se importan todas los modulos 
//en la funcion initlApp() se crean las instancia
//de cada modulo

import express, { Express } from "express";
import * as bodyParser from "body-parser";
import UserModules from "./modules/usermodule/init";
import ClienteModules from './modules/moduloClientes/init';
import PedidosModules from './modules/ModuloPedidos/init'
import mongoose, { Mongoose } from "mongoose";
import FileUpload from "express-fileupload";
class App {
  public app: Express = express();
  public mongooseClient: Mongoose;
  constructor() {
    this.configuration();
    this.connectDatabase();
    this.initApp();
  }
  public connectDatabase() {
    let host: string = "mongodb://192.168.0.20:27017";
    let database: string = process.env.DATABASE || "seminarioDb";
    let connectionString: string = `${host}/${database}`;
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
    });
    //Eventos
    mongoose.connection.on("error", (err) => {
      console.log("Connection Fail");
      console.log(err);
    });
    mongoose.connection.on("open", () => {
      console.log("database connection success!");
    });
    this.mongooseClient = mongoose;
  }
  public configuration() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(FileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
  }
  public initApp() {
    console.log("LOAD MODULES");
    const userModule = new UserModules("/api", this.app);
    const clienteModule = new ClienteModules("/api",this.app);
    const pedidosModule = new PedidosModules("/api",this.app);
  }
}
export default new App();
