import styles from '../../styles/style-app';
import { principal, secundario, tercero, cuarto } from '../../styles/style-colors';
import Nosotros from '../../components/FAQ/Nosotros';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    Animated,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    ScrollView,
} from "react-native";



const FAQ = () => {
    return (
        <View style={[
            styles.fondoT,
            {
                flex: 1,
                /*marginTop: Constants.statusBarHeight,*/
            }]}>
            <StatusBar
                barStyle="ligth-content"
                animated={true}
                backgroundColor={principal}
            />


            <SafeAreaView>
                <ScrollView>
                    {/* quienes somos */}
                    <View>
                        <Nosotros></Nosotros>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default FAQ;