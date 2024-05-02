import { openDatabase } from "react-native-sqlite-storage";

let db = openDatabase({
  name: 'MisTomas.db',
  location: 'default'
});

export const borrarTablas = (nombreTabla) => {
  db.transaction(tx => {
    tx.executeSql(`DROP TABLE IF EXISTS ${nombreTabla}`, [], (_, result) => {
      //console.log(`Tabla ${nombreTabla} eliminada correctamente.`);
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
      //console.log(`tabla ${tableName} creada exitosamente`);
      tablesCreatedSuccessfullyCount++;

      if (tablesCreatedSuccessfullyCount === tableNames.length) {
        //console.log('Todas las tablas fueron creadas exitosamente!');
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
            segundos_Latitud INTEGER,
            hemisferio_Latitud INTEGER,
            grados_Longitud INTEGER,
            minutos_Longitud INTEGER,
            segundos_Longitud INTEGER,
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
            imagen TEXT,
            FOREIGN KEY("grupo") REFERENCES GRUPOS("id"))`;
      default:
        throw new Error(`Nombre de tabla proporcionado no valido: ${tableName}`);
    }
  }
};

// export const insertarGrupos = (nombreGrupo) => {
//   db.transaction(tx => {
//     tx.executeSql(
//       `INSERT INTO GRUPOS (nombre) VALUES (?)`,
//       [nombreGrupo],
//       (_, results) => {
//         if (results.rowsAffected > 0) {
//           console.log(`¡El grupo ${nombreGrupo} se ha insertado correctamente en la tabla GRUPOS!`);
//         } else {
//           console.log(`Error: No se pudo insertar el grupo ${nombreGrupo} en la tabla GRUPOS.`);
//         }
//       },
//       error => {
//         console.log(`Error al intentar insertar el grupo ${nombreGrupo}: ${error.message}`);
//       }
//     );
//   });
// };

export const insertarGrupos = (nombreGrupo) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO GRUPOS (nombre) VALUES (?)`,
        [nombreGrupo],
        (_, results) => {
          if (results.rowsAffected > 0) {
            //console.log(`¡El grupo ${nombreGrupo} se ha insertado correctamente en la tabla GRUPOS!`);
            resolve();
          } else {
            const errorMessage = `Error: No se pudo insertar el grupo ${nombreGrupo} en la tabla GRUPOS.`;
            console.error(errorMessage);
            reject(new Error(errorMessage));
          }
        },
        error => {
          const errorMessage = `Error al intentar insertar el grupo ${nombreGrupo}: ${error.message}`;
          console.error(errorMessage);
          reject(new Error(errorMessage));
        }
      );
    });
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
            //console.log(`ID encontrado para ${nombreGrupo}: ${id}`);
            resolve(id);
          } else {
            //console.log(`No se encontró ningún ID para ${nombreGrupo}`);
            reject(`No se encontró ningún ID para ${nombreGrupo}`);
          }
        },
        (error) => {
          //console.log(`Error al consultar el ID para ${nombreGrupo}: ${error.message}`);
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
        segundos_Latitud,
        hemisferio_Latitud,
        grados_Longitud,
        minutos_Longitud,
        segundos_Longitud,
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
        grupo,
        imagen)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [...Object.values(tomasData)], // Convierte el objeto en un array de valores
      (_, results) => {
        if (results.rowsAffected > 0) {
          //console.log(`La toma ha sido insertada correctamente en la tabla TOMAS.`);
        } else {
          console.error(`Error: La toma no se pudo insertar en la tabla TOMAS.`);
        }
      },
      error => {
        console.error(`Error al intentar insertar la toma: ${error.message}`);
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
          //console.log(`Consulta exitosa, ${len} nombres de grupos encontrados`);
          resolve(grupos);
        } else {
          //console.log('No se encontraron resultados.');
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
          //console.log(`Consulta exitosa, ${len} nombres de grupos encontrados`);
          resolve(grupos); // Resolvemos la promesa con los resultados
        } else {
          //console.log('No se encontraron resultados.');
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

export const verTomas = (grupoId, pageNumber, numTomas, filtrar, campo) => {
  const itemsPerPage = numTomas; // Define la cantidad de elementos por página
  const offset = (pageNumber - 1) * itemsPerPage; // Calcula el offset para la paginación

  return new Promise((resolve, reject) => {
      db.transaction(tx => {
        let query = `SELECT * FROM TOMAS WHERE grupo = ?`;
        let params = [grupoId];

        // Agregar la condición de filtrado si el filtro no es una cadena vacía
        if (filtrar !== "") {
          query += ` AND ${campo} LIKE ? ORDER BY id DESC`;
          params.push(`%${filtrar}%`);
        }else {
          query += `ORDER BY id DESC`;
        }

        query += ` LIMIT ? OFFSET ?`;
        params.push(itemsPerPage, offset);
          tx.executeSql(
              query,
              params,
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

                      //console.log(`Consulta exitosa, ${len} tomas encontradas`);
                      resolve(tomas);
                  } else {
                      //console.log('No se encontraron tomas.');
                      resolve([]);
                  }
              },
              error => {
                  console.error('Error al ejecutar la consulta de tomas:', error);
                  reject(error);
              }
          );
      });
  });
};

