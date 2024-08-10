import pb from '../PocketBase/pocketbase';

//await pb.admins.authWithPassword('irvyn.xicale@alumno.buap.mx','eaACsE-poHg53xHlpei2STAvEoezAP3N')

class PocketController {

    async obtenerGrupos() {
        try {
            const records = await pb.collection('grupos').getFullList({
                sort: '-created',
            });
            return records;
        } catch (error) {
            console.error("Error al obtener grupos:", error);
            throw new Error("Error al obtener grupos: " + error.message);
        }
    }
    

    
}


export default PocketController;