import { principal} from "../../styles/style-colors";
import { StyleSheet } from "react-native";

const style_toma = StyleSheet.create({
    view_toma: {
        flexDirection: 'row',
        margin: 5,
        backgroundColor: principal,
        borderRadius: 16,
    },

    text_card: {
        fontSize: 13,
        color: 'white'
    },
});

export default style_toma;
