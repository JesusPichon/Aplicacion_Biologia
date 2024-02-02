import { Image, Card } from "@rneui/base";
import { View, Text } from "react-native";



const Toma = (props) => {
  return (
    <Card>
      <View>
        <Image
          source={require('../../assets/images/flor.png')}
          style={{ width: 50, height: 50, marginVertical: 30 }} />
      </View>
      <View>
        <Text>Familia: {props.item.Familia}</Text>
      </View>
    </Card>
  );
}

export default Toma;