import { SpeedDial } from "react-native-elements";

function BotonAcciones({ acciones }) {

    return (
        <SpeedDial>
            {acciones.map((accion) => {
                return (
                    <SpeedDial.Action />
                )
            })}
        </SpeedDial>
    );

}

export default BotonAcciones;