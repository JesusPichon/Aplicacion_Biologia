import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import { Controller } from 'react-hook-form';
import styles from '../../screens/ajustes/style-ajustes';

const ConfirmationModal = ({ modalVisible, setModalVisible, control, submitConfirmation, submitCancelation, errors, theme }) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(true)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Confirmar Cambio de Contraseña</Text>
          <Text>Para confirmar el cambio de contraseña, por favor ingresa tu contraseña actual:</Text>
          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.inputModal, { backgroundColor: theme.colorPrimario, borderColor: theme.colorTerciario, color: theme.colorTexto }]}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Contraseña actual"
              />
            )}
          />
          {errors.oldPassword && (
            <Text style={{ color: 'red' }}>{errors.oldPassword.message}</Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={submitConfirmation}>
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={submitCancelation}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>    
  );
};

export default ConfirmationModal;
