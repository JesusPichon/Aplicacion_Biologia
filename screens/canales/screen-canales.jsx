import { Component } from "react";
import { View } from "react-native";
import Canal from "../../components/canal";


class Canales extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View>
                <Canal navigation={this.props.navigation}></Canal>
            </View>
        );
    }

}

export default Canales;