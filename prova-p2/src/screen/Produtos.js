import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { AnimatedFAB, Button, Card, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { launchImageLibraryAsync } from 'expo-image-picker';
import Api from '../services/Api';
import { formatarComoDinheiro } from '../../components/Simbolo';

export default function Produtos({ visible, animateFrom, style }) {
  const [isExtended, setIsExtended] = useState(true);
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productName, setProductName] = useState('');
  const [productValue, setProductValue] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  useEffect(() => {
    Api.get('/products')
      .then(response => {
        console.log('Products:', response.data.products);
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const fabStyle = { [animateFrom]: 16 };

  const showModal = () => setModalVisible(true);
  const hideModal = () => {
    setModalVisible(false);
    // Limpar os campos do formulário ao fechar o modal
    setProductName('');
    setProductValue('');
    setProductDescription('');
    setProductImage(null);
  };

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProductImage(result.uri);
    }
  };

  const handleAddProduct = () => {
    // Aqui você pode enviar os dados do novo produto para o servidor ou realizar a ação desejada
    // Certifique-se de validar os campos antes de prosseguir
    console.log({
      name: productName,
      value: productValue,
      description: productDescription,
      image: productImage,
    });

    // Limpar os campos do formulário
    setProductName('');
    setProductValue('');
    setProductDescription('');
    setProductImage(null);

    // Fechar o modal
    hideModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <Card key={item.id} style={styles.card}>
              <Card.Cover source={{ uri: item.thumbnail }} />
              <Card.Title
                title={item.title}
                subtitle={formatarComoDinheiro(item.price)}
                right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
              />
            </Card>
          )}
        />
      </ScrollView>
      <AnimatedFAB
        icon={'plus'}
        label={'Adicionar Produto'}
        extended={isExtended}
        onPress={showModal}
        visible={visible}
        animateFrom={'right'}
        iconMode={'static'}
        style={[styles.fabStyle, style, fabStyle]}
      />

      {/* Modal */}
      <Portal>
        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Adicionar Produto</Text>
          <TextInput
            label="Nome do Produto"
            value={productName}
            onChangeText={text => setProductName(text)}
            style={styles.input}
          />
          <TextInput
            label="Valor do Produto"
            value={productValue}
            onChangeText={text => setProductValue(text)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Descrição do Produto"
            value={productDescription}
            onChangeText={text => setProductDescription(text)}
            multiline
            style={styles.input}
          />
          <View style={styles.imagePickerContainer}>
            <Text>Foto do Produto:</Text>
            <Button onPress={pickImage}>Selecionar Foto</Button>
            {productImage && <Card.Cover source={{ uri: productImage }} style={styles.selectedImage} />}
          </View>
          <Button mode="contained" onPress={handleAddProduct} style={styles.addButton}>
           <Text>Produto</Text>
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
});
