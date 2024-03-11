import RNPrint from 'react-native-print';
import imagenLocal from '../../assets/images/logoEquipo.jpg';
// medidas recomendadas para la imagen width: 755px; height: 60px;

const imprimir = async (listaFichas) => {
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
          height: 20%;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
      ">
        <img src="https://i.imgur.com/PG2ahE3.jpeg" style="width: 100%; height: 100%;" />
      </div>
      <!-- cuerpo -->
      <div style="
          height: auto;
          display: flex;
          flex-wrap: wrap;
          column-gap: 10px;
          row-gap: 6px;
          width: 100%;
          justify-content: space-around;
          align-items: space-between;
      ">  
          ${Object.entries(formData)
              .map(([key, value]) => {
                if (value != '' && key != 'id' && key != 'grupo' && key != 'hemisferio_Latitud' && key != 'grados_Latitud' && key != 'minutos_Latitud' && key != 'segundos_Latitud' && key != 'hemisferio_Longitud' && key != 'grados_Longitud' && key != 'minutos_Longitud' && key != 'segundos_Longitud' && key != 'x' && key != 'y'){
                  if (key === 'direccion') {
                    return Object.entries(value)
                      .map(([dirKey, dirValue]) => `<div style="display: flex;"><div style="font-weight: bold;">${dirKey}:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${dirValue}</div></div>`)
                      .join('');
                  } else if (key === 'tamano') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">tamaño:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  } else if (key === 'forma_biologica') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">forma biologica:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  } else if (key === 'tipo_vegetacion') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">tipo de vegetación:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  } else if (key === 'informacion_ambiental') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">información ambiental:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  } else if (key === 'otros_datos') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">otros datos:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  } else if (key === 'nombre_cientifico') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">nombre cientifico:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  } else if (key === 'nombre_local') {
                    return `<div style="display: flex;"><div style="font-weight: bold;">nombre local:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  } else {
                    return `<div style="display: flex;"><div style="font-weight: bold;">${key}:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                  }
                }
                if (key === 'x') {
                  if (value === '' || value === null) {
                    return `<div style="display: flex;"><div style="font-weight: bold;">coordenadas:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> latitud:${formData.grados_Latitud}°${formData.minutos_Latitud}'${formData.segundos_Latitud}'' ${formData.hemisferio_Latitud} longitud:${formData.grados_Longitud}°${formData.minutos_Longitud}'${formData.segundos_Longitud}'' ${formData.hemisferio_Longitud}</div></div>`
                  }else{
                    return `<div style="display: flex;"><div style="font-weight: bold;">coordenadas:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> x:${formData.x} y:${formData.y}</div></div>`
                  }
                }
              })
              .join('')}
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