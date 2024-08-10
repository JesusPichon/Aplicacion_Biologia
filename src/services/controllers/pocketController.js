import pb from '../PocketBase/pocketbase';

const user = pb.authStore.model.username;

//await pb.admins.authWithPassword('irvyn.xicale@alumno.buap.mx','eaACsE-poHg53xHlpei2STAvEoezAP3N')

class PocketController {

    async obtenerGruposDeOtros() {
        try {
            console.log(user)
            const records = await pb.collection('grupos').getFullList({
                sort: '-created',
                filter: `autor != "${user}"`,
            });
            return records;
        } catch (error) {
            console.error("Error al obtener grupos:", error);
            throw new Error("Error al obtener grupos: " + error.message);
        }
    }

    async obtenerMisGrupos() {
        try {
            const records = await pb.collection('grupos').getFullList({
                sort: '-created',
                filter: `autor = "${user}"`,
            });
            return records;
        } catch (error) {
            console.error("Error al obtener grupos:", error);
            throw new Error("Error al obtener grupos: " + error.message);
        }
    }
    

    
}


export default PocketController;