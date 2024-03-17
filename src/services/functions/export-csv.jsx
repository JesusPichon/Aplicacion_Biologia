import { verTomasExportar} from "../../services/database/SQLite";
import GrupoController from "../../services/controllers/grupoController";
import RNFS from 'react-native-fs';

//Funciones para exportar
const controller = new GrupoController(); //agregar controller

export const getRawData = async (nombreGrupo) => {
    try {
        const id = await controller.searchGroupByID(nombreGrupo);
        const tomas = await verTomasExportar(id);
        //console.log(tomas);
        //setListaTomas(tomas); // Actualiza el estado con las tomas obtenidas
        return tomas; // Resuelve la promesa con los datos obtenidos
    } catch (error) {
        console.error("Error obteniendo las tomas: ", error);
        throw error; // Lanza el error para que sea manejado en la función exportar
    }
}

export const formatData = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const nuevoDatosCsv = data.map((toma) => {
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
                    otros_datos: toma.otros_datos
                };
                return tomaData;
            });
            //setDatosCSV(nuevoDatosCsv); // Actualiza el estado con los datos formateados
            resolve(nuevoDatosCsv); // Resuelve la promesa con los datos formateados
        } catch (error) {
            console.error("Error formateando datos: ", error);
            reject(error); // Rechaza la promesa si hay un error
        }
    });
}

export const guardarArchivoCSV = async (nombreArchivo, contenidoCSV) => {
    try {
        const rutaArchivo = `${RNFS.DownloadDirectoryPath}/${nombreArchivo}.csv`;

        await RNFS.writeFile(rutaArchivo, contenidoCSV, 'utf8');
        console.log('Archivo guardado exitosamente en la carpeta de descargas:', rutaArchivo);
    } catch (error) {
        console.error('Error al guardar el archivo en la carpeta de descargas:', error);
    }
};