import { useState } from "react";
import { ScrollView, TextInput, View } from 'react-native';
import styles from "../../styles/style-app";
import { secundario } from '../../styles/style-colors';
import Toma from "../../components/Toma";
import imprimir from "../../components/imprimir/imprimir";
import BotonFlotante from "../../components/BotonFlotante";
import BarraBusqueda from "../../components/BarraBusqueda";





const toma = {
    nombreCientifico: "",
    Familia: "America",
    nombreLocal: "Bugambilia",
    direccion: {
        localidad: "CU BUAP",
        municipio: "Puebla",
        estado: "Puebla"
    },
    coordenadas: "-98.20, 19.002'N",
    tipoVegetacion: "Bosque urbano"
}


const Tomas = ({ navigation }) => {


    const [listaTomas, setListaTomas] = useState([toma]);
    const [listPrint, setListPrint] = useState([]);
    const [open, setOpen] = useState(false);


    //Funciones que definen el comportamiento de las tomas 
    const seleccionar = (item) => {
        setListPrint([...listPrint, item]);
    }

    const agregar = (item) => {
        setListaTomas([...listaTomas, item]);
    }

    //Funciones para el componente BotonFlotante
    const [actions, setActions] = useState([{
        icon: 'add',
        title: 'agregar',
        action: () => navigation.navigate('Formulario')
    },
    {
        icon: 'print',
        title: 'imprimir',
        action: () => {
            setOpen(!open);
            imprimir(listPrint);
        }
    },
    {
        icon: 'list',
        title: 'listar',
        action: () => console.log(listPrint)
    }]);


    return (
        <View style={{ flex: 1, backgroundColor: secundario }}>

            <BarraBusqueda titulo={'Date'} />

            <View style={[styles.container, styles.fondoT]}>
                <ScrollView>
                    {
                        listaTomas.map((item, index) => {
                            return (
                                <Toma key={index} item={item} navigation={navigation} seleccionar={seleccionar} />
                            );
                        })
                    }
                </ScrollView>
            </View>

            <BotonFlotante actions={actions} />       
            
        </View>
    );
}


export default Tomas;