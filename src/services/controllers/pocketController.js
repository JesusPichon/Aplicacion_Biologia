import pb from '../PocketBase/pocketbase';

class PocketController {
  async obtenerGruposDeOtros(pagina, itemsPorPagina, buscar) {
    try {
      const user = pb.authStore.model.username;
      const filter = `autor != "${user}"${
        buscar && buscar != '' ? ` && nombre ~ "${buscar}"` : ''
      }`;
      const records = await pb
        .collection('grupos')
        .getList(pagina, itemsPorPagina, {
          sort: '-created',
          filter: filter,
        });
      return records;
    } catch (error) {
      console.error('Error al obtener grupos:', error);
      throw new Error('Error al obtener grupos: ' + error.message);
    }
  }

  async obtenerMisGrupos(pagina, itemsPorPagina, buscar) {
    try {
      const user = pb.authStore.model.username;
      const filter = `autor = "${user}"${
        buscar ? ` && nombre ~ "${buscar}"` : ''
      }`;
      const records = await pb
        .collection('grupos')
        .getList(pagina, itemsPorPagina, {
          sort: '-created',
          filter: filter,
        });
      return records;
    } catch (error) {
      console.error('Error al obtener grupos:', error);
      throw new Error('Error al obtener grupos: ' + error.message);
    }
  }

  async EliminarGrupo(id) {
    try {
      const records = await pb.collection('grupos').delete(id);
      return records;
    } catch (error) {
      console.error('Error al obtener grupos:', error);
      throw new Error('Error al obtener grupos: ' + error.message);
    }
  }

  // Tomas

  async ObtenerTomas(id, pagina, itemsPorPagina, buscar, campo) {
    try {
      const filter = `id_grupo = "${id}" ${
        buscar ? ` && ${campo} ~ "${buscar}"` : ''
      }`;
      const resultList = await pb
        .collection('tomas')
        .getList(pagina, itemsPorPagina, {
          sort: '-created',
          filter: filter,
        });
      return resultList;
    } catch (error) {
      console.error('Error fetching list:', error);
      return null; // O cualquier valor que tenga sentido devolver en caso de error
    }
  }

  async ObtenerTomasFull(id) {
    try {
      // Obtener los registros del grupo especificado
      const records = await pb.collection('tomas').getFullList({
        sort: '-created',
        filter: `id_grupo = "${id}"`,
      });

      // Recorrer los registros y eliminarlos
      for (const record of records) {
        await pb.collection('tomas').delete(record.id);
      }

      return records;
    } catch (error) {
      console.error('Error fetching or deleting records:', error);
      return null; // O cualquier valor que tenga sentido devolver en caso de error
    }
  }

  async publicarGrupo(dataGrupo, dataTomas) {
    try {
      const nuevoGrupo = await pb.collection('grupos').create(dataGrupo);

      // Subir cada toma asociada a ese grupo
      for (const toma of dataTomas) {
        await pb.collection('tomas').create({
          ...toma,
          id_grupo: nuevoGrupo.id,
        });
      }
    } catch (error) {
      console.error('Error al publicar el grupo:', error);
      throw new Error('Error al publicar el grupo: ' + error.message);
    }
  }
}

export default PocketController;
