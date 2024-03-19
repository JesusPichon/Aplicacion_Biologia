import {
    consultarIdGrupo,
    verTomas,
    eliminarToma,
    verTomasTotales
} from "../../services/database/SQLite";

class TomaController {

    async obtenerTomas(groupName, pageNumber, numTomas, filtrar, campo) {
        try {

            const id = await consultarIdGrupo(groupName);
            const listaTomas = await verTomas(id, pageNumber, numTomas, filtrar, campo);
            return listaTomas;

        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerTomasTotales(groupName, filtrar, campo) {
        try {

            const id = await consultarIdGrupo(groupName);
            const Tomas = await verTomasTotales(id, filtrar, campo);
            return Tomas;

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