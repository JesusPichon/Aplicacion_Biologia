import { SpeedDial } from "@rneui/themed";
import { principal } from "../../styles/style-colors";

function BotonAcciones({ isOpen, icon, openIcon, onOpen, onClose, acciones }) {

    return (
        <SpeedDial
            isOpen={isOpen}
            icon={icon}
            openIcon={openIcon}
            onOpen={onOpen}
            color={principal}
            onClose={onClose}>

            {acciones.map((accion, index) => {
                return (
                    <SpeedDial.Action
                        key={index}
                        title={accion.title}
                        icon={accion.icon}
                        color={principal}
                        onPress={accion.func} />
                )
            })}

        </SpeedDial>
    );

}

export default BotonAcciones;