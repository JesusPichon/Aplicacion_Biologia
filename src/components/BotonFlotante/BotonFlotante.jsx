import { SpeedDial } from "@rneui/themed";
import { useState } from "react";
import { principal } from "../../styles/style-colors";

const BotonFlotante = ({ actions }) => {

    const [open, setOpen] = useState(false);

    return (
        <SpeedDial
            isOpen={open}
            icon={{ name: 'add', color: 'white' }}
            openIcon={{ name: 'close', color: 'white' }}
            color={principal}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}>

            {actions.map((element, index) => {
                return (
                    <SpeedDial.Action
                        key={index}
                        icon={{ name: element.icon, color: '#fff' }}
                        color={principal}
                        title= {element.title}
                        onPress={element.action} />
                );
            })}

        </SpeedDial>
    );
}


export default BotonFlotante;