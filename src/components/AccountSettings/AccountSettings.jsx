import React from 'react';
import { View, Text, TextInput,TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import { Controller } from "react-hook-form";
import styles from '../../screens/ajustes/style-ajustes';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AccountSettings = ({ control, handleSubmit, onSubmit, errors, isAuthenticated, passwordValue, theme, }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.itemContainer}>
              <Text style={{color: theme.colorQuinario, fontSize: 20}}>Cuenta</Text>
              {isAuthenticated ? (
                <View style={{padding: 15}}>
                  <Text style= {{fontWeight: 'bold', color: theme.colorQuinario, }}>Nombre de Usuario</Text>
                  <Controller
                    control={control}
                    name="username"
                    rules={{ required: 'Nombre de usuario o Email obligatorio', }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                      style={[styles.input, {backgroundColor: theme.colorPrimario, borderColor: 'grey', color: 'grey', }]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        editable={false}
                      />
                    )}
                  />
                  {errors.username && (
                    <Text style={{color: 'red'}}>
                      {errors.username.message}
                    </Text>
                  )}

                  <Text style= {{fontWeight: 'bold', color: theme.colorQuinario,}}>Correo Electrónico</Text>
                  <Controller
                    control={control}
                    name="email"
                    rules={{
                      // required: 'El correo electrónico es obligatorio',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Correo electrónico no válido',
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={[styles.input, {backgroundColor: theme.colorPrimario, borderColor: 'grey', color: 'grey', }]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        editable={false}
                      />
                    )}
                  />
                  {errors.email && (
                    <Text style={{color: 'red'}}>{errors.email.message}</Text>
                  )}

                  <Text style= {{fontWeight: 'bold', color: theme.colorQuinario,}}>
                    Contraseña (dejar en blanco si no deseas cambiarla)
                  </Text>
                  <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={[styles.input, {backgroundColor: theme.colorPrimario, borderColor: theme.colorTerciario, color: theme.colorTexto, }]}
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
                            style={[styles.input, {backgroundColor: theme.colorPrimario, borderColor: theme.colorTerciario, color: theme.colorTexto, }]}
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
                    buttonStyle={{ backgroundColor: theme.colorTerciario, height: 40, width: 200, borderRadius: 20, }}
                    titleStyle={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
                  />
                  
                </View>
              ) : (
                <View style={{alignItems: 'center', marginBottom: 10}}>
                  <Text>No has iniciado Sesión</Text>
                  <TouchableOpacity
                    style={[styles.button, {backgroundColor: theme.colorTerciario}]}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Iniciar Sesión
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
  );
};

export default AccountSettings;
