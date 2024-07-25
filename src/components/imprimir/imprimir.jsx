import RNPrint from 'react-native-print';
import imagenLocal from '../../assets/images/logoEquipo.jpg';
// medidas recomendadas para la imagen width: 755px; height: 60px;

const imprimir = async (listaFichas, imagen) => {
  const orderedKeys = [
    'nombre_cientifico', 'familia', 'nombre_local', 'localidad', 'municipio', 'estado', 'altitud', 'x', 'coordenadas', 'tipo_vegetacion', 'informacion_ambiental', 'suelo', 'asociada', 'abundancia', 'forma_biologica', 'tamano', 'otros_datos', 'flor', 'fruto', 'usos', 'colector_es', 'no_colecta','fecha', 'determino'
  ];

  //console.log(listaFichas)

  let htmlContent = `
    <html>
      <head>
      </head>
      <body style="margin: 8px; box-sizing: border-box;">
  `;

  listaFichas.forEach(formData => {
    htmlContent += `
      <div style="
      width: 95%;
      height: 30vh;
      margin-bottom:3vh;
      border: 2px solid black;
      padding-right: 15px;
      padding-left: 15px;
  ">
      <!-- Encabezado -->
      <div style="
          margin-top: 5px;
          width: 100%;
          ${imagen ? 'height: 20%;' : 'height: 5%;'}
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
      ">
        <img src=${imagen} style="${imagen ? 'width: 100%; height:100%;' : 'width: 0%; height:0%;'} object-fit: cover;" />
      </div>
      <!-- cuerpo -->
      <div style="display: flex; align-items: center; height: 80%;">
      <div style="
        height: auto;
        display: flex;
        flex-wrap: wrap;
        comlumn-gap: 10px;
        row-gap: 6px;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      ">  
      ${orderedKeys.map(key => {
        const value = formData[key];
        if ((value != '' && value != null)) {
          const upperCaseKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
          if (key === 'tamano') {
            return `<div style="display: flex;"><div style="font-weight: bold;">Tamaño:</div><div style="border-bottom: 1px solid #000; padding-right: 20px; padding-left: 15px"> ${value}</div>m</div>`;
          } else if (key === 'forma_biologica') {
            return `<div style="display: flex;"><div style="font-weight: bold;">Forma biologica:</div><div style="border-bottom: 1px solid #000; padding-right: 20px; padding-left: 15px"> ${value}</div></div>`;
          } else if (key === 'tipo_vegetacion') {
            return `<div style="display: flex;"><div style="font-weight: bold;">Tipo de vegetación:</div><div style="border-bottom: 1px solid #000; padding-right: 20px; padding-left: 15px"> ${value}</div></div>`;
          } else if (key === 'informacion_ambiental') {
            return `<div style="display: flex;"><div style="font-weight: bold;">Información ambiental:</div><div style="border-bottom: 1px solid #000; padding-right: 20px; padding-left: 15px"> ${value}</div></div>`;
          } else if (key === 'otros_datos') {
            return `<div style="display: flex;"><div style="font-weight: bold;">Otros datos:</div><div style="border-bottom: 1px solid #000; padding-right: 20px; padding-left: 15px"> ${value}</div></div>`;
          } else if (key === 'nombre_cientifico') {
            return `<div style="display: flex;"><div style="font-weight: bold;">Nombre cientifico:</div><div style="border-bottom: 1px solid #000; padding-right: 20px; padding-left: 15px"> ${value}</div></div>`;
          } else if (key === 'nombre_local') {
            return `<div style="display: flex;"><div style="font-weight: bold;">Nombre local:</div><div style="border-bottom: 1px solid #000; padding-right: 20px; padding-left: 15px"> ${value}</div></div>`;
          } else if (key === 'altitud') {
            return `<div style="display: flex;"><div style="font-weight: bold;">${upperCaseKey}:</div><div style="border-bottom: 1px solid #000; padding-right: 20px; padding-left: 15px"> ${value} </div>m s.n.m</div>`;
          } else if (key === 'x') {
            if (formData['x'] === '' || formData['x'] === null) {
              return `<div style="display: flex;"><div style="font-weight: bold;">Coordenadas:</div><div style="border-bottom: 1px solid #000; padding-right: 20px; padding-left: 15px"> longitud ${formData.hemisferio_Longitud}: ${formData.grados_Longitud}°${formData.minutos_Longitud}'${formData.segundos_Longitud}''  latitud  ${formData.hemisferio_Latitud}: ${formData.grados_Latitud}°${formData.minutos_Latitud}'${formData.segundos_Latitud}''  </div></div>`
            } else {
              return `<div style="display: flex;"><div style="font-weight: bold;">Coordenadas:</div><div style="border-bottom: 1px solid #000; padding-right: 20px; padding-left: 15px"> x:${formData.x} y:${formData.y}</div></div>`
            }
          } else {
            return `<div style="display: flex;"><div style="font-weight: bold;">${upperCaseKey}:</div><div style="border-bottom: 1px solid #000; padding-right: 20px; padding-left: 15px"> ${value}</div></div>`;
          }
        }
      }).join('')}
      </div>
      </div>
  </div>
    `;
  });

  htmlContent += `
      </body>
    </html>
  `;

  const { data } = await RNPrint.print({
    html: htmlContent,
  });
};

export default imprimir;