import { Text, View } from "react-native"

const NumeroAleatorio = function (props) {
    const { min, max } = props;

    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;

    return (
        <View>
            <Text>Número Aleatório: {numeroAleatorio}</Text>
        </View>
    );
};

export default NumeroAleatorio 