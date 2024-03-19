import styles from '../../styles/style-app';
import { principal } from '../../styles/style-colors';
import Nosotros from '../../components/FAQ/Nosotros';
import {
    View,
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