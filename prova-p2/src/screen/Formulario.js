import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import {
    AnimatedFAB,
    Button,
    Card,
    IconButton,
    Modal,
    Paragraph,
    Portal,
    Text,
    TextInput,
} from 'react-native-paper';
import { launchImageLibraryAsync } from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TextInputMask } from 'react-native-masked-text';

export default function CadastroForm({ visible, animateFrom, style }) {
    const [isExtended, setIsExtended] = useState(true);
    const [cadastros, setCadastros] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editCadastroId, setEditCadastroId] = useState(null);
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCpf] = useState('');
    const [cadastroImage, setCadastroImage] = useState(null);

    const [cep, setCep] = useState('');
    const [cepData, setCepData] = useState({
        rua: '',
        bairro: '',
        cidade: '',
        uf: '',
        ibge: '',
    });

    const [cepEditable, setCepEditable] = useState(true);

    useEffect(() => {
        const fetchCadastros = async () => {
            try {
                const storedCadastros = await AsyncStorage.getItem('cadastros');
                if (storedCadastros) {
                    setCadastros(JSON.parse(storedCadastros));
                }
            } catch (error) {
                console.error('Error fetching cadastros:', error);
            }
        };

        fetchCadastros();
    }, []);

    useEffect(() => {
        const saveCadastros = async () => {
            try {
                await AsyncStorage.setItem('cadastros', JSON.stringify(cadastros));
            } catch (error) {
                console.error('Error saving cadastros:', error);
            }
        };

        saveCadastros();
    }, [cadastros]);

    const onScroll = ({ nativeEvent }) => {
        const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
        setIsExtended(currentScrollPosition <= 0);
    };

    const fabStyle = { [animateFrom]: 16 };

    const showModal = () => setModalVisible(true);

    const hideModal = () => {
        setModalVisible(false);
        setEditCadastroId(null);
        setEditMode(false);
        setNome('');
        setSobrenome('');
        setCpf('');
        setCadastroImage(null);
        setCep('');
        setCepData({
            rua: '',
            bairro: '',
            cidade: '',
            uf: '',
            ibge: '',
        });
        setCepEditable(true);
    };

    const pickImage = async () => {
        const result = await launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setCadastroImage(result.uri);
        }
    };

    const pesquisarCep = (valor) => {
        const cep = valor.replace(/\D/g, '');

        if (cep !== '') {
            const validacaoCep = /^[0-9]{8}$/;

            if (validacaoCep.test(cep)) {
                axios
                    .get(`https://viacep.com.br/ws/${cep}/json/`)
                    .then((response) => {
                        if (!('erro' in response.data)) {
                            setCepData({
                                rua: response.data.logradouro,
                                bairro: response.data.bairro,
                                cidade: response.data.localidade,
                                uf: response.data.uf,
                                ibge: response.data.ibge,
                            });
                            setCepEditable(false);
                        } else {
                            alert('CEP não encontrado.');
                        }
                    })
                    .catch((error) => {
                        alert('CEP não encontrado.');
                    });
            }
        }
    };

    const handleAddCadastro = () => {
        // Adicione a validação aqui
        if (!nome || !sobrenome || !cpf || !cep) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const novoCadastro = {
            id: editMode ? editCadastroId : cadastros.length + 1,
            nome,
            sobrenome,
            cpf,
            thumbnail: cadastroImage,
            cepData: { ...cepData },
        };

        if (editMode && editCadastroId !== null) {
            const cadastrosAtualizados = cadastros.map((cadastro) =>
                cadastro.id === editCadastroId ? { ...cadastro, ...novoCadastro } : cadastro
            );
            setCadastros(cadastrosAtualizados);
        } else {
            setCadastros([...cadastros, novoCadastro]);
        }

        setEditMode(false);
        setEditCadastroId(null);
        setNome('');
        setSobrenome('');
        setCpf('');
        setCadastroImage(null);
        setCep('');
        setCepData({
            rua: '',
            bairro: '',
            cidade: '',
            uf: '',
            ibge: '',
        });
        setCepEditable(true);

        hideModal();
    };

    const handleEditCadastro = (cadastroId) => {
        const cadastroParaEditar = cadastros.find((cadastro) => cadastro.id === cadastroId);

        if (cadastroParaEditar) {
            setEditMode(true);
            setEditCadastroId(cadastroId);
            setNome(cadastroParaEditar.nome);
            setSobrenome(cadastroParaEditar.sobrenome);
            setCpf(cadastroParaEditar.cpf);
            setCadastroImage(cadastroParaEditar.thumbnail);
            setCepData({ ...cadastroParaEditar.cepData });
            showModal();
        }
    };

    const handleDeleteCadastro = (cadastroId) => {
        const cadastrosAtualizados = cadastros.filter((cadastro) => cadastro.id !== cadastroId);
        setCadastros(cadastrosAtualizados);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView} onScroll={onScroll}>
                {cadastros.map((item) => (
                    <Card key={item.id} style={styles.card}>
                        <Card.Cover source={{ uri: item.thumbnail }} />
                        <Card.Title
                            title={`Nome: ${item.nome}`}
                            subtitle={`CPF: ${item.cpf}`}
                            right={(props) => (
                                <View style={styles.iconButtonContainer}>
                                    <IconButton
                                        {...props}
                                        icon="pencil"
                                        onPress={() => handleEditCadastro(item.id)}
                                    />
                                    <IconButton
                                        {...props}
                                        icon="delete"
                                        onPress={() => handleDeleteCadastro(item.id)}
                                    />
                                </View>
                            )}
                        />
                        <Card.Content>
                            <Paragraph>Sobrenome: {item.sobrenome}</Paragraph>
                            <Paragraph>CEP: {item.cepData.rua}</Paragraph>
                            <Paragraph>Bairro: {item.cepData.bairro}</Paragraph>
                            <Paragraph>Cidade: {item.cepData.cidade}</Paragraph>
                            <Paragraph>Estado: {item.cepData.uf}</Paragraph>
                            <Paragraph>IBGE: {item.cepData.ibge}</Paragraph>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>

            <AnimatedFAB
                icon="plus"
                label="Adicionar Cadastro"
                extended={isExtended}
                onPress={() => {
                    setEditMode(false);
                    showModal();
                }}
                visible={visible}
                animateFrom="right"
                iconMode="static"
                style={[styles.fabStyle, style, fabStyle]}
            />

            <Portal>
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>
                            {editMode ? 'Editar Cadastro' : 'Adicionar Cadastro'}
                        </Text>
                        <TextInput
                            label="Nome"
                            value={nome}
                            onChangeText={(text) => setNome(text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Sobrenome"
                            value={sobrenome}
                            onChangeText={(text) => setSobrenome(text)}
                            style={styles.input}
                        />
                        <TextInputMask
                            label="CPF"
                            value={cpf}
                            type={'cpf'}
                            options={{
                                format: '999.999.999-99',
                            }}
                            onChangeText={(extracted) => {
                                setCpf(extracted);
                            }}
                            keyboardType="numeric"
                            style={styles.input}// Aplicando estilos específicos para o TextInputMask no modal
                        />
                        <TextInputMask
                            label="CEP"
                            value={cep}
                            type={'custom'}
                            options={{
                                mask: '99999-999',
                            }}
                            onChangeText={(text) => setCep(text)}
                            keyboardType="numeric"
                            style={styles.input}
                            onBlur={() => {
                                pesquisarCep(cep);
                            }}
                        />
                        <TextInput
                            label="Rua"
                            value={cepData.rua}
                            onChangeText={(text) => setCepData((data) => ({ ...data, rua: text }))}
                            style={styles.input}
                            editable={cepEditable}
                        />
                        <TextInput
                            label="Bairro"
                            value={cepData.bairro}
                            onChangeText={(text) => setCepData((data) => ({ ...data, bairro: text }))}
                            style={styles.input}
                            editable={cepEditable}
                        />
                        <TextInput
                            label="Cidade"
                            value={cepData.cidade}
                            onChangeText={(text) => setCepData((data) => ({ ...data, cidade: text }))}
                            style={styles.input}
                            editable={cepEditable}
                        />
                        <TextInput
                            label="Estado"
                            value={cepData.uf}
                            onChangeText={(text) => setCepData((data) => ({ ...data, uf: text }))}
                            style={styles.input}
                            editable={cepEditable}
                        />
                        <TextInput
                            label="IBGE"
                            value={cepData.ibge}
                            onChangeText={(text) => setCepData((data) => ({ ...data, ibge: text }))}
                            style={styles.input}
                            editable={cepEditable}
                        />
                        <View style={styles.imagePickerContainer}>
                            <Text>Foto do Cadastro:</Text>
                            <Button onPress={pickImage}>Selecionar Foto</Button>
                            {cadastroImage && <Card.Cover source={{ uri: cadastroImage }} style={styles.selectedImage} />}
                        </View>
                        <Button mode="contained" onPress={handleAddCadastro} style={styles.addButton}>
                            {editMode ? 'Editar' : 'Adicionar'}
                        </Button>
                    </ScrollView>
                </Modal>
            </Portal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },

    scrollView: {
        flexGrow: 1,
        paddingBottom: 20, // Ajuste para evitar que o botão seja coberto pelo teclado
    },

    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },

    card: {
        marginBottom: 10,
    },

    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    input: {
        marginVertical: 8,
    },

    imagePickerContainer: {
        marginVertical: 8,
    },

    selectedImage: {
        marginTop: 10,
        width: '100%',
        height: 150,
    },

    addButton: {
        marginTop: 20,
    },

    iconButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    modalInput: {
        marginVertical: 8,
        borderColor: 'gray',  // Adicione outros estilos conforme necessário
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});