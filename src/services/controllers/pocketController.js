import pb from '../PocketBase/pocketbase';
//await pb.admins.authWithPassword('irvyn.xicale@alumno.buap.mx','eaACsE-poHg53xHlpei2STAvEoezAP3N')

class PocketController {

    async obtenerGruposDeOtros(pagina, itemsPorPagina) {
        try {
            const user = pb.authStore.model.username;
            const records = await pb.collection('grupos').getList(pagina, itemsPorPagina, {
                sort: '-created',
                filter: `autor != "${user}"`,
            });
            return records;
        } catch (error) {
            console.error("Error al obtener grupos:", error);
            throw new Error("Error al obtener grupos: " + error.message);
        }
    }

    async obtenerMisGrupos(pagina, itemsPorPagina) {
        try {
            const user = pb.authStore.model.username;
            const records = await pb.collection('grupos').getList(pagina, itemsPorPagina, {
                sort: '-created',
                filter: `autor = "${user}"`,
            });
            return records;
        } catch (error) {
            console.error("Error al obtener grupos:", error);
            throw new Error("Error al obtener grupos: " + error.message);
        }
    }
    
    async EliminarGrupo(id) {
        try {
            const records = await pb.collection('grupos').delete(id);
            return records;
        } catch (error) {
            console.error("Error al obtener grupos:", error);
            throw new Error("Error al obtener grupos: " + error.message);
        }
    }

    // Tomas

    async ObtenerTomas(id, pagina, itemsPorPagina) {
        try {
            const resultList = await pb.collection('tomas').getList(pagina, itemsPorPagina, {
                sort: '-created',
                filter: `id_grupo = "${id}"`,
            });
            return resultList;
        } catch (error) {
            console.error("Error fetching list:", error);
            return null; // O cualquier valor que tenga sentido devolver en caso de error
        }
    }
    

    async publicarGrupo(dataGrupo, dataTomas) {
        try {
            const nuevoGrupo = await pb.collection('grupos').create(dataGrupo);

            // Subir cada toma asociada a ese grupo
            for (const toma of dataTomas) {
                await pb.collection('tomas').create({ 
                    ...toma,
                    id_grupo: nuevoGrupo.id,
                });
            }

        }catch(error){
            console.error("Error al publicar el grupo:", error);
            throw new Error("Error al publicar el grupo: " + error.message);
        }
    }
}


export default PocketController;