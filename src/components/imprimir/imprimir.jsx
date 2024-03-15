import RNPrint from 'react-native-print';
import imagenLocal from '../../assets/images/logoEquipo.jpg';
// medidas recomendadas para la imagen width: 755px; height: 60px;

const imprimir = async (listaFichas, imagen) => {
  console.log(listaFichas)

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
          ${Object.entries(formData)
              .map(([key, value]) => {
                if (value != '' && key != 'id' && key != 'grupo' && key != 'hemisferio_Latitud' && key != 'grados_Latitud' && key != 'minutos_Latitud' && key != 'segundos_Latitud' && key != 'hemisferio_Longitud' && key != 'grados_Longitud' && key != 'minutos_Longitud' && key != 'segundos_Longitud' && key != 'x' && key != 'y'){
                  const upperCaseKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();;
                  if (key === 'tamano' || key === 'Tamano') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">Tamaño:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value} m</div></div>`;
                  } else if (key === 'forma_biologica' || key === 'Forma_biologica') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">Forma biologica:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  } else if (key === 'tipo_vegetacion' || key === 'Tipo_vegetacion') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">Tipo de vegetación:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  } else if (key === 'informacion_ambiental' || key === 'Informacion_ambiental') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">Información ambiental:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  } else if (key === 'otros_datos' || key === 'Otros_datos') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">Otros datos:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  } else if (key === 'nombre_cientifico' || key === 'Nombre_cientifico') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">Nombre cientifico:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  } else if (key === 'nombre_local' || key === 'Nombre_local') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">Nombre local:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  } else if (key === 'altitud' || key === 'Altitud') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">${upperCaseKey}:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value} m s.n.m</div></div>`;
                  } else {
                    return `<div style="display: flex;"><div style="font-weight: bold;">${upperCaseKey}:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  }
                }
                if (key === 'x') {
                  if (value === '' || value === null) {
                    return `<div style="display: flex;"><div style="font-weight: bold;">Coordenadas:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> latitud:${formData.grados_Latitud}°${formData.minutos_Latitud}'${formData.segundos_Latitud}'' ${formData.hemisferio_Latitud} longitud:${formData.grados_Longitud}°${formData.minutos_Longitud}'${formData.segundos_Longitud}'' ${formData.hemisferio_Longitud}</div></div>`
                  }else{
                    return `<div style="display: flex;"><div style="font-weight: bold;">Coordenadas:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> x:${formData.x} y:${formData.y}</div></div>`
                  }
                }
              })
              .join('')}
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