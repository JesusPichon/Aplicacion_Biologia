import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    opacity: 0.5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
    width: '100%',
  },
  animatedView: {
    flex: 30,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  keyboardView2: {
    flex: 8,
    margin: 20,
  },
  titleText: {
    marginTop: '50%',
    marginLeft: '40%',
    fontStyle: 'italic',
    fontSize: 50,
    fontWeight: 'bold',
  },
  animatedView2: {
    flex: 70,
    width: '100%',
    alignItems: 'center',
  },
  viewForm: {
    width: '80%',
    flex: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewUserField: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  viewUserIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  viewUserMailField: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  iconoUsuario: {width: 40, height: 40, marginRight: 10},
  iconoCorreo: {width: 45, height: 45, marginRight: 5},
  viewPasswordField: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  iconoPassword: {width: 45, height: 45, marginRight: 5},
  viewToggleLogin: {
    flexDirection: 'column',
    flex: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  input: {
    fontWeight: 'bold',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 25,
    height: 40,
    width: '85%',
  },
  // Nuevo contenedor para campos de contraseña con botón
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    marginBottom: 25,
    position: 'relative',
  },
  // Input específico para contraseñas (sin margen bottom)
  inputPassword: {
    fontWeight: 'bold',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 45, // Espacio para el botón del ojo
    height: 40,
    flex: 1,
  },
  // Botón del ojo para mostrar/ocultar contraseña
  eyeButton: {
    position: 'absolute',
    right: 10,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  button: {
    borderRadius: 25,
    width: '35%',
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: -20,
    fontSize: 14,
  },
  loginRegisterButton: {
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});

export default styles;
