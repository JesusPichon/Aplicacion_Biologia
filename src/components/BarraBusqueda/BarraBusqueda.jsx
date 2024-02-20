import { SearchBar } from "@rneui/themed";
import { secundario } from "../../styles/style-colors";

const BarraBusqueda = ({ titulo }) => {

    return (
        <SearchBar
            placeholder={titulo}
            containerStyle={{ backgroundColor: secundario, borderColor: secundario }}
            inputContainerStyle={{ backgroundColor: 'white', borderRadius: 20 }}
            inputStyle={{ backgroundColor: 'white' }} />
    );
}

export default BarraBusqueda;