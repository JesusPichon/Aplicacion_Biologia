import { openDatabase } from "react-native-sqlite-storage";

let db = openDatabase({
  name: 'MisTomas.db',
  location: 'default'
});

export const borrarTablas = (nombreTabla) => {
  db.transaction(tx => {
    tx.executeSql(`DROP TABLE IF EXISTS ${nombreTabla}`, [], (_, result) => {
      console.log(`Tabla ${nombreTabla} eliminada correctamente.`);
    }, (_, error) => {
      console.error(`Error al eliminar la tabla ${nombreTabla}: ${error.message}`);
    });
  });
};

export const crearTablas = () => {
  let tablesCreatedSuccessfullyCount = 0;

  const tableNames = [
    'GRUPOS',
    'TOMAS'
  ];

  for (const tableName of tableNames) {
    const tableDefinition = generateTableDefinition(tableName);

    db.transaction(tx => {
      tx.executeSql(tableDefinition, [], successCallback(tableName), failureCallback(tableName));
    });
  }

  function successCallback(tableName) {
    return function (_, _results) {
      console.log(`tabla ${tableName} creada exitosamente`);
      tablesCreatedSuccessfullyCount++;

      if (tablesCreatedSuccessfullyCount === tableNames.length) {
        console.log('Todas las tablas fueron creadas exitosamente!');
      }
    };
  }

  function failureCallback(tableName) {
    return function (_, error) {
      console.error(`Error mientras se creaba la tabla "${tableName}": `);
      console.error(error.message);
    };
  }

  function generateTableDefinition(tableName) {
    switch (tableName) {
      case 'GRUPOS':
        return `CREATE TABLE IF NOT EXISTS 'GRUPOS'(
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            nombre TEXT)`;
      case 'TOMAS':
        return `CREATE TABLE IF NOT EXISTS 'TOMAS'(
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            nombre_cientifico TEXT,
            familia TEXT,
            nombre_local TEXT,
            estado TEXT,
            municipio TEXT,
            localidad TEXT,
            altitud INTEGER, --Revisar si se puden poner decimales 
            grados_Latitud INTEGER,
            minutos_Latitud INTEGER,
            hemisferio_Latitud INTEGER,
            grados_Longitud INTEGER,
            minutos_Longitud INTEGER,
            hemisferio_Longitud INTEGER,
            x REAL,
            y REAL,
            tipo_vegetacion TEXT,
            informacion_ambiental TEXT,
            suelo TEXT,
            asociada TEXT,
            abundancia TEXT CHECK (abundancia IN ("Escasa", "Regular", "Abundante")),
            forma_biologica TEXT,
            tamano REAL,
            flor TEXT,
            fruto TEXT,
            usos TEXT,
            colector_es TEXT,
            no_colecta TEXT,
            fecha TEXT CHECK(DATE(fecha)),
            determino TEXT,
            otros_datos TEXT,
            grupo INTEGER NOT NULL,
            FOREIGN KEY("grupo") REFERENCES GRUPOS("id"))`;
      default:
        throw new Error(`Nombre de tabla proporcionado no valido: ${tableName}`);
    }
  }
};

