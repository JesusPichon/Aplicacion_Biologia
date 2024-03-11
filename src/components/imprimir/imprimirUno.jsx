import RNPrint from 'react-native-print';

const imprimir = async (listaFichas) => {
  let htmlContent = `
    <html>
      <head>
      </head>
      <body style="margin: 8px; box-sizing: border-box;">
  `;


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
            ${Object.entries(listaFichas)
                .map(([key, value]) => {
                  if (value != ''){
                    if (key === 'direccion') {
                      return Object.entries(value)
                        .map(([dirKey, dirValue]) => `<div style="display: flex;"><div style="font-weight: bold;">${dirKey}:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${dirValue}</div></div>`)
                        .join('');
                    } else {
                      return `<div style="display: flex;"><div style="font-weight: bold;">${key}:</div><div style="border-bottom: 1px solid #000; min-width: 100px;"> ${value}</div></div>`;
                    }
                  }
                })
                .join('')}
        </div>
    </div>
  `;

  htmlContent += `
      </body>
    </html>
  `;

  const { data } = await RNPrint.print({
    html: htmlContent,
  });
};

export default imprimir;
