import {
    insertarGrupos,
    eliminarGrupo,
    verGrupos,
    consultarIdGrupo,
    consultarNombreGrupo,
    eliminarTomas
} from "../database/SQLite";


class GrupoController {

    async obtenerGrupos() { //obtiene los grupos desde la base de datos 
        try {
            const lista = await verGrupos();
            return lista;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addGrupo(nombreGrupo) { //agregar grupo por nombre  
        try {
            await insertarGrupos(nombreGrupo);
        } catch (error) {
            throw new Error(error);
        }
    }

    async searchGroupByName(nombreGrupo) { //busca el grupo por nombre
        try {
            const find = await consultarNombreGrupo(nombreGrupo);
            return find;
        } catch (error) {
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

    async deleteGroups(listaGrupos) { //elimina varios grupos de una lista
        if (listaGrupos.length !== 0) {
            listaGrupos.forEach(async (nombreGrupo) => {
                await this.delateGrupoByName(nombreGrupo);
            });
        }
    }
}


export default GrupoController;