import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import PocketBase from 'pocketbase';
import styles from './style-ajustes';
import pb from '../../services/PocketBase/pocketbase';

const AuthForm = ({ navigation }) => {
  const { currentTheme, themes } = useSelector((state) => state.theme);

  const theme = themes[currentTheme] || themes.light;
  const {
    colorPrimario,
    colorSecundario,
    colorTerciario,
    colorCuaternario,
    colorQuinario,
  } = theme;

  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = async (data) => {
    if (isLogin) {
      await handleLogin(data);
    } else {
      await handleRegister(data);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);

      console.log(pb.authStore.isValid);
      console.log(pb.authStore.token);
      console.log(pb.authStore.model.id);

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Error al iniciar sesión. Verifique sus credenciales.');
      Alert.alert('Error', 'Error al iniciar sesión. Verifique sus credenciales.');
    }
  };

  const handleRegister = async ({ email, password, passwordConfirm }) => {
    if (password !== passwordConfirm) {
      setErrorMessage('Las contraseñas no coinciden.');
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const newUser = await pb.collection('users').create({
        email,
        password,
        passwordConfirm,
      });

      Alert.alert('Éxito', 'Registro exitoso. Ahora puede iniciar sesión.');
      setIsLogin(true);
      reset();
    } catch (error) {
      console.error('Error registering:', error);
      setErrorMessage('Error al registrar. Verifique sus datos.');
      Alert.alert('Error', `Error al registrar. Verifique sus datos.\n${error.message}`);
    }
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: colorPrimario }]}>
      <View style={{ width: '10%', justifyContent: 'center' }}>
        <Icon
          name="menu"
          type="material"
          color={colorQuinario}
          size={30}
          onPress={() => navigation.openDrawer()}
          containerStyle={{ marginVertical: 20, paddingLeft: 15 }}
        />
      </View>
      <View style={[styles.secondaryContainer, { backgroundColor: colorSecundario }]}>
        <View style={styles.titleContainer}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: colorQuinario }}>
            {isLogin ? 'Login' : 'Registro'}
          </Text>
        </View>
        <View>
          <Text style={{ color: colorQuinario }}>Usuario</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.textInput, { backgroundColor: colorPrimario, borderColor: colorTerciario, color: colorQuinario }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Text style={{ color: colorQuinario }}>Contraseña</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.textInput, { backgroundColor: colorPrimario, borderColor: colorTerciario, color: colorQuinario }]}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {!isLogin && (
            <>
              <Text style={{ color: colorQuinario }}>Confirmar Contraseña</Text>
              <Controller
                control={control}
                name="passwordConfirm"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.textInput, { backgroundColor: colorPrimario, borderColor: colorTerciario, color: colorQuinario }]}
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </>
          )}
          {errorMessage ? (
            <Text style={{ color: 'red', marginVertical: 10 }}>{errorMessage}</Text>
          ) : null}
          <Button
            title={isLogin ? 'Ingresar' : 'Registrarse'}
            buttonStyle={{ backgroundColor: colorTerciario }}
            titleStyle={{ color: colorQuinario }}
            containerStyle={{ marginVertical: 10 }}
            onPress={handleSubmit(onSubmit)}
          />
          <Button
            title={isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Ingresa'}
            buttonStyle={{ backgroundColor: colorCuaternario }}
            titleStyle={{ color: colorQuinario }}
            containerStyle={{ marginVertical: 10 }}
            onPress={() => {
              setIsLogin(!isLogin);
              setErrorMessage('');
              reset();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default AuthForm;
