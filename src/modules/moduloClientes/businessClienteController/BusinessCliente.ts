import ClienteModel, { ICliente } from "../models/Cliente";
class BusinessCliente{
    constructor() {

    }
    //crud para modulo cliente

    // funcion readAllClientes() hace una consulta a la base de datos 
    //y retorna todos los clientes
    public async readAllClientes()
    {
        let result = await ClienteModel.find({});
        return result;
    }

    // funcion readCliente(id:string) hace una consulta a la base de datos 
    //y retorna un solo cliente, por eso recibe un id como parametro
    public async readCliente(id:string)
    {
        let result = await ClienteModel.findById(id).exec();
        return result;
    }

    // funcion readAllClientesByVendedor(idVen:string) hace una consulta a la base de datos 
    //y retorna todos los clientes de un vendedor especifico, 
    //recibe como parametro el id de dicho vendedor
    public async readClientesByVendedor(idVen:string)
    {
        let result = await ClienteModel.find({idVendedor:idVen});
        return result;
    }

    // funcion addCliente() hace una consulta a la base de datos 
    //y crea un nuevo cliente, recibe como parametro el modelo del cliente
    //retorna el nuevo cliente recien creado
    public async addCliente(cliente: ICliente) {
        let clienteDb = new ClienteModel(cliente);
        let result = await clienteDb.save();
        return result;
    }

    // funcion updateClientes() hace una consulta a la base de datos 
    //actualiza un cliente especifico
    //recibe como parametros el id del cliente y los datos que se van ha actualizar  
    public async updateCliente(id: string, cliente: any) {
        let result = await ClienteModel.update({ _id: id }, { $set: cliente });
        return result;
    }


    // funcion deleteCliente elimina al un cliente especifico
    public async deleteCliente(id: string) {
        let result = await ClienteModel.remove({ _id: id });
        return result;
    }

}
export default BusinessCliente;