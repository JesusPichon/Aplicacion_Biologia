import {
    insertarGrupos,
    eliminarGrupo,
    verGrupos,
    consultarIdGrupo,
    consultarNombreGrupo
} from "../database/SQLite";


class GrupoController {

    async obtenerGrupos() { //obtiene los grupos desde la base de datos 
        try {
            const lista =  await verGrupos();
            return lista;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addGrupo(nombreGrupo) { //agregar grupo por nombre  
        try {
            return (await insertarGrupos(nombreGrupo));
        } catch (error) {
            throw new Error(error);
        }
    }

    async searchGroupByName(nombreGrupo) { //busca el grupo por nombre
        try {
            const resultado = await consultarNombreGrupo(nombreGrupo);
            return resultado !== null; 
        } catch (error){
            throw new Error(error);
        }
    }

    searchGroupByID() {
        console.log("buscando grupo por id");
    }

    async delateGrupoByName(nombreGrupo) { // elimina un grupo y el conjunto de sus tomas de ese grupo 
        try {
            const id = await consultarIdGrupo(nombreGrupo);
            await eliminarTomas(id);
            await eliminarGrupo(nombreGrupo);
            console.log('Grupo eliminado correctamente');
        } catch (error) {
            console.error('El grupo no se pudo eliminar: ', error);
        }
    }

    deleteGroups(listaGrupos) { //elimina varios grupos de una lista
        listaGrupos.forEach(nombreGrupo => {
            this.delateGrupoByName(nombreGrupo);
        });
    }
}


export default GrupoController;