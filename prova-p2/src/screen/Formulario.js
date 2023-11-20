import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import Global from '../../style/Global';
import { Divider, Text } from 'react-native-paper';

function CadastroForm() {
    const [page, setPage] = useState(0);
    const [form, setForm] = useState({
        nome: '',
        email: '',
        cpf: '',
        cep: '',
        localizacao: ''
    });

    const handleInputChange = (name, value) => {
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = () => {
        console.log(form);
    };

    return (
        <View>
            {page === 0 && (
                <>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, justifyContent: 'center' }}>
                        <View style={{backgroundColor: 'blue', borderWidth: 2, alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25, borderColor: 'white' }}>
                            <Text style={{ color: 'white' }}>1</Text>
                        </View>
                        <Divider bold style={{borderWidth: 2, borderColor: 'white', width: 20, backgroundColor: 'white'}}/>
                        <View style={{backgroundColor: 'black', borderWidth: 2, alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25, borderColor: 'white' }}>
                            <Text style={{ color: 'white' }}>2</Text>
                        </View>
                    </View>
                    <TextInput
                        style={{ backgroundColor: Global.mainColor }}
                        placeholder="Nome"
                        value={form.nome}
                        onChangeText={(value) => handleInputChange('nome', value)}
                    />
                    <TextInput
                        style={{ backgroundColor: Global.mainColor }}
                        placeholder="Email"
                        value={form.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                    <TextInput
                        style={{ backgroundColor: Global.mainColor }}
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
                        <View style={{backgroundColor: 'white', borderWidth: 2, alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25, borderColor: 'white' }}>
                            <Text style={{ color: 'black' }}>1</Text>
                        </View>
                        <Divider bold style={{borderWidth: 2, borderColor: 'white', width: 20, backgroundColor: 'white'}}/>
                        <View style={{backgroundColor: 'blue', borderWidth: 2, alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25, borderColor: 'blue' }}>
                            <Text style={{ color: 'white' }}>2</Text>
                        </View>
                    </View>
                    <TextInput
                        style={{ backgroundColor: Global.mainColor }}
                        placeholder="CEP"
                        value={form.cep}
                        onChangeText={(value) => handleInputChange('cep', value)}
                    />
                    <TextInput
                        style={{ backgroundColor: Global.mainColor }}
                        placeholder="Localização"
                        value={form.localizacao}
                        onChangeText={(value) => handleInputChange('localizacao', value)}
                    />
                    <Button title="Voltar" onPress={() => setPage(0)} />
                    <Button title="Cadastrar" onPress={handleSubmit} />
                </>
            )}
        </View>
    );
}

export default CadastroForm;
