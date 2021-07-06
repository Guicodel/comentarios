//Horacio
import ReunionModel, { IReunion } from "../models/Reuniones";

class BusinessReunion
{
    constructor()
    {

    }
    //crud reuniones

    // funcion readAllReuniones() hace una consulta a la base de datos 
    //y retorna todos los Reunions
    public async readAllReuniones()
    {
        let result = await ReunionModel.find({});
        return result;
    }

    // funcion readReunion(id:string) hace una consulta a la base de datos 
    //y retorna un solo Reunion, por eso recibe un id como parametro
    public async readReunion(id:string)
    {
        let result = await ReunionModel.findById(id).exec();
        return result;
    }


    // funcion readAllReunionsByVendedor(idVen:string) hace una consulta a la base de datos 
    //y retorna todos los Reunions de un vendedor especifico, 
    //recibe como parametro el id de dicho vendedor
    public async readReunionesByVendedor(idVen:string)
    {
        let result = await ReunionModel.find({vendedorId:idVen});
        return result;
    }

    // funcion addReunion() hace una consulta a la base de datos 
    //y crea un nuevo Reunion, recibe como parametro el modelo del Reunion
    //retorna el nuevo Reunion recien creado
    public async addReunion(reunion:IReunion)
    {
        let reunionDb = new ReunionModel(reunion);
        let result = await reunionDb.save();
        return result;
    }


    // funcion updateReunions() hace una consulta a la base de datos 
    //actualiza un Reunion especifico
    //recibe como parametros el id del Reunion y los datos que se van ha actualizar 
    public async updateReunion(id: string, reunion: any) {
        let result = await ReunionModel.update({ _id: id }, { $set: reunion });
        return result;
    }


    // funcion deleteReunion elimina una Reunion en especifico
    public async deleteReunion(id: string) {
        let result = await ReunionModel.remove({ _id: id });
        return result;
    }
}
export default BusinessReunion;