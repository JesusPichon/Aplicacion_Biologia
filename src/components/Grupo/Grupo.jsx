import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import styles from "../../styles/style-app";
import stylesCanales from "../../screens/grupos/style-canales";
import { useEffect, useState } from "react";
import { principal } from "../../styles/style-colors";
import { CheckBox, Chip } from "@rneui/themed";



const Grupo = ({ navigation, nombre, deseleccionar, seleccionar, mostrarSeleccionar, exportando, seleccionarGrupoExportar }) => {

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(false);
    },[mostrarSeleccionar]);

    const handleSeleccionarGrupo = () => {
        if (mostrarSeleccionar == true && !exportando) {
            if (checked) {
                deseleccionar(nombre);
            } else {
                seleccionar(nombre);
            }
            setChecked(!checked);
        } else if (exportando) {
            seleccionarGrupoExportar(nombre);
            setChecked(false); // Ocultar las casillas de selección
        }

        if (!mostrarSeleccionar)
            navigation.navigate('Tomas', { nombre });
    };

    return (
      <TouchableOpacity
        style={[
          stylesCanales.cardVertical,
          {marginBottom: 10, margin: 10, flexDirection: 'column', height: 200},
        ]}
        onPress={handleSeleccionarGrupo}>
        <ImageBackground
          source={require('../../assets/images/nature.jpg')}
          resizeMode="cover"
          style={stylesCanales.image}></ImageBackground>

        <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>
          <View style={stylesCanales.nombreView}>
            <Text
              style={[styles.textT, {textAlign: 'left', fontWeight: 'bold'}]}>
              {nombre}
            </Text>
            {/* <TouchableOpacity>
                        chi
                        <Text style={{color: principal}}>Ver más</Text>
                    </TouchableOpacity> */}
            <Chip
              icon={{
                name: "file-upload",
                type: 'material',
                size: 25,
                color: 'white',
              }}
              onPress={() => console.log('Icon chip was pressed!')}
              buttonStyle={{backgroundColor: principal}}
            />
          </View>
          <View style={stylesCanales.otroView}>
            <Text style={{color: 'black'}}>Tomas: 300</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
}


export default Grupo;