import RNPrint from 'react-native-print';

const imprimir = async (listaFichas) => {
  let htmlContent = `
    <html>
      <head>
      </head>
      <body style="margin: 8px; box-sizing: border-box;">
  `;

  listaFichas.forEach(formData => {
    htmlContent += `
      <div style="
          width: 100%;
          height: 30vh;
          margin-bottom:3vh;
          border: 2px solid black;
      ">
          <!-- Encabezado -->
          <div style="
              margin-top: 10px;
              width: 100%;
              height: 20%;
              display: flex;
              flex-direction: row;
              justify-content: space-evenly;
          ">
              <div style="
                  text-align: center;
                  font-weight: bold;
                  font-size: 20px;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-evenly;
                  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              ">
                  <div>Benemérita Universidad Autónoma de Puebla</div>
                  <div>Facultad de Ciencias Biológas</div>
              </div>
          </div>
          <!-- cuerpo -->
          <div style="
              height: 'auto';
              display: flex;
              flex-wrap: wrap;
              margin: 15px;
              column-gap: 15px;
              row-gap: 10px;
          ">  
              ${Object.entries(formData)
                  .map(([key, value]) => {
                    if (key === 'direccion') {
                      return Object.entries(value)
                        .map(([dirKey, dirValue]) => `<div style="display: flex;"><div style="font-weight: bold;">${dirKey}:</div><div> ${dirValue}</div></div>`)
                        .join('');
                    } else {
                      return `<div style="display: flex;"><div style="font-weight: bold;">${key}:</div><div> ${value}</div></div>`;
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