export const verTomasTotales = (grupoId, filtrar, campo) => {
  return new Promise((resolve, reject) => {
      db.transaction(tx => {
          const query = `SELECT COUNT(*) AS total_tomas FROM TOMAS WHERE grupo = ? AND ${campo} LIKE ?`;
          const params = [grupoId, `%${filtrar}%`];
          tx.executeSql(
              query,
              params,
              (tx, results) => {
                  const len = results.rows.length;
                  if (len > 0) {
                      const totalTomas = results.rows.item(0).total_tomas;
                      //console.log(`Consulta exitosa, total de tomas: ${totalTomas}`);
                      resolve(totalTomas);
                  } else {
                      //console.log('No se encontraron tomas.');
                      resolve(0);
                  }
              },
              error => {
                  console.error('Error al ejecutar la consulta de tomas totales:', error);
                  reject(error);
              }
          );
      });
  });
};



export const verTomasFiltrado = (grupoId, campo, buscar) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Construir la consulta dinámica para buscar en el campo especificado
      const query = `SELECT * FROM TOMAS WHERE grupo = ? AND ${campo} LIKE ? `;
      const params = [grupoId, `%${buscar}%`];

      // Ejecutar la consulta SQL
      tx.executeSql(query, params,
        (tx, results) => {
          const len = results.rows.length;
          let tomas = [];
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              const tomaObj = {};

              // Copiar los datos de la fila a un objeto toma
              Object.keys(row).forEach(key => {
                tomaObj[key] = row[key];
              });

              tomas.push(tomaObj);
            }

            //console.log(`Consulta exitosa, ${len} tomas encontradas`);
            resolve(tomas);
          } else {
            //console.log('No se encontraron tomas.');
            resolve([]);
          }
        }, 
        error => {
          console.error('Error al ejecutar la consulta de tomas:', error);
          reject(error);
        }
      );
    });
  });
};

export const verTomasExportar = (grupoId) => {
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

            //console.log(`Consulta exitosa, ${len} tomas encontradas`);
            resolve(tomas);
          } else {
            //console.log('No se encontraron tomas.');
            resolve([]);
          }
        }, error => {
          console.error('Error al ejecutar la consulta de tomas:', error);
          reject(error);
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
        segundos_Latitud = ?,
        hemisferio_Latitud = ?,
        grados_Longitud = ?,
        segundos_Longitud = ?,
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
          //console.log(`La información de la toma ha sido actualizada correctamente en la tabla TOMAS.`, results);
        } else {
          //console.log(`Error: No se pudo actualizar la información de la toma en la tabla TOMAS.`, results);
        }
      },
      error => {
        console.error(`Error al intentar editar la toma: ${error.message}`);
      }
    );
  });
};

export const eliminarGrupo = (nombreGrupo) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM GRUPOS WHERE nombre = ?',
          [nombreGrupo],
          (_, result) => {
            //console.log(`${nombreGrupo} eliminado exitosamente`);
            resolve(); // Resolve the promise on success
          },
          (_, error) => {
            console.error(`Error al borrar ${nombreGrupo}: `, error);
            reject(error); // Reject the promise on error
          }
        );
      },
      (error) => {
        console.error('Error al ejecutar la consulta: ', error);
        reject(error); // Reject the promise on error during transaction
      }
    );
  });
};

