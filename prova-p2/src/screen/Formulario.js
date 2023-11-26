import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Formik } from 'formik';

function CadastroForm(props) {
    const [page, setPage] = useState(0);
    const [form, setForm] = useState({
        nome: '',
        email: '',
        cpf: '',
        cep: '',
        localizacao: ''
    });

    const [cepData, setCepData] = useState({
        rua: '',
        bairro: '',
        cidade: '',
        uf: '',
        ibge: ''
    });

    const [cepEditable, setCepEditable] = useState(true);

    useEffect(() => {
        const fetchStoredData = async () => {
            try {
                // Recuperar os dados do AsyncStorage
                const storedFormData = await AsyncStorage.getItem('formData');
                if (storedFormData) {
                    setForm(JSON.parse(storedFormData));
                }
            } catch (error) {
                console.error('Erro ao recuperar os dados:', error);
            }
        };

        fetchStoredData();
    }, []);

    function pesquisacep(valor) {
        var cep = valor.replace(/\D/g, '');

        if (cep !== '') {
            var validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {
                axios
                    .get(`https://viacep.com.br/ws/${cep}/json/`)
                    .then((response) => {
                        if (!('erro' in response.data)) {
                            setCepData({
                                rua: response.data.logradouro,
                                bairro: response.data.bairro,
                                cidade: response.data.localidade,
                                uf: response.data.uf,
                                ibge: response.data.ibge
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
    }

    const handleInputChange = (name, value) => {
        setForm({
            ...form,
            [name]: value
        });
    };

    async function handleSubmit(form) {
        try {
            // Armazenar os dados do formulário no AsyncStorage
            let lista = cepData
            lista.push(cepData)
            await AsyncStorage.setItem('formData', JSON.stringify(lista));
            setCepData(lista)
            console.log(jsonValue)

            // Ir para a próxima página ou realizar qualquer outra ação necessária
            // props.navigation.push('User')
        } catch (error) {
            console.error('Erro ao salvar os dados:', error);
        }
    };

    return (
        <View>
            <Formik
                initialValues={{
                    nome:  '',
                    sobreNome: '',
                    cpf: '',
                    celular: '',
                    salario: '',
                }}
                // validationSchema={FuncionarioValidator}
                onSubmit={(values, { resetForm }) => {
                    salvar(values);
                    resetForm(); // Reseta os valores do formulário para initialValues
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <>
                        {page === 0 && (
                            <>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, justifyContent: 'center' }}>
                                    <View style={{ backgroundColor: 'blue', borderWidth: 2, alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25, borderColor: 'white' }}>
                                        <Text style={{ color: 'white' }}>1</Text>
                                    </View>
                                    <Divider bold style={{ borderWidth: 2, borderColor: 'white', width: 20, backgroundColor: 'white' }} />
                                    <View style={{ backgroundColor: 'black', borderWidth: 2, alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25, borderColor: 'white' }}>
                                        <Text style={{ color: 'white' }}>2</Text>
                                    </View>
                                </View>
                                <TextInput
                                    style={{ backgroundColor: 'white' }}
                                    placeholder="Nome"
                                    value={form.nome}
                                    onChangeText={(value) => handleInputChange('nome', value)}
                                />
                                <TextInput
                                    style={{ backgroundColor: 'white' }}
                                    placeholder="Email"
                                    value={form.email}
                                    onChangeText={(value) => handleInputChange('email', value)}
                                />
                                <TextInput
                                    style={{ backgroundColor: 'white' }}
                                    placeholder="CPF"
                                    value={form.cpf}
                                    onChangeText={(value) => handleInputChange('cpf', value)}
                                />
                                <Button title="Avançar" onPress={() => setPage(1)} />
                            </>
                        )}
                        {page === 1 && (
                            <>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, justifyContent: 'center' }}>
                                    <View style={{ backgroundColor: 'white', borderWidth: 2, alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25, borderColor: 'white' }}>
                                        <Text style={{ color: 'white' }}>1</Text>
                                    </View>
                                    <Divider bold style={{ borderWidth: 2, borderColor: 'white', width: 20, backgroundColor: 'white' }} />
                                    <View style={{ backgroundColor: 'blue', borderWidth: 2, alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25, borderColor: 'white' }}>
                                        <Text style={{ color: 'white' }}>2</Text>
                                    </View>
                                </View>
                                <TextInput
                                    style={{ backgroundColor: 'white' }}
                                    placeholder="CEP"
                                    value={form.cep}
                                    onChangeText={(value) => {
                                        handleInputChange('cep', value);
                                        pesquisacep(value);
                                    }}
                                />
                                <TextInput
                                    style={{ backgroundColor: 'white' }}
                                    placeholder="Rua"
                                    value={cepData.rua}
                                    editable={cepEditable}
                                />
                                <TextInput
                                    style={{ backgroundColor: 'white' }}
                                    placeholder="Bairro"
                                    value={cepData.bairro}
                                    editable={cepEditable}
                                />
                                <TextInput
                                    style={{ backgroundColor: 'white' }}
                                    placeholder="Cidade"
                                    value={cepData.cidade}
                                    editable={cepEditable}
                                />
                                <TextInput
                                    style={{ backgroundColor: 'white' }}
                                    placeholder="UF"
                                    value={cepData.uf}
                                    editable={cepEditable}
                                />
                                <Button title="Voltar" onPress={() => setPage(0)} />
                                <Button title="Cadastrar" onPress={handleSubmit} />
                            </>
                        )}
                    </>
                )}
            </Formik>
        </View>
    );
}

export default CadastroForm;


{/* <TextInput
style={FuncionarioStyle.input}
outlineColor={GlobalValues.mainColor}
activeOutlineColor={GlobalValues.thirdColor}
textColor={GlobalValues.thirdColor}
mode='outlined'
label='Nome'
onChangeText={handleChange('nome')}
onBlur={handleBlur('nome')}
value={values.nome}
error={errors.nome ? true : false}
/>

{touched.nome && errors.nome && (
<Text style={{ color: GlobalValues.mainColor, textAlign: 'center' }}>{errors.nome}</Text>
)} */}