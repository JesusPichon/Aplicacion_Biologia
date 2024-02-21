import {openDatabase} from "react-native-sqlite-storage";

let db = openDatabase({
    name: 'MisTomas.db',
    location: 'default'
});

export const crearTablas = () => {
    let tablesCreatedSuccessfullyCount = 0;
  
    const tableNames = [
        'TABLA_NOMBRE',
        'TABLA_DIRECCION',
        'TABLA_CARACTERISTICAS',
        'TABLA_INFO_AMBIENTAL',
        'TABLA_CARACTERISTICAS_INFO',
        'TABLA_TOMAS'
      ];
    
      for (const tableName of tableNames) {
        const tableDefinition = generateTableDefinition(tableName);
    
        db.transaction(tx => {
          tx.executeSql(tableDefinition, [], successCallback(tableName), failureCallback(tableName));
        });
      }
    
      function successCallback(tableName) {
        return function(_, _results) {
          console.log(`tabla ${tableName} creada exitosamente`);
          tablesCreatedSuccessfullyCount++;
    
          if (tablesCreatedSuccessfullyCount === tableNames.length) {
            console.log('Todas las tablas fueron creadas exitosamente!');
          }
        };
      }
    
      function failureCallback(tableName) {
        return function(_, error) {
          console.error(`Error mientras se creaba la tabla "${tableName}": `);
          console.error(error.message);
        };
      }
  
    function generateTableDefinition(tableName) {
      switch (tableName) {
        case 'TABLA_NOMBRE':
          return `CREATE TABLE IF NOT EXISTS "TABLA_NOMBRE" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "nombre"  TEXT,
            "familia" TEXT,
            "nombre_local" TEXT)`;
        case 'TABLA_DIRECCION':
          return `CREATE TABLE IF NOT EXISTS "TABLA_DIRECCION" (
            "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "localidad"	TEXT,
            "municipio"	TEXT,
            "estado" TEXT,
            "altitud"	TEXT,
            "coordenadas"	TEXT,
            "longitud_oeste"	TEXT,
            "longitud_norte"	TEXT)`;
        case 'TABLA_CARACTERISTICAS':
          return `CREATE TABLE IF NOT EXISTS "TABLA_CARACTERISTICAS" (
            "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "forma_biologica"	TEXT,
            "tamano"	REAL,
            "flor" TEXT,
            "fruto"	TEXT,
            "usos"	TEXT)`;
        case 'TABLA_INFO_AMBIENTAL':
          return `CREATE TABLE IF NOT EXISTS "TABLA_INFO_AMBIENTAL" (
            "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "comentarios"	TEXT,
            "tipo_vegetacion"	TEXT,
            "suelo" TEXT)`;
        case 'TABLA_CARACTERISTICAS_INFO':
          return `CREATE TABLE IF NOT EXISTS "TABLA_CARACTERISTICAS_INFO" (
            "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "asociadas"	TEXT,
            "comentarios"	TEXT,
            "numero"	INTEGER NOT NULL,
            "fecha"	TEXT CHECK (date(fecha)),
            "abundancia"	TEXT CHECK (abundancia IN ("escasa", "regular", "abundante")),
            "colector_es"	TEXT)`;
        case 'TABLA_TOMAS':
          return `CREATE TABLE IF NOT EXISTS "TABLA_TOMAS" (
            "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "nombre"	INTEGER,
            "direccion" INTEGER,
            "informacion_ambiental" INTEGER,
            "caracteristicas" INTEGER,
            "caracteristicas_info"	INTEGER,
            FOREIGN KEY("direccion") REFERENCES TABLA_DIRECCION("id"),
            FOREIGN KEY("nombre") REFERENCES TABLA_NOMBRE("id"),
            FOREIGN KEY("caracteristicas") REFERENCES TABLA_CARACTERISTICAS("id"),
            FOREIGN KEY("informacion_ambiental") REFERENCES TABLA_INFO_AMBIENTAL("id"),
            FOREIGN KEY("caracteristicas_info") REFERENCES TABLA_CARACTERISTICAS_INFO("id"))`;
        default:
          throw new Error(`Nombre de tabla proporcionado no valido: ${tableName}`);
      }
    }
  };