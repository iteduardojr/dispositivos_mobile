import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import ApiDummy from '../../services/ApiDummy';
import Pessoa from '../semana06/Pessoa'

function Usuario() {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    ApiDummy.get('/users')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados da API: ', error);
      });
  }, []);

  return (
    <View>


      <View>
        <FlatList
          data={users}
          renderItem={({ item }) => (

            <Pessoa pessoa={item}/>

          )}
        />
      </View>

    </View>
  );
}

export default Usuario;