export const insertarGrupos = (nombreGrupo) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO GRUPOS (nombre) VALUES (?)`,
      [nombreGrupo],
      (_, results) => {
        if (results.rowsAffected > 0) {
          console.log(`¡El grupo ${nombreGrupo} se ha insertado correctamente en la tabla GRUPOS!`);
        } else {
          console.log(`Error: No se pudo insertar el grupo ${nombreGrupo} en la tabla GRUPOS.`);
        }
      },
      error => {
        console.log(`Error al intentar insertar el grupo ${nombreGrupo}: ${error.message}`);
      }
    );
  });
};

export const consultarIdGrupo = (nombreGrupo) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT id FROM GRUPOS WHERE nombre = ?',
        [nombreGrupo],
        (tx, results) => {
          if (results.rows.length > 0) {
            const id = results.rows.item(0).id;
            console.log(`ID encontrado para ${nombreGrupo}: ${id}`);
            resolve(id);
          } else {
            console.log(`No se encontró ningún ID para ${nombreGrupo}`);
            reject(`No se encontró ningún ID para ${nombreGrupo}`);
          }
        },
        (error) => {
          console.log(`Error al consultar el ID para ${nombreGrupo}: ${error.message}`);
          reject(`Error al consultar el ID para ${nombreGrupo}: ${error.message}`);
        }
      );
    });
  });
};

export const insertarTomas = (tomasData) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO TOMAS (
        nombre_cientifico,
        familia,
        nombre_local,
        estado,
        municipio,
        localidad,
        altitud,
        grados_Latitud,
        minutos_Latitud,
        hemisferio_Latitud,
        grados_Longitud,
        minutos_Longitud,
        hemisferio_Longitud,
        x,
        y,
        tipo_vegetacion,
        informacion_ambiental,
        suelo,
        asociada,
        abundancia,
        forma_biologica,
        tamano,
        flor,
        fruto,
        usos,
        colector_es,
        no_colecta,
        fecha,
        determino,
        otros_datos,
        grupo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [...Object.values(tomasData)], // Convierte el objeto en un array de valores
      (_, results) => {
        if (results.rowsAffected > 0) {
          console.log(`La toma ha sido insertada correctamente en la tabla TOMAS.`);
        } else {
          console.log(`Error: La toma no se pudo insertar en la tabla TOMAS.`);
        }
      },
      error => {
        console.log(`Error al intentar insertar la toma: ${error.message}`);
      }
    );
  });
};

export const verGrupos = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT nombre FROM GRUPOS', [], (tx, results) => {
        const len = results.rows.length;
        if (len > 0) {
          const grupos = [];
          for (let i = 0; i < len; i++) {
            grupos.push(results.rows.item(i).nombre);
          }
          console.log(`Consulta exitosa, ${len} nombres de grupos encontrados`);
          resolve(grupos);
        } else {
          console.log('No se encontraron resultados.');
          resolve([]);
        }
      }, error => {
        console.error('Error al ejecutar la consulta:', error);
        reject(error);
      });
    });
  });
};

export const verGruposFiltrado = (nombre) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT nombre FROM GRUPOS WHERE nombre LIKE ?', [`%${nombre}%`], (tx, results) => {
        const len = results.rows.length;
        if (len > 0) {
          const grupos = [];
          for (let i = 0; i < len; i++) {
            grupos.push(results.rows.item(i).nombre);
          }
          console.log(`Consulta exitosa, ${len} nombres de grupos encontrados`);
          resolve(grupos); // Resolvemos la promesa con los resultados
        } else {
          console.log('No se encontraron resultados.');
          resolve([]); // Resolvemos la promesa con un array vacío si no hay resultados
        }
      }, error => {
        console.error('Error al ejecutar la consulta:', error);
        reject(error); // Rechazamos la promesa en caso de error
      });
    });
  });
};

//Este fragmento de codigo pasarlo a la sección donde se muestran los grupos
/*verGrupos()
  .then(result => {
    //Agregar aqui la funcionalidad para utilizar el resultado obtenido
    console.log('Grupos obtenidos: ', result);
  })
  .catch(error => {
    console.error('Ocurrió un error al obtener los grupos:', error);
  });*/
////////////////////////////////////////////////////////////////////////////

export const verTomas = (grupoId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM TOMAS WHERE grupo = ?',
        [grupoId],
        (tx, results) => {
          const len = results.rows.length;
          let tomas = [];
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              const tomaObj = {};

              Object.keys(row).forEach(key => {
                tomaObj[key] = row[key];
              });

              tomas.push(tomaObj);
            }

            console.log(`Consulta exitosa, ${len} tomas encontradas`);
            resolve(tomas);
          } else {
            console.log('No se encontraron tomas.');
            resolve([]);
          }
        }, error => {
          console.error('Error al ejecutar la consulta de tomas:', error);
          reject(error);
        });
    });
  });
};

export const verTomasFiltrado = (grupoId, buscar) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Obtener los nombres de las columnas de la tabla TOMAS
      tx.executeSql('PRAGMA table_info(TOMAS)', [], (tx, result) => {
        const numCols = result.rows.length;
        const columnNames = [];
        for (let i = 0; i < numCols; i++) {
          columnNames.push(result.rows.item(i).name);
        }

        // Construir la consulta dinámica para buscar en cada columna
        const placeholders = Array(numCols - 1).fill('?').join(' OR '); // Excluye el campo de ID
        const query = `SELECT * FROM TOMAS WHERE grupo = ? AND (${columnNames.slice(1).map(name => `${name} LIKE ?`).join(' OR ')})`;
        const params = [grupoId, ...Array(numCols - 1).fill(`%${buscar}%`)]; // Excluye el campo de ID

        // Ejecutar la consulta SQL
        tx.executeSql(query, params,
          (tx, results) => {
            const len = results.rows.length;
            let tomas = [];
            if (len > 0) {
              for (let i = 0; i < len; i++) {
                const row = results.rows.item(i);
                const tomaObj = {};
                
                Object.keys(row).forEach(key => {
                  tomaObj[key] = row[key];
                });
                
                tomas.push(tomaObj);
              }
              
              console.log(`Consulta exitosa, ${len} tomas encontradas`);
              resolve(tomas);
            } else {
              console.log('No se encontraron tomas.');
              resolve([]);
            }
          }, error => {
            console.error('Error al ejecutar la consulta de tomas:', error);
            reject(error);
          });
      });
    });
  });
};




//Este fragmento de codigo pasarlo a la sección donde se muestran las tomas
/*verTomas("Poner aqui la variable con el id del grupo del que se quieran mostrar sus tomas")
  .then(tomas => {
    //Agregar aqui la funcionalidad para utilizar el resultado obtenido
    console.log(tomas);
  })
  .catch(error => {
    // Maneja el error aquí
    console.error(error);
  });*/
///////////////////////////////////////////////////////////////////////////

export const editarToma = (tomasData, id) => {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE TOMAS SET 
        nombre_cientifico = ?,
        familia = ?,
        nombre_local = ?,
        estado = ?,
        municipio = ?,
        localidad = ?,
        altitud = ?,
        grados_Latitud = ?,
        minutos_Latitud = ?,
        hemisferio_Latitud = ?,
        grados_Longitud = ?,
        minutos_Longitud = ?,
        hemisferio_Longitud = ?,
        x = ?,
        y = ?,
        tipo_vegetacion = ?,
        informacion_ambiental = ?,
        suelo = ?,
        asociada = ?,
        abundancia = ?,
        forma_biologica = ?,
        tamano = ?,
        flor = ?,
        fruto = ?,
        usos = ?,
        colector_es = ?,
        no_colecta = ?,
        fecha = ?,
        determino = ?,
        otros_datos = ?
      WHERE id = ?`,
      [...Object.values(tomasData), id], // Convierte el objeto en un array de valores y agrega el grupo para identificar la toma a editar
      (_, results) => {
        if (results.rowsAffected > 0) {
          console.log(`La información de la toma ha sido actualizada correctamente en la tabla TOMAS.`);
        } else {
          console.log(`Error: No se pudo actualizar la información de la toma en la tabla TOMAS.`);
        }
      },
      error => {
        console.log(`Error al intentar editar la toma: ${error.message}`);
      }
    );
  });
};