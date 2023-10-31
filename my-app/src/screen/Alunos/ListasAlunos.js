import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, Divider, FAB, MD3Colors, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'


export default function ListasAluos({ navigation, route }) {

  const [alunos, setAlunos] = useState([])
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false)
  const [alunoASerExcluido, setAlunoASerExcluido] = useState(null)


  useEffect(() => {
    loadPessoas()
  }, [])

  async function loadPessoas() {
    const response = await AsyncStorage.getItem('alunos')
    console.log("🚀 ~ file: ListasAluos.js:21 ~ loadPessoas ~ response:", response)
    const pessoasStorage = response ? JSON.parse(response) : []
    setAlunos(pessoasStorage)
  }



  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarAluno(aluno) {
    let novaListaAlunos = alunos
    novaListaAlunos.push(aluno)
    await AsyncStorage.setItem('alunos', JSON.stringify(novaListaAlunos));
    setAlunos(novaListaAlunos)
  }

  async function editarPessoa(alunoAntigo, novosDados) {
    console.log('PESSOA ANTIGA -> ', alunoAntigo)
    console.log('DADOS NOVOS -> ', novosDados)

    const novaListaAlunos = alunos.map(aluno => {
      if (aluno == alunoAntigo) {
        return novosDados
      } else {
        return aluno
      }
    })

    await AsyncStorage.setItem('alunos', JSON.stringify(novaListaAlunos))
    setAlunos(novaListaAlunos)

  }

  async function excluirPessoa(aluno) {
    const novaListaAlunos = alunos.filter(p => p !== aluno)
    await AsyncStorage.setItem('alunos', JSON.stringify(novaListaAlunos))
    setAlunos(novaListaAlunos)
    Toast.show({
      type: 'success',
      text1: 'Pessoa excluida com sucesso!'
    })
  }

  function handleExluirAluno() {
    excluirPessoa(alunoASerExcluido)
    setAlunoASerExcluido(null)
    hideModal()
  }

  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Pessoas</Text>

      <FlatList
        style={styles.list}
        data={alunos}
        renderItem={({ item }) => (
          <Card mode='outlined' style={styles.card} >
            <Card.Content style={styles.cardContent} >

              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>{item?.nome}</Text>
                <Text variant='bodyLarge'>Matricula: {item?.matricula}</Text>
                <View>
                  <Text variant='bodyLarge'>Turno: {item?.turno}</Text>
                  <Text variant='bodyLarge'>Curso: {item.curso}</Text>
                </View>
              </View>

            </Card.Content>
            <Divider bold />
            <Card.Actions>
              <Button onPress={() => navigation.push('AddAlunos', { acao: editarPessoa, aluno: item })}>
                Editar
              </Button>
              <Button onPress={() => { setAlunoASerExcluido(item), showModal() }}>
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Botão Flutuante */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('AddAlunos', { acao: adicionarAluno })}
      />


      {/* Modal Excluir Usuário */}
      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este usuário?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirAluno}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', justifyContent: 'space-between'
  },

  title: {
    fontWeight: 'bold',
    margin: 10
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },

  list: {
    width: '90%',
  },

  card: {
    marginTop: 15
  },

  cardContent: {
    flexDirection: 'row',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15
  }

})