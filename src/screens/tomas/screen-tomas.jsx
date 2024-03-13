    import { useState, useEffect } from "react";
    import { ScrollView, View } from 'react-native';
    import { SpeedDial} from "@rneui/themed";
    import styles from "../../styles/style-app";
    import { principal, secundario, tercero } from '../../styles/style-colors';
    import Toma from "../../components/Toma";
    import BarraBusqueda from "../../components/BarraBusqueda";
    import {imprimirTomas} from "../../components/imprimir/imprimirSeleccionando"
    import { consultarIdGrupo, verTomas } from "../../services/database/SQLite";

    const Tomas = ({ navigation, route }) => {
        

        //variable que obtine el nombre del canal 
        const nombreCanal = route.params.nombre;

        const [listaTomas, setListaTomas] = useState([]);
        const [listPrint, setListPrint] = useState([]);
        const [open, setOpen] = useState(false);

        const seleccionar = (toma) => {
            setListPrint([...listPrint, toma]);
        }

        const deseleccionar = (toma) => {
            setListPrint(listPrint.filter((item) => item !== toma));
        }

        const updateTomas = (nuevosTomas) => {
            setListaTomas(nuevosTomas);
        };

        const refrescarTomas = () => {
            getTomas();
        }

        //obtener tomas de la base de datos 
        const getTomas = () => {
            consultarIdGrupo(nombreCanal)
                .then((id) => {
                    verTomas(id)
                        .then((tomas) => {
                            setListaTomas(tomas); // Actualiza el estado con las tomas obtenidas
                        })
                        .catch((error) => {
                            console.error("Error obteniendo las tomas: ", error);
                        });
                })
                .catch((error) => console.error("ID error: ", error));
        };

        useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                refrescarTomas();
            });
            return unsubscribe;
        }, [navigation]);

        return (
            <View style={{ flex: 1, backgroundColor: secundario }}>

                <BarraBusqueda titulo={'Buscar en las tomas'} pantalla={'tomas'} onResult={updateTomas} />


                <View style={[styles.container, styles.fondoT]}>

                    <ScrollView>
                        {
                            listaTomas.map((item, index) => {
                                return (
                                    <Toma
                                        key={index}
                                        data={item}
                                        navigation={navigation}
                                        seleccionar={seleccionar}
                                        deseleccionar={deseleccionar} />
                                );
                            })
                        }
                    </ScrollView>
                </View>

                <SpeedDial
                    isOpen={open}
                    icon={{ name: 'add', color: 'white' }}
                    openIcon={{ name: 'close', color: 'white' }}
                    color={principal}
                    onOpen={() => setOpen(!open)}
                    onClose={() => setOpen(!open)}>


                    <SpeedDial.Action
                        icon={{ name: 'add', color: '#fff' }}
                        color={principal}
                        title={'agregar'}
                        onPress={() => {
                            setOpen(!open);
                            navigation.navigate('Formulario', {nombreCanal});
                        }} />

                    <SpeedDial.Action
                        icon={{ name: 'print', color: '#fff' }}
                        color={principal}
                        title={'imprimir'}
                        onPress={() => {
                            console.log(listPrint)
                            setOpen(!open);
                            imprimirTomas(listPrint)
                        }} />

                </SpeedDial>

            </View>
        );
    }


    export default Tomas;