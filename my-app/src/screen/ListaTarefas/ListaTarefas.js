import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';

export default function ListaTarefas() {

    const [tarefas, setTarefas] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [editando, setEditando] = useState(false)
    const [tarefaSendoEditado, setTarefaSendoEditado] = useState(null)


    useEffect(() => {
        loadTarefas()
    },[])


    async function loadTarefas() {
        const response =  await AsyncStorage.getItem('tarefas')
        console.log("🚀 ~ file: ListaTarefas.js:21 ~ loadTarefas ~ response:", response)
        const tarefasStorage = response ? JSON.parse(response) : []
        setTarefas(tarefasStorage)
    }


    async function adicionarTarefa() {
        console.log('ADICIONAR TAREFA')
        let novaListaTarefas = tarefas
        novaListaTarefas.push(inputValue)
        await AsyncStorage.setItem('tarefas', JSON.stringify(novaListaTarefas));
        setTarefas(novaListaTarefas)
        setTarefaSendoEditado(null)
        setInputValue('')
    }

    async function editarTarefa() {
        console.log('EDITAR TAREFA')
        console.log('tarefaSendoEditado: ', tarefaSendoEditado)
        console.log('TarefaASerEditado inputValue: ', inputValue)

        let index = tarefas.indexOf(tarefaSendoEditado)
        let novaListaTarefas = tarefas

        novaListaTarefas.splice(index, 1, inputValue)

        await AsyncStorage.setItem('tarefas', JSON.stringify(novaListaTarefas));
        setTarefas(novaListaTarefas)
        setEditando(false)
        setInputValue('')
    }

    async function excluirTarefa(tarefa) {
        let novaListaTarefas = tarefas.filter(item => item !== tarefa)
        await AsyncStorage.setItem('tarefas', JSON.stringify(novaListaTarefas));
        setTarefas(novaListaTarefas)
    }

    function handleEditarTarefa(tarefa) {
        setTarefaSendoEditado(tarefa)
        setInputValue(tarefa)
        setEditando(true)
    }

    function handleButton() {
        console.log('HANDLE BUTTON -> editando: ', editando)
        if (editando) {
            editarTarefa()
        } else {
            adicionarTarefa()
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>

                <TextInput
                    style={{ flex: 4 }}
                    mode='outlined'
                    label='Tarefa'
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />


                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={handleButton}
                >
                    {editando ? 'Edit' : 'Add'}
                </Button>

            </View>



            <FlatList
                style={styles.list}
                data={tarefas}
                renderItem={({ item }) => (
                    <Card
                        style={styles.card}
                        mode='outlined'
                    >
                        <Card.Content style={styles.cardContent}>
                            <Text variant='titleMedium' style={{ flex: 1 }}>{item}</Text>
                            <IconButton icon='pen' onPress={() => {
                                handleEditarTarefa(item)
                            }} />
                            <IconButton icon='trash-can-outline' onPress={() => {
                                excluirTarefa(item)
                            }} />
                        </Card.Content>
                    </Card>
                )}

            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        width: '95%',
        paddingTop: 10,
        gap: 5
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        width: '95%',
        marginTop: 10
    },
    card: {
        margin: 5
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})