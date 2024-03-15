import {
    consultarIdGrupo,
    verTomas
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

}


export default TomaController;