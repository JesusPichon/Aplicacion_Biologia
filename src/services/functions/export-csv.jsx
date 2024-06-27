import { verTomasExportar} from "../../services/database/SQLite";
import GrupoController from "../../services/controllers/grupoController";
import RNFS from 'react-native-fs';

//Funciones para exportar
const controller = new GrupoController(); //agregar controller

export const columnasComillas = (field, value) => {
    if (typeof value === 'undefined' || value === null) {
        return false;
    }
    if (typeof value !== 'string') {
        value = value.toString();
    }
    return value.includes(',');
};

export const getRawData = async (nombreGrupo) => {
    try {
        const id = await controller.searchGroupByID(nombreGrupo);
        const tomas = await verTomasExportar(id);
        //console.log(tomas);
        //setListaTomas(tomas); // Actualiza el estado con las tomas obtenidas
        return tomas; // Resuelve la promesa con los datos obtenidos
    } catch (error) {
        //console.error("Error obteniendo las tomas: ", error);
        throw error; // Lanza el error para que sea manejado en la función exportar
    }
};

export const formatData = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const nuevoDatosCsv = data.map((toma) => {
                const tomaData = {
                    nombre_cientifico: toma.nombre_cientifico || '',
                    familia: toma.familia || '',
                    nombre_local: toma.nombre_local || '',
                    estado: toma.estado || '',
                    municipio: toma.municipio || '',
                    localidad: toma.localidad || '',
                    altitud: toma.altitud || '',
                    grados_Latitud: toma.grados_Latitud || '',
                    minutos_Latitud: toma.minutos_Latitud || '',
                    segundos_Latitud: toma.segundos_Latitud || '',
                    hemisferio_Latitud: toma.hemisferio_Latitud || '',
                    grados_Longitud: toma.grados_Longitud || '',
                    minutos_Longitud: toma.minutos_Longitud || '',
                    segundos_Longitud: toma.segundos_Longitud || '',
                    hemisferio_Longitud: toma.hemisferio_Longitud || '',
                    x: toma.x || '',
                    y: toma.y || '',
                    tipo_vegetacion: toma.tipo_vegetacion || '',
                    informacion_ambiental: toma.informacion_ambiental || '',
                    suelo: toma.suelo || '',
                    asociada: toma.asociada || '',
                    abundancia: toma.abundancia || '',
                    forma_biologica: toma.forma_biologica || '',
                    tamano: toma.tamano || '',
                    flor: toma.flor || '',
                    fruto: toma.fruto || '',
                    usos: toma.usos || '',
                    colector_es: toma.colector_es || '',
                    no_colecta: toma.no_colecta || '',
                    fecha: toma.fecha || '',
                    determino: toma.determino || '',
                    otros_datos: toma.otros_datos ? toma.otros_datos.replace(/(?:\r\n|\r|\n)/g, '\\n') : ''
                };
                return tomaData;
            });
            resolve(nuevoDatosCsv); // Resuelve la promesa con los datos formateados
        } catch (error) {
            //console.error("Error formateando datos: ", error);
            reject(error); // Rechaza la promesa si hay un error
        }
    });
}

export const guardarArchivoCSV = (nombreArchivo, contenidoCSV) => {
    return new Promise((resolve, reject) => {
        const now = new Date();

        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        const rutaArchivo = `${RNFS.DownloadDirectoryPath}/${nombreArchivo}_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.csv`;

        RNFS.writeFile(rutaArchivo, contenidoCSV, 'utf8')
            .then(() => {
                resolve('Archivo guardado exitosamente en la carpeta Descargas \n' + rutaArchivo);
            })
            .catch((error) => {
                reject('Error al guardar el archivo: ' + error);
            });
    });
};
