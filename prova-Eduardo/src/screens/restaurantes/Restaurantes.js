import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Api from '../../services/Api';
import { Card, Avatar, Button, Divider } from 'react-native-paper';

export default function RestaurantDetails({ route }) {
  const { restauranteId } = route.params;
  const [restaurante, setRestaurante] = useState(null);
  const [pratos, setPratos] = useState([]);
  const [bebidas, setBebidas] = useState([]);

  useEffect(() => {
    Api.get(`/food/restaurantes/${restauranteId}`)
      .then(response => {
        setRestaurante(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar detalhes do restaurante:", error);
      });
  }, [restauranteId]);

  if (!restaurante) {
    return null; // Mostrar um indicador de carregamento ou mensagem enquanto os dados estão sendo buscados
  }

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Restaurante</Text>
      <Card>
        <Card.Cover source={{ uri: restaurante.imagem }} />
        <Card.Title
          title={restaurante.nome}
          subtitle={restaurante.tipo_cozinha}
          left={() => <Avatar.Image size={48} source={{ uri: restaurante.imagem }} />}
          right={() => <Button size={48} icon="chevron-right" />}
          />
        <Card.Content>
          <Text style={styles.label}>Descrição:</Text>
          <Text>{restaurante.descricao}</Text>

          <Text style={styles.label}>Tipo de Cozinha:</Text>
          <Text>{restaurante.tipo_cozinha}</Text>

          <Text style={styles.label}>Endereço:</Text>
          <Text>{restaurante.endereco}</Text>

          <Text style={styles.label}>Horário de Funcionamento:</Text>
          <Text>{restaurante.horario_funcionamento}</Text>
        </Card.Content>
      </Card>
    </View>

    <View style={styles.container}>
      <Text style={styles.title}>Cardápio</Text>
      <Card>
        <Card.Cover source={{ uri: restaurante.imagem }} />
        <Card.Title
          title={restaurante.nome}
          subtitle={restaurante.tipo_cozinha}
          left={() => <Avatar.Image size={48} source={{ uri: restaurante.imagem }} />}
          right={() => <Button size={48} icon="chevron-right" />}
          />
        <Card.Content>
          <Text style={styles.label}>Descrição:</Text>
          <Text>{restaurante.descricao}</Text>

          <Text style={styles.label}>Tipo de Cozinha:</Text>
          <Text>{restaurante.tipo_cozinha}</Text>

          <Text style={styles.label}>Endereço:</Text>
          <Text>{restaurante.endereco}</Text>

          <Text style={styles.label}>Horário de Funcionamento:</Text>
          <Text>{restaurante.horario_funcionamento}</Text>
        </Card.Content>
      </Card>
    </View>
</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
  },
});
