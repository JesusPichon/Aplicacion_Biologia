import { useRef } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';

const animaciones = () => {
  // constantes que podemos usar para animar
  const unoAnim = useRef(new Animated.Value(0)).current; // va del 0 al 1
  const translateAnimUP = useRef(new Animated.Value(Dimensions.get('screen').height)).current; // va del largo de la pantalla (abajo) a la posicion original
  const translateAnimDOWN = useRef(new Animated.Value(-Dimensions.get('screen').height)).current; // va del largo de la pantalla (arriba) a la posicion original
  const translateAnimRIGHT = useRef(new Animated.Value(Dimensions.get('screen').width)).current; // va del ancho de la pantalla (derecha) a la posicion original
  const translateAnimLEFT = useRef(new Animated.Value(-Dimensions.get('screen').width)).current; // va del ancho de la pantalla (ixquierda) a la posicion original
  // curba que realiza la animacion (como una linea de tiempo)
  const bezierPoints = [0,1.31,.7,1];

  // animaciones
  const unoIn = () => {
    Animated.timing(unoAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const unoOut = () => {
    Animated.timing(unoAnim, {
      toValue: 1.4,
      duration: 700,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const translateIn = () => {
    Animated.timing(translateAnimUP, {
      toValue: 0,
      duration: 1000,
      easing: Easing.bezier(...bezierPoints),
      useNativeDriver: true,
    }).start();

    Animated.timing(translateAnimDOWN, {
      toValue: 0,
      duration: 1000,
      easing: Easing.bezier(...bezierPoints),
      useNativeDriver: true,
    }).start();

    Animated.timing(translateAnimRIGHT, {
        toValue: 0,
        duration: 1000,
        easing: Easing.bezier(...bezierPoints),
        useNativeDriver: true,
    }).start();

    Animated.timing(translateAnimLEFT, {
        toValue: 0,
        duration: 1000,
        easing: Easing.bezier(...bezierPoints),
        useNativeDriver: true,
    }).start();
  };

  const translateOut = () => {
    Animated.timing(translateAnimUP, {
      toValue: Dimensions.get('screen').height,
      duration: 600,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateAnimDOWN, {
      toValue: Dimensions.get('screen').height - Dimensions.get('screen').height*0.9,
      duration: 600,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateAnimRIGHT, {
        toValue: Dimensions.get('screen').width,
        duration: 600,
        easing: Easing.ease,
        useNativeDriver: true,
    }).start();

    Animated.timing(translateAnimLEFT, {
        toValue: -Dimensions.get('screen').width,
        duration: 600,
        easing: Easing.ease,
        useNativeDriver: true,
    }).start();
  };

  // las animaciones de entrada duran 1 segundo
  const startAnimations = () => {
    unoIn();
    translateIn();
  };

  // las animaciones de salida duran 250 milisegundos y redirige la pantalla
  const resetAnimations = (navigation, screen) => {
    unoOut();
    translateOut();
    setTimeout(() => {
      navigation.navigate(screen);
    }, 250);
  };

  // retornamos las variables animadas y sus funciones
  return {
    unoAnim,
    translateAnimUP,
    translateAnimDOWN,
    translateAnimRIGHT,
    translateAnimLEFT,
    startAnimations,
    resetAnimations,
  };
};

export default animaciones;
