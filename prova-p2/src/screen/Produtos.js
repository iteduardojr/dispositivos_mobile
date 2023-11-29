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

export default function Produtos({ visible, animateFrom, style }) {
    const [isExtended, setIsExtended] = useState(true);
    const [products, setProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [productName, setProductName] = useState('');
    const [productValue, setProductValue] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const storedProducts = await AsyncStorage.getItem('products');
                if (storedProducts) {
                    setProducts(JSON.parse(storedProducts));
                }
            } catch (error) {
                console.error('Error loading products:', error);
            }
        };

        loadProducts();
    }, []);

    useEffect(() => {
        const saveProducts = async () => {
            try {
                await AsyncStorage.setItem('products', JSON.stringify(products));
            } catch (error) {
                console.error('Error saving products:', error);
            }
        };

        saveProducts();
    }, [products]);

    const onScroll = ({ nativeEvent }) => {
        const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
        setIsExtended(currentScrollPosition <= 0);
    };

    const fabStyle = { [animateFrom]: 16 };

    const showModal = () => setModalVisible(true);

    const hideModal = () => {
        setModalVisible(false);
        setEditProductId(null);
        setEditMode(false);
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
        // Adicione a validação aqui
        if (!productName.trim() || !productValue.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const newProduct = {
            id: editMode ? editProductId : products.length + 1,
            title: productName,
            price: parseFloat(productValue.replace('R$', '').replace(',', '.')) || 0,
            description: productDescription,
            thumbnail: productImage,
        };

        if (editMode && editProductId !== null) {
            const updatedProducts = products.map((product) =>
                product.id === editProductId ? { ...product, ...newProduct } : product
            );
            setProducts(updatedProducts);
        } else {
            setProducts([...products, newProduct]);
        }

        setEditMode(false);
        setEditProductId(null);
        setProductName('');
        setProductValue('');
        setProductDescription('');
        setProductImage(null);

        hideModal();
    };

    const handleEditProduct = (productId) => {
        const productToEdit = products.find((product) => product.id === productId);
        if (productToEdit) {
            setEditMode(true);
            setEditProductId(productId);
            setProductName(productToEdit.title);
            setProductValue(productToEdit.price.toFixed(2));
            setProductDescription(productToEdit.description);
            setProductImage(productToEdit.thumbnail);
            showModal();
        }
    };

    const handleDeleteProduct = (productId) => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
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
                            title={`Nome do produto: ${item.title}`}
                            subtitle={`Valor R$: ${item.price.toFixed(2)}`}
                          
                                right={(props) => (
                                    <View style={styles.iconButtonContainer}>
                                        <IconButton
                                            {...props}
                                            icon="pencil"
                                            onPress={() => handleEditProduct(item.id)}
                                        />
                                        <IconButton
                                            {...props}
                                            icon="delete"
                                            onPress={() => handleDeleteProduct(item.id)}
                                        />
                                    </View>
                                )}
                            />
                            <Card.Content>
                                <Paragraph>Descrição: {item.description}</Paragraph>
                            </Card.Content>
                        </Card>
                    )}
                />
            </ScrollView>

            <AnimatedFAB
                icon={'plus'}
                label={'Adicionar Produto'}
                extended={isExtended}
                onPress={() => {
                    setEditMode(false);
                    showModal();
                }}
                visible={visible}
                animateFrom={'right'}
                iconMode={'static'}
                style={[styles.fabStyle, style, fabStyle]}
            />

            <Portal>
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <Text style={styles.modalTitle}>
                        {editMode ? 'Editar Produto' : 'Adicionar Produto'}
                    </Text>
                    <TextInput
                        label="Nome do Produto"
                        value={productName}
                        onChangeText={(text) => setProductName(text)}
                        style={styles.input}
                    />
                    <TextInputMask
                        type={'money'}
                        label="Valor do Produto"
                        value={productValue}
                        onChangeText={(text) => setProductValue(text)}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <TextInput
                        label="Descrição do Produto"
                        value={productDescription}
                        onChangeText={(text) => setProductDescription(text)}
                        multiline
                        style={styles.input}
                    />
                    <View style={styles.imagePickerContainer}>
                        <Text>Foto do Produto:</Text>
                        <Button onPress={pickImage}>Selecionar Foto</Button>
                        {productImage && <Card.Cover source={{ uri: productImage }} style={styles.selectedImage} />}
                    </View>
                    <Button mode="contained" onPress={handleAddProduct} style={styles.addButton}>
                        {editMode ? 'Editar' : 'Adicionar'}
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

    iconButtonContainer: {
        flexDirection: 'row',
    },
});
