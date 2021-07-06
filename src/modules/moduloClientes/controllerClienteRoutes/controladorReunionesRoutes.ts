//HORACIO
import { Request, Response } from "express";
import sha1 from "sha1";
import { IReunion } from "../models/Reuniones";
import BusinessReunion from "../businessClienteController/BusinnesReuniones";
class ReunionesRoutesController{
    
    //estas son las funciones llamadas desde el archivo "routesClienteModule.ts"
    //sirven para llamar a su vez a las funciones que hacen las consulta
    // a la base de datos, osea las que estan en la carpeta "businnesClienteController"

    //todas estan funciones en esencia son los que reciben los datos y muestran 
    //los resultados todos tienen un "response status"
    //todas llaman a una funcion que hace consultas a la base de datos
    //se pueden dar cuenta de las operaciones que hace cada funcion por el mismo nombre


    //cabe aclarar que estos resultados son los que se envian y muestran en la aplicacion


    //esta funcion recibe los datos de un fomulario(body) mediante el parametro request
    // en el request tambien estan los paramatros de ahi se toman el clienteId y vendedorId 
    public async createReunion(request: Request, response: Response) {
        var reunion: BusinessReunion = new BusinessReunion();
        var reunionData = request.body;
        reunionData["fechaRegistro"] = new Date();
        reunionData["clienteId"] = request.params.clienteId;
        reunionData["vendedorId"] = request.params.vendedorId;
        let result = await reunion.addReunion(reunionData);
        response.status(201).json({ serverResponse: result });
    }

    //esta funcion no recibe ningun dato ya que solo muestra todos las reuniones 
    //que estan en la base de datos
    public async getReuniones(request: Request, response: Response) {
        var reunion: BusinessReunion = new BusinessReunion();
        const result: Array<IReunion> = await reunion.readAllReuniones();
        response.status(200).json({ serverResponse: result });
    }

    //esta funcion actualiza una reunion
    public async updateReunion(request: Request, response: Response) {
        var reunion: BusinessReunion = new BusinessReunion();
        let id: string = request.params.id;
        var params = request.body;
        var result = await reunion.updateReunion(id,params);
        response.status(200).json({ serverResponse: result });
    }

    //muestra todas las reuniones de un vendedor en especifico
    public  async getReunionesByVendedor(request: Request, response:Response)
    {
        var reunion : BusinessReunion = new BusinessReunion();
        let id:string = request.params.vendedorId;
        var result:Array<IReunion>= await reunion.readReunionesByVendedor(id);
        response.status(200).json({ serverResponse: result });
    }

    //muestra una reunion en especifico 
    public  async getReunionById(request: Request, response:Response)
    {
        var reunion : BusinessReunion = new BusinessReunion();
        let id:string = request.params.id;
        var result = await reunion.readReunion(id)
        response.status(200).json({ serverResponse: result });
    }

    //borra una reunion
    public async removeReunion(request: Request, response: Response) {
        var reunion:BusinessReunion = new BusinessReunion();
        let id: string = request.params.id;
        let result = await reunion.deleteReunion(id);
        response.status(200).json({ serverResponse: result });
    }
}
export default ReunionesRoutesController;