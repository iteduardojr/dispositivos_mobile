import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Api from '../../services/Api';
import { Card, Avatar, Button } from 'react-native-paper';

export default function Home(props) {

  const navigation = props.navigation
  const [restaurantes, setRestaurantes] = useState([])

  useEffect(() => {
    Api.get('/food/restaurantes')
      .then(response => {
        setRestaurantes(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar restaurantes:", error);
      });
  }, []);

  const restaurante = (restauranteId) => {
    navigation.navigate('Restaurantes', { restauranteId });
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurantes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => restaurante(item.id)}>
            <Card style={styles.card}>
              <Card.Title
                title={item.nome}
                subtitle={item.tipo_cozinha}
                left={() => <Avatar.Image size={48} source={{ uri: item.imagem }} />}
                right={() => <Button size={48} icon="chevron-right" />}
              />
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
  },
});
