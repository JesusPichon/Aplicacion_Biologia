import {
    insertarGrupos,
    eliminarGrupo,
    verGrupos,
    consultarIdGrupo,
    consultarNombreGrupo
} from "../database/SQLite";


class GrupoController {

    obtenerGrupos() { //obtiene los grupos desde la base de datos 
        verGrupos()
            .then(result => {
                return result;
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    agregarGrupo(nombreGrupo) { //agregar grupo por nombre  
        const nuevoGrupo = { nombre: nombreGrupo };

        insertarGrupos(nombreGrupo)
            .then(() => {
                return true;
            })
            .catch((error) => {
                throw new Error(error);
            })
            .finally(() => {
                return false;
            })
    }

    searchGroupByName(nombreGrupo) { //busca el grupo por nombre
        consultarNombreGrupo(nombreGrupo)
            .then(resultado => {
                resultado !== null ? true : false; // retornamos si lo encontro o no 
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    searchGroupByID() {

    }

    delateGrupoByName(nombreGrupo) { // eliminar grupo junto con sus tomas 

        consultarIdGrupo(nombreGrupo) //consulta primero el nombre 
            .then((id) => {
                eliminarTomas(id)
                    .then(() => {
                        eliminarGrupo(nombreGrupo)
                            .then(() => {
                                console.log('Grupo eliminado correctamente');
                            })
                            .catch((error) => {
                                console.error('El grupo no se pudo eliminar: ', error);
                            })
                    })
                    .catch((error) => {
                        throw new Error(error);
                    });
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    deleteGroups(listaGrupos) { //elimina varios grupos de una lista
        listaGrupos.forEach(nombreGrupo => {
            this.delateGrupoByName(nombreGrupo);
        });
    }
}


export default GrupoController;