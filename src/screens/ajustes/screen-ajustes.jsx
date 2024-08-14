import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Button} from '@rneui/themed';
import styles from './style-ajustes';
import {Icon, ButtonGroup} from 'react-native-elements';
import {setModeTheme} from '../../services/redux/slices/themeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUser } from '../../services/auth/AuthFunctions';
import pb from '../../services/PocketBase/pocketbase';

const Ajustes = ({navigation}) => {
  const {currentTheme, themes, modeTheme} = useSelector(state => state.theme);
  const dispatch = useDispatch();

  const {isAuthenticated, loading, error, token, user} = useSelector(
    state => state.auth,
  );

  const theme = themes[currentTheme] || themes.light;
  const { colorPrimario, colorSecundario, colorTerciario, colorCuaternario, colorQuinario, colorTexto } = theme;

  const themeOptions = ['light', 'dark', 'system'];
  const [selectedIndex, setSelectedIndex] = useState(
    themeOptions.indexOf(currentTheme),
  );

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        dispatch(setModeTheme(storedTheme));
        setSelectedIndex(themeOptions.indexOf(storedTheme));
      }
    };

    loadTheme();
  }, [dispatch]);

  const handleThemeChange = async value => {
    const selectedTheme = themeOptions[value];
    await AsyncStorage.setItem('theme', selectedTheme);
    dispatch(setModeTheme(selectedTheme));
    setSelectedIndex(value);
  };

  const { control, handleSubmit, watch, reset, formState: {errors}, } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const passwordValue = watch('password'); // Observa el valor del campo de contraseña

  const onSubmit = () => {
    console.log("Boton presionado...")
  } 

  useEffect(() => {
    // Si el usuario está autenticado, carga los valores actuales en el formulario
    if (pb.authStore.model) {
      reset({
        username: pb.authStore.model.username || '',
        email: pb.authStore.model.email || '',
      });
    }
  }, [reset, isAuthenticated]);

  return (
    <View style={[styles.mainContainer, {backgroundColor: colorPrimario}]}>
      <View style={{width: '10%', justifyContent: 'center'}}>
        <Icon
          name="menu"
          type="material"
          color={colorQuinario}
          size={30}
          onPress={() => navigation.openDrawer()}
          containerStyle={{marginVertical: 20, paddingLeft: 15}}
        />
      </View>

      <View style={[styles.secondaryContainer, {backgroundColor: colorSecundario}]}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 90}>
          <ScrollView>
            <View style={styles.titleContainer}>
              <Text style={[styles.titleText, { color: colorQuinario, }]}>
                Ajustes
              </Text>
            </View>

            <View style={styles.itemContainer}>
              <Text style={{color: colorQuinario, fontSize: 20}}>
                Tema de la Aplicación
              </Text>
              <ButtonGroup
                buttons={['Claro', 'Oscuro', 'Tema del Sistema']}
                selectedIndex={selectedIndex}
                onPress={handleThemeChange}
                containerStyle={styles.ButtonGroupContainer}
                textStyle={styles.ButtonGroupText}
              />
            </View>

            <View style={styles.itemContainer}>
              <Text style={{color: colorQuinario, fontSize: 20}}>Cuenta</Text>
              {isAuthenticated ? (
                <View style={{padding: 15}}>
                  <Text style= {{fontWeight: 'bold'}}>Nombre de Usuario</Text>
                  <Controller
                    control={control}
                    name="username"
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={[styles.input, {backgroundColor: colorPrimario, borderColor: colorTerciario, color: colorTexto, }]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.username && (
                    <Text style={{color: 'red'}}>
                      {errors.username.message}
                    </Text>
                  )}

                  <Text style= {{fontWeight: 'bold'}}>Correo Electrónico</Text>
                  <Controller
                    control={control}
                    name="email"
                    rules={{
                      // required: 'El correo electrónico es obligatorio',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Correo electrónico no válido',
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={[styles.input, {backgroundColor: colorPrimario, borderColor: colorTerciario, color: colorTexto, }]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.email && (
                    <Text style={{color: 'red'}}>{errors.email.message}</Text>
                  )}

                  <Text style= {{fontWeight: 'bold'}}>
                    Contraseña (dejar en blanco si no deseas cambiarla)
                  </Text>
                  <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={[styles.input, {backgroundColor: colorPrimario, borderColor: colorTerciario, color: colorTexto, }]}
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Nueva contraseña"
                      />
                    )}
                  />

                  {passwordValue && passwordValue.length > 0 && (
                    <View style={styles.fieldContainer}>
                      <Text style= {{fontWeight: 'bold'}}>Confirmar Contraseña</Text>
                      <Controller
                        control={control}
                        name="passwordConfirm"
                        rules={{
                          validate: value =>
                            value === passwordValue ||
                            'Las contraseñas no coinciden',
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                          <TextInput
                            style={[styles.input, {backgroundColor: colorPrimario, borderColor: colorTerciario, color: colorTexto, }]}
                            placeholder="Confirmar Contraseña"
                            secureTextEntry
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                      />
                      {errors.passwordConfirm && (
                        <Text style={styles.errorText}>
                          {errors.passwordConfirm.message}
                        </Text>
                      )}
                    </View>
                  )}
                  <Button
                    type="solid"
                    onPress={handleSubmit(onSubmit)}
                    title="Guardar Cambios"
                    containerStyle={{alignSelf: 'center' }}
                    buttonStyle={{ backgroundColor: colorTerciario, height: 40, width: 200, borderRadius: 20, }}
                    titleStyle={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
                  />
                  
                </View>
              ) : (
                <View style={{alignItems: 'center', marginBottom: 10}}>
                  <Text>No has iniciado Sesión</Text>
                  <TouchableOpacity
                    style={[styles.button, {backgroundColor: colorTerciario}]}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Iniciar Sesión
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Ajustes;
