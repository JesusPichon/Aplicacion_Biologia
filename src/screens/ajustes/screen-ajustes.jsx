import React, {useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { Button} from '@rneui/themed';
import styles from './style-ajustes';
import {Icon} from 'react-native-elements';
import {setModeTheme} from '../../services/redux/slices/themeSlice';
import { setUser } from '../../services/redux/slices/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, updateUser } from '../../services/auth/AuthFunctions';
import Snackbar from 'react-native-snackbar';
import pb from '../../services/PocketBase/pocketbase';

import ThemeSelector from '../../components/themeSelector';
import AccountSettings from '../../components/AccountSettings';
import ConfirmationModal from '../../components/ConfirmationModal';

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

  const { control, handleSubmit, watch, reset, setValue, formState: {errors}, } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      oldPassword: '',
    },
  });

  const passwordValue = watch('password'); // Observa el valor del campo de contraseña
  const oldPasswordValue = watch('oldPassword');
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingData, setPendingData] = useState(null); // Guardar datos pendientes para el modal

  const onSubmit = (data) => {
    const isPasswordChanging = data.password.length > 0;

    if (isPasswordChanging) {
      setPendingData(data);
      setModalVisible(true); // Mostrar el modal para confirmar la contraseña antigua
    } else {
      updateValidation(data); // Si no se cambia la contraseña, proceder directamente
    }
  };

  const submitConfirmation = async () => {
    if (pendingData) {
      await updateValidation(pendingData);
      setModalVisible(false);
    }
  };

  const submitCancelation = () => {
    setModalVisible(false);
    reset();
  };

  const updateValidation = async (data) => {
    try {
      const updateData = {};

      // Comparar el nombre de usuario
      if (data.username && data.username !== pb.authStore.model.username) {
        updateData.username = data.username;
      }

      // Actualizar la contraseña solo si el usuario ingresó una nueva
      if (data.password && data.password.length > 0) {
        updateData.oldPassword = oldPasswordValue;
        updateData.password = data.password;
        updateData.passwordConfirm = data.passwordConfirm;
      }

      console.log(updateData);
      // Solo realizar la actualización si hay cambios
      if (Object.keys(updateData).length > 0) {
        console.log("ID:", pb.authStore.model.id);
        const updatedUser = await updateUser(pb.authStore.model.id, updateData);

        setTimeout(() => {
            Snackbar.show({
              text: 'Éxito, Tus datos han sido actualizados',
                duration: Snackbar.LENGTH_LONG,
            });
        }, 500);

        // Si se cambió la contraseña, reautenticar al usuario
        if (updateData.password) {
          await pb.authStore.clear(); // Limpiar el authStore

          dispatch(loginUser( data.username || pb.authStore.model.username, updateData.password))
        }else{
          dispatch(setUser({user: updateData.username}));
        }
        reset();
      } else {
        Snackbar.show({
          text: 'Sin cambios, No se realizaron cambios en los datos.',
            duration: Snackbar.LENGTH_LONG,
        });
      }
    } catch (error) {
      //console.error('Error al actualizar los datos:', error);
      setTimeout(() => {
        Snackbar.show({
          text: 'Error, Hubo un problema al actualizar tus datos',
            duration: Snackbar.LENGTH_LONG,
        });
    }, 500);
    }
  };

  useEffect(() => {
    // Si el usuario está autenticado, carga los valores actuales en el formulario
    if (isAuthenticated) {
      reset({
        username: user || '',
        email: pb.authStore.model.email || '',
        password: '',
        oldPassword: '',
        passwordConfirm: '',
      });
    }
  }, [reset, user]);

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

            <ThemeSelector
              selectedIndex={selectedIndex}
              handleThemeChange={handleThemeChange}
              theme={theme}
            />

            <AccountSettings
              control={control}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              isAuthenticated={isAuthenticated}
              passwordValue={passwordValue}
              theme={theme}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <ConfirmationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          control={control}
          submitConfirmation={submitConfirmation}
          submitCancelation={submitCancelation}
          errors={errors}
          theme={theme}
        />
      </View>
    </View>
  );
};

export default Ajustes;
