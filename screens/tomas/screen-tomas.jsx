import { Component } from "react";
import { Button,View } from "react-native";
import Toma from "../../components/toma/Toma";
import styleToma from "./style-tomas";

class Tomas extends Component {

    render() {
        return (
            <View style={styleToma.view_main}>
                <Toma navigation={this.props.navigation}></Toma>
                <Toma navigation={this.props.navigation}></Toma>
                <Toma navigation={this.props.navigation}></Toma>
                <View style={styleToma.view_buttons}>
                    <Button
                        title="nuevo"
                        style={styleToma.button}
                        onPress={() => {
                            this.props.navigation.navigate('Formulario');
                        }}></Button>
                </View>
            </View>
        );
    }
}

export default Tomas;