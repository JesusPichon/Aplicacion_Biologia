import { Component } from "react";
import { Button, StyleSheet, View } from "react-native";
import Toma from "../../components/toma/Toma";


const style = StyleSheet.create({

    view_main: {
        margin: "2.5%"
    },

    view_buttons: {
        width: "50%",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "2%"
    },

    button: {
        width: "30%",
    }

});


class Tomas extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={style.view_main}>
                <Toma navigation={this.props.navigation}></Toma>
                <Toma navigation={this.props.navigation}></Toma>
                <Toma navigation={this.props.navigation}></Toma>
                <View style={style.view_buttons}>
                    <Button
                        title="canales"
                        style={style.button}
                        onPress={() => {
                            this.props.navigation.navigate('Canales');
                        }}></Button>
                    <Button
                        title="nuevo"
                        style={style.button}
                        onPress={() => {
                            this.props.navigation.navigate('Formulario');
                        }}></Button>
                </View>
            </View>
        );
    }
}

export default Tomas;