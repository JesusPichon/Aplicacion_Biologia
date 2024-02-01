import { Component } from "react";
import { Button, ScrollView, View } from "react-native";
import Toma from "../../components/toma/Toma";
import style_screenTomas from "./style-tomas";
import styles from "../../styles/style-app";
import { SearchBar } from '@rneui/themed';
import { secundario } from "../../styles/style-colors";

class Tomas extends Component {

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: secundario
            }}>
                <SearchBar
                    placeholder="filtrar en el canal ..."
                    containerStyle={style_screenTomas.searchBar_container}
                    inputContainerStyle={{backgroundColor: 'white'}}
                    inputStyle={{backgroundColor: 'white'}}
                    >
                </SearchBar>

                <View style={[styles.container, styles.fondoT]}>
                    <ScrollView>
                        <Toma navigation={this.props.navigation}></Toma>
                        <Toma navigation={this.props.navigation}></Toma>
                        <Toma navigation={this.props.navigation}></Toma>
                        <View style={style_screenTomas.view_buttons}>
                            <Button
                                title="nuevo"
                                style={style_screenTomas.button}
                                onPress={() => {
                                    this.props.navigation.navigate('Formulario');
                                }}></Button>
                        </View>
                    </ScrollView>
                </View>

            </View>
        );
    }
}

export default Tomas;