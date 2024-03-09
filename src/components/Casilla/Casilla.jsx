import { CheckBox } from "@rneui/themed";

function Casilla({checked, toggleCheckbox, color}) {

    return (
        <CheckBox
            checked={checked}
            onPress={toggleCheckbox}
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor={color}>
        </CheckBox>
    );
}

export default Casilla;