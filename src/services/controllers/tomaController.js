import {
    consultarIdGrupo,
    verTomas,
    eliminarToma
} from "../../services/database/SQLite";

class TomaController {

    async obtenerTomas(groupName) {
        try {

            const id = await consultarIdGrupo(groupName);
            const listaTomas = await verTomas(id);
            return listaTomas;

        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarToma(nombreGrupo, idToma) {
        try{
            const idGrupo = await consultarIdGrupo(nombreGrupo);
            eliminarToma(idGrupo, idToma);
        }catch(error){
            throw new Error(error);
        }
    }

}


export default TomaController;