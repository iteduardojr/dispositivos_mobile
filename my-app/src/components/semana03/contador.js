import { View, Text } from "react-native";
import React, { useState } from "react";

export default function Contador(){

    const[valor, setValor] = useState(0)

    // let valor = 0

    function incrementar(){
        setValor(valor + 1)
    }

    function decrementar(){
       setValor(valor - 1)
    }

    return(
        <View styles={styles.container}>
            <Text styles={styles.text}>Volume</Text>
            <Text styles={styles.text}>{valor}</Text>
            <View>
                <Button tittle='+' onPress={incrementar}/>
                <Button tittle='-' onPress={decrementar}/>
            </View>
        </View>
    )
}

const styles = StylesSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItens:'center',

    },
    text:{
        fontSize:30
    },
    botao:{
        margin:10,
    }
})