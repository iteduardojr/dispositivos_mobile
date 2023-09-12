import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Cronometro(props) {

    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [active, setActive] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        let interval;

        if (active) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    let { hours, minutes, seconds } = prevTime;

                    seconds = seconds === 59 ? 0 : seconds + 1;
                    minutes = seconds === 0 ? (minutes === 59 ? 0 : minutes + 1) : minutes;
                    hours = minutes === 0 && seconds === 0 ? (hours === 23 ? 0 : hours + 1) : hours;

                    return { hours, minutes, seconds };
                });
            }, 100);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [active]);

    const controlTimer = () => {
        setActive(!active);
    };

    const resetTimer = () => {
        setHistory([...history, time])
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        setActive(false);
    };

    const delet = () => {
        setHistory([])
    }

    // const formattedTime = `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`; ormattedTime = `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
    const formattedTime = `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;

    return (
        <View style={styles.tudo}>
            <View style={styles.Timer}>
                <Image source={require('../../assets/Cronometro.png')} style={styles.Image} />
                <View style={[styles.Timer1, styles.Equal]}>
                    <Text style={styles.textTimer}>{formattedTime}</Text>
                </View>
                <View style={styles.viewButton}>
                    <TouchableOpacity style={[styles.Button, styles.Equal]} onPress={controlTimer}>
                        <Text style={styles.buttonText}>{active ? 'Parar' : 'Começar'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.Button, styles.Equal]} onPress={resetTimer}>
                        <Text style={styles.buttonText}>Reiniciar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.TextoHistorico}>
                {history.length > 0 ? <>
                    <Text style={styles.buttonText}>Histórico:</Text>
                    <View style={styles.Scroll}>
                        <ScrollView style={[styles.Equal]}>
                            {history.map((record, index) => (
                                <Text key={index} style={[styles.buttonText, styles.Map]}>{`Time: ${String(record.hours).padStart(2, '0')}:${String(record.minutes).padStart(2, '0')}:${String(record.seconds).padStart(2, '0')}`}</Text>
                            ))}
                        </ScrollView>
                        <View style={styles.Timer}>
                            <TouchableOpacity style={[styles.Button, styles.Equal]} onPress={delet}>
                                <Text style={[styles.Button, styles.buttonText]}>Apagar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </> : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tudo: {
        justifyContent: 'center', alignItems: 'center', gap: 50,
        marginVertical: 90
    },

    Timer: {

        justifyContent: 'center', alignItems: 'center', gap: 30,

    },

    Image: {
        width: 260, height: 260, resizeMode: 'stretch'
    },

    Timer1: {
        alignItems: 'center',
        paddingVertical: 5,
        width: 260,
    },

    textTimer: {
        fontSize: 40,
        color: 'red',
    },

    viewButton: {
        flexDirection: 'row', gap: 20
    },

    Button: {
        alignItems: "center", justifyContent: 'center',
        padding: 5,
        width: 120, height: 50,
    },

    buttonText: {
        fontSize: 22, textAlign: 'center',
        color: 'white'
    },

    Equal: {
        borderRadius: 5,
        borderWidth: 1, borderColor: 'red'
    },

    TextoHistorico: {
        width: 280,
        backgroundColor: 'blue',
    },

    Scroll: {
        padding: 10,
        width: 280, maxHeight: 200,
        gap: 30,
    },

    Map: {
        marginVertical: 5,
        paddingVertical: 2
    }

})