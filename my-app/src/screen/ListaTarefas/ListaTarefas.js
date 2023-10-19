import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper'

export default function ListaTarefas() {
    const [tarefas, setTarefas] = useState(["Tarefa 1", "Tarefa 2"])
    const [inputValue, setInputValue] = useState('')
    const [editando, setEditando] = useState(false)
    const [tarefaSendoEditada, setTarefaSendoEditada] = useState(null)

    function adicionarTarefa() {
        let novaListaTarefas = [...tarefas, inputValue]
        setTarefas(novaListaTarefas)
        setTarefaSendoEditada(null)
        setInputValue('')
    }

    function editarTarefa() {
        const index = tarefas.indexOf(tarefaSendoEditada)
        const novaListaTarefas = [...tarefas]
        novaListaTarefas[index] = inputValue
        setTarefas(novaListaTarefas)
        setEditando(false)
        setInputValue('')
    }

    function excluirTarefa(tarefa) {
        const novaListaTarefas = tarefas.filter(item => item !== tarefa)
        setTarefas(novaListaTarefas)
    }

    function handleEditarTarefa(tarefa) {
        setTarefaSendoEditada(tarefa)
        setInputValue(tarefa)
        setEditando(true)
    }

    function handleButton() {
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
                    {editando ? 'Editar' : 'Adicionar'}
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
                            <IconButton icon='pencil' onPress={() => handleEditarTarefa(item)} />
                            <IconButton icon='delete' onPress={() => excluirTarefa(item)} />
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