//Elimina todas las tomas de un grupo
export const eliminarTomas = (groupID) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM TOMAS WHERE grupo = ?',
          [groupID],
          (_, result) => {
            //console.log('Las tomas con ID de grupo ', groupID, ' se eliminaron exitosamente');
            resolve(); // Resolve the promise on success
          },
          (_, error) => {
            console.error('Error mientras se borraban las tomas: ', error);
            reject(error); // Reject the promise on error
          }
        );
      },
      (error) => {
        console.error('Error al ejecutar la consulta: ', error);
        reject(error); // Reject the promise on error during transaction
      }
    );
  });
};

//Elimina una toma de un grupo
export const eliminarToma = (idGrupo, idToma) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM TOMAS WHERE grupo = ? AND id = ?',
          [idGrupo, idToma],
          (_, result) => {
            //console.log('La toma con ID ', idToma, ' se eliminó exitosamente');
            resolve(); // Resolve the promise on success
          },
          (_, error) => {
            console.error('Error mientras se borraba la toma: ', error);
            reject(error); // Reject the promise on error
          }
        );
      },
      (error) => {
        console.error('Error al ejecutar la consulta: ', error);
        reject(error); // Reject the promise on error during transaction
      }
    );
  });
};


//ESTE METODO VA EN LA PANTALLA DE LOS GRUPOS
const borrarGT = (nombreGrupo) => {
  // Obtiene primero el ID del grupo a eliminar
  consultarIdGrupo(nombreGrupo)
      .then((id) => {
          // Elimina las tomas pertenecientes al grupo a eliminar
          eliminarTomas(id)
              .then(() => {
                  // Si las tomas se eliminan exitosamente, se procede a eliminar el grupo
                  eliminarGrupo(nombreGrupo);
              })
              .catch((error) => {
                  console.error('Error al ejecutar eliminarTomas:', error);
              });
      })
      .catch((error) => {
          console.error('Error al obtener el ID del grupo:', error);
      });
};

export const consultarNombreGrupo = (nombreGrupo) => {
  return new Promise((resolve, reject) => {
      db.transaction(tx => {
          tx.executeSql(
              'SELECT * FROM GRUPOS WHERE nombre = ?',
              [nombreGrupo],
              (tx, results) => {
                  if (results.rows.length > 0) {
                      //console.log('El nombre de grupo ya existe en la tabla GRUPOS.');
                      resolve(true);
                  } else {
                      //console.log('El nombre de grupo no existe en la tabla GRUPOS.');
                      resolve(false);
                  }
              },
              error => {
                  console.error('Error al ejecutar la consulta:', error);
                  reject(error);
              }
          );
      });
  });
};

export const actualizarTabla = (tabla, nuevoCampo, tipoCampo) => {
  db.transaction((tx) => {
    tx.executeSql(
      `PRAGMA table_info(${tabla});`,
      [],
      (tx, result) => {
        let columnExists = false;
        for (let i = 0; i < result.rows.length; i++) {
          if (result.rows.item(i).name === nuevoCampo) {
            columnExists = true;
            break;
          }
        }

        if (!columnExists) {
          tx.executeSql(
            `ALTER TABLE ${tabla} ADD COLUMN ${nuevoCampo} ${tipoCampo};`,
            [],
            (tx, result) => {
              console.log(`Campo ${nuevoCampo} agregado con éxito`);
            },
            (error) => {
              console.error(`Error al agregar el campo ${nuevoCampo}: `, error);
            }
          );
        } else {
          console.log(`El campo ${nuevoCampo} ya existe en la tabla`);
        }
      },
      (error) => {
        console.error(`Error al verificar la existencia del campo ${nuevoCampo}: `, error);
      }
    );
  });
};

// Método para actualizar la URI de una imagen en la tabla TOMAS
export const actualizarIMG = (id, uri) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE TOMAS SET imagen = ? WHERE id = ?',
      [uri, id],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('URI de la imagen actualizada con éxito en TOMAS.');
        } else {
          console.log('Error al actualizar la URI de la imagen en TOMAS.');
        }
      }
    );
  });
};