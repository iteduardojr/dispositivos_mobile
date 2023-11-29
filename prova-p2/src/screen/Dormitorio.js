import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { AnimatedFAB, Button, Card, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dormitorios({ visible, animateFrom, style }) {
  const [isExtended, setIsExtended] = useState(true);
  const [dormitorios, setDormitorios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editDormitorioId, setEditDormitorioId] = useState(null);
  const [dormitorioName, setDormitorioName] = useState('');
  const [dormitorioCapacity, setDormitorioCapacity] = useState('');
  const [dormitorioDescription, setDormitorioDescription] = useState('');
  const [dormitorioImage, setDormitorioImage] = useState(null);

  useEffect(() => {
    const fetchDormitorios = async () => {
      try {
        const storedDormitorios = await AsyncStorage.getItem('dormitorios');
        if (storedDormitorios) {
          setDormitorios(JSON.parse(storedDormitorios));
        }
      } catch (error) {
        console.error('Error fetching dormitorios:', error);
      }
    };

    fetchDormitorios();
  }, []);

  useEffect(() => {
    const saveDormitorios = async () => {
      try {
        await AsyncStorage.setItem('dormitorios', JSON.stringify(dormitorios));
      } catch (error) {
        console.error('Error saving dormitorios:', error);
      }
    };

    saveDormitorios();
  }, [dormitorios]);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  const showModal = () => setModalVisible(true);

  const hideModal = () => {
    setModalVisible(false);
    setEditDormitorioId(null);
    setEditMode(false);
    setDormitorioName('');
    setDormitorioCapacity('');
    setDormitorioDescription('');
    setDormitorioImage(null);
  };

  const handleAddDormitorio = () => {
    if (!dormitorioName.trim() || !dormitorioCapacity.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (editMode && editDormitorioId !== null) {
      const updatedDormitorios = dormitorios.map((dormitorio) =>
        dormitorio.id.toString() === editDormitorioId
          ? {
              ...dormitorio,
              name: dormitorioName,
              capacity: dormitorioCapacity,
              description: dormitorioDescription,
              thumbnail: dormitorioImage,
            }
          : dormitorio
      );
      setDormitorios(updatedDormitorios);
    } else {
      const newDormitorio = {
        id: (dormitorios.length + 1).toString(),
        name: dormitorioName,
        capacity: dormitorioCapacity,
        description: dormitorioDescription,
        thumbnail: dormitorioImage,
      };
      setDormitorios([...dormitorios, newDormitorio]);
    }

    setEditMode(false);
    setEditDormitorioId(null);
    setDormitorioName('');
    setDormitorioCapacity('');
    setDormitorioDescription('');
    setDormitorioImage(null);

    hideModal();
  };

  const handleEditDormitorio = (dormitorioId) => {
    const dormitorioToEdit = dormitorios.find(
      (dormitorio) => dormitorio.id.toString() === dormitorioId
    );
    if (dormitorioToEdit) {
      setEditMode(true);
      setEditDormitorioId(dormitorioId);
      setDormitorioName(dormitorioToEdit.name);
      setDormitorioCapacity(dormitorioToEdit.capacity);
      setDormitorioDescription(dormitorioToEdit.description);
      setDormitorioImage(dormitorioToEdit.thumbnail);
      showModal();
    }
  };

  const handleDeleteDormitorio = (dormitorioId) => {
    const updatedDormitorios = dormitorios.filter(
      (dormitorio) => dormitorio.id.toString() !== dormitorioId
    );
    setDormitorios(updatedDormitorios);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dormitorios}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>Capacidade: {item.capacity}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="pencil"
                onPress={() => handleEditDormitorio(item.id)}
              />
              <IconButton
                icon="delete"
                onPress={() => handleDeleteDormitorio(item.id)}
              />
            </Card.Actions>
          </Card>
        )}
        keyExtractor={(item) => item.id.toString()}
        onScroll={onScroll}
      />
      <AnimatedFAB
        icon="plus"
        label="Adicionar Dormitório"
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
          <Text style={styles.modalTitle}>
            {editMode ? 'Editar Dormitório' : 'Adicionar Dormitório'}
          </Text>
          <TextInput
            label="Nome do Dormitório"
            value={dormitorioName}
            onChangeText={(text) => setDormitorioName(text)}
            style={styles.input}
          />
          <TextInput
            label="Capacidade do Dormitório"
            value={dormitorioCapacity}
            onChangeText={(text) => setDormitorioCapacity(text)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Descrição do Dormitório"
            value={dormitorioDescription}
            onChangeText={(text) => setDormitorioDescription(text)}
            multiline
            style={styles.input}
          />
          {/* Seção de seleção de imagem removida */}
          <Button mode="contained" onPress={handleAddDormitorio} style={styles.addButton}>
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
    margin: 10,
    elevation: 3,
    borderRadius: 10,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  cardSubtitle: {
    fontSize: 14,
    color: 'gray',
  },

  cardDescription: {
    fontSize: 16,
    marginVertical: 8,
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

  addButton: {
    marginTop: 20,
  },
});
