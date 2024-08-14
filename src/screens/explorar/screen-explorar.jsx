import React, { useState, useEffect } from "react";
import { View, Text, Animated, FlatList, StatusBar, ActivityIndicator } from "react-native";
import {  principal, secundario, } from "../../styles/style-colors";
import { selectCsv } from "../../services/functions/import-csv";
import styles from "./style-canales";
import animaciones from '../../components/animaciones/animaciones';
import Grupo from "../../components/Grupo";
import BarraBusqueda from "../../components/BarraBusqueda";
import VentanaFlotante from "../../components/VentanaFlotante";
import Snackbar from 'react-native-snackbar';
import PocketController from "../../services/controllers/pocketController";
import { SpeedDial } from "@rneui/themed";
import { Tab, TabView, Chip } from '@rneui/themed';
import { useSelector } from 'react-redux';
import { Icon } from "react-native-elements";


const Explorar = ({ navigation }) => {
    const {currentTheme, themes} = useSelector((state) => state.theme);
    const [pagina, setPagina] = useState(1);
    const [paginaMisGrupos, setPaginaMisGrupos] = useState(1);
    const [cargando, setCargando] = useState(false);
    const [sinMasGrupos, setSinMasGrupos] = useState(false);
    const [sinMasMisGrupos, setSinMasMisGrupos] = useState(false);


    const theme = themes[currentTheme] || themes.light;
    const {  
        tabItemSelectColor,
        colorPrimario,
        colorSecundario,
        colorTerciario,
        colorCuaternario,
        colorQuinario,
    } = theme;

    // animaciones
    const {
        unoAnim,
        startAnimations,
    } = animaciones();

    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);


    //grupos y mensajes de error
    const [grupos, setGrupos] = useState([]);
    const [misGrupos, setMisGrupos] = useState([]);
    const [nombreGrupo, setNombreGrupo] = useState('');
    const [listaBorrarGrupos, setListaBorrarGrupos] = useState([]);

    //Estado de la funcionalidad importar
    const [isImporting, setIsImporting] = useState(false);

    //manejador de errores
    const [error, setError] = useState('');

    const [openModal, setOpenModal] = useState(false);
    const [showCheckBox, setShowCheckBox] = useState(false); //mostrar casillas de seleccion

    const controller = new PocketController(); //agregar controller

    const ITEMS_POR_PAGINA = 5;

    const cargarGrupos = async (nuevaPagina) => {
        if (sinMasGrupos || cargando) return;
    
        setCargando(true);
    
        try {
            const nuevosGrupos = await controller.obtenerGruposDeOtros(nuevaPagina, ITEMS_POR_PAGINA);
            if (pagina >= nuevosGrupos.totalPages) {
                setSinMasGrupos(true);
            }
            setGrupos((prevGrupos) => [...prevGrupos, ...nuevosGrupos.items]);
        } catch (error) {
            lanzarAlerta("Error al obtener la lista de grupos");
        } finally {
            setCargando(false);
        }
    };

    const cargarMisGrupos = async (nuevaPagina) => {
        if (sinMasMisGrupos || cargando) return;
    
        setCargando(true);
    
        try {
            const nuevosGrupos = await controller.obtenerMisGrupos(nuevaPagina, ITEMS_POR_PAGINA);
            if (paginaMisGrupos >= nuevosGrupos.totalPages) {
                setSinMasMisGrupos(true);
            }
            setMisGrupos((prevGrupos) => [...prevGrupos, ...nuevosGrupos.items]);
        } catch (error) {
            lanzarAlerta("Error al obtener la lista de grupos");
        } finally {
            setCargando(false);
        }
    };

    const handleLoadMore = () => {
        if (!sinMasGrupos && !cargando) {
            const nuevaPagina = pagina + 1;
            setPagina(nuevaPagina);
            cargarGrupos(nuevaPagina);
        }
    };

    const handleLoadMoreMisGrupos = () => {
        if (!sinMasMisGrupos && !cargando) {
            const nuevaPagina = paginaMisGrupos + 1;
            setPaginaMisGrupos(nuevaPagina);
            cargarMisGrupos(nuevaPagina);
        }
    };

    function handleTextChange(text) {
        setNombreGrupo(text);
        setError(''); // Limpiar el mensaje de error cuando se ingresa texto
    };

    function lanzarAlerta(mensaje) {
        setTimeout(() => {
            Snackbar.show({
                text: mensaje,
                duration: Snackbar.LENGTH_SHORT
            });
        }, 200);
    }

    const handleCloseModal = () => {
        if (isImporting && nombreGrupo === '') {
            lanzarAlerta('La operación de importación se ha cancelado porque no se ingresó un nombre de grupo');
            setOpenModal(false);
            setIsImporting(false);
        } else {
            setOpenModal(false);
            setError('');
            setIsImporting(false);
        }
    }

    const handleGrupoEliminado = (grupoId) => {
        setMisGrupos(prevGrupos => prevGrupos.filter(grupo => grupo.id !== grupoId));
        console.log(grupoId + " eliminado exitosamente");
    };
     
    useEffect(() => {
        const fetchData = async () => {
            try {
                startAnimations();
                await cargarGrupos();
                await cargarMisGrupos();
                setListaBorrarGrupos([]);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };
    
        fetchData();
    }, []);


    const containerStyle = { borderRadius: 30, marginHorizontal: 10,}; // Estilo del título de la pestaña
    
    return (
        <View style={[styles.mainContainer, { backgroundColor: colorPrimario, }]}>
            <StatusBar
                barStyle={currentTheme === 'light' ? 'dark-content' : 'light-content'}
                animated={true}
                backgroundColor={colorPrimario}
            />
            <Animated.View style={{ opacity: unoAnim, paddingHorizontal: 10, marginVertical:10}}>
                <View style={{width:'100%', height:50, flexDirection:"row"}}>
                    <View style={{width:'10%', justifyContent:"center"}}>
                        <Icon
                            name='menu'
                            type='material'
                            color={colorQuinario}
                            size={30}
                            onPress={() => navigation.openDrawer()}
                        />
                    </View>
                    {/*
                    <BarraBusqueda titulo={'Buscar grupo'} pantalla={'grupos'} />
                    */}
                </View>
            </Animated.View>
            
            <View style={[styles.secondaryContainer, { backgroundColor: colorSecundario, }]}>  
                
                <View style={styles.titleContainer}>
                <Text style={{fontSize: 30, fontWeight:'bold', color: colorQuinario}}>Grupos publicos</Text>
                </View>

                <Tab
                    value={index}
                    onChange={(e) => setIndex(e)}
                    disableIndicator={true}
                    style={{marginTop: 5, marginHorizontal: 10}}
                    >
                    <Tab.Item
                        title="Explorar"
                        titleStyle={{fontSize: 20, fontWeight: index === 0 ? 'bold' : 'normal', color: index === 0 ? "white" : colorQuinario,}}
                        containerStyle={[containerStyle,{backgroundColor: index === 0 ? colorTerciario : colorSecundario,}]}
                    />       
                    <Tab.Item
                        title="Mis grupos"
                        titleStyle={{fontSize: 20, fontWeight: index === 1 ? 'bold' : 'normal', color: index === 1 ? "white": colorQuinario}}
                        containerStyle={[containerStyle,{backgroundColor: index === 1 ? colorTerciario : colorSecundario,}]}
                    />
                </Tab>

                <TabView value={index} onChange={setIndex}>
                    <TabView.Item style={[styles.TabViewcontainer]}>
                        <FlatList
                            data={grupos}
                            numColumns={1}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <Grupo
                                    key={(item) => item.id.toString()}
                                    animacion={unoAnim}
                                    navigation={navigation}
                                    nombre={item.nombre}
                                    explorar={true}
                                    item={item}
                                />
                            )}
                            onEndReached={() => {handleLoadMore()}}
                            onEndReachedThreshold={0.7}
                            ListFooterComponent={cargando && <ActivityIndicator size="large" color="#0000ff" />}
                        />
                    </TabView.Item>
                    <TabView.Item style={[styles.TabViewcontainer]}>
                        <FlatList
                            data={misGrupos}
                            numColumns={1}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <Grupo
                                    key={(item) => item.id.toString()}
                                    animacion={unoAnim}
                                    navigation={navigation}
                                    nombre={item.nombre}
                                    explorar={true}
                                    misGrupos={true}
                                    item={item}
                                    onEliminarGrupo={handleGrupoEliminado}
                                />
                            )}
                            onEndReached={() => {handleLoadMoreMisGrupos()}}
                            onEndReachedThreshold={0.7}
                            ListFooterComponent={cargando && <ActivityIndicator size="large" color="#0000ff" />}
                        />
                    </TabView.Item>
                </TabView>
            </View>        
        </View>
    );
}

export default Explorar;