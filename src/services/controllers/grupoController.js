import {
    insertarGrupos,
    eliminarGrupo,
    verGrupos,
    consultarIdGrupo,
    consultarNombreGrupo,
    insertarTomas,
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
            return true;
        }
        return false;
    }

    importTomas(nombreGrupo, data) {
        let grupoID;
        consultarIdGrupo(nombreGrupo)
            .then((id) => {
                grupoID = id; // Asignar el id del grupo a tomaData
                //console.log(data);
                data.forEach((toma) => {
                    console.log(toma);
                    const tomaData = {
                        nombre_cientifico: toma.nombre_cientifico,
                        familia: toma.familia,
                        nombre_local: toma.nombre_local,
                        estado: toma.estado,
                        municipio: toma.municipio,
                        localidad: toma.localidad,
                        altitud: toma.altitud,
                        grados_Latitud: toma.grados_Latitud,
                        minutos_Latitud: toma.minutos_Latitud,
                        segundos_Latitud: toma.segundos_Latitud, // Nueva Variable
                        hemisferio_Latitud: toma.hemisferio_Latitud,
                        grados_Longitud: toma.grados_Longitud,
                        minutos_Longitud: toma.minutos_Longitud,
                        segundos_Longitud: toma.segundos_Longitud, // Nueva Variable
                        hemisferio_Longitud: toma.hemisferio_Longitud,
                        x: toma.x,
                        y: toma.y,
                        tipo_vegetacion: toma.tipo_vegetacion,
                        informacion_ambiental: toma.informacion_ambiental,
                        suelo: toma.suelo,
                        asociada: toma.asociada,
                        abundancia: toma.abundancia,
                        forma_biologica: toma.forma_biologica,
                        tamano: toma.tamano,
                        flor: toma.flor,
                        fruto: toma.fruto,
                        usos: toma.usos,
                        colector_es: toma.colector_es,
                        no_colecta: toma.no_colecta,
                        fecha: toma.fecha,
                        determino: toma.determino,
                        otros_datos: toma.otros_datos,
                        grupo: grupoID,
                    };
                    insertarTomas(tomaData);
                });
            })
            .catch((error) => console.error("Error insertar toma: ", error)
        );
    }
}


export default GrupoController;