import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { AnimatedFAB, Button, Card, IconButton, Modal, Paragraph, Portal, Text, TextInput } from 'react-native-paper';
import { launchImageLibraryAsync } from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Eventos({ visible, animateFrom, style }) {
  const [isExtended, setIsExtended] = useState(true);
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [tipoEvento, setTipoEvento] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [likedEvents, setLikedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem('events');
        if (storedEvents) {
          setEvents(JSON.parse(storedEvents));
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchLikedEvents = async () => {
      try {
        const storedLikedEvents = await AsyncStorage.getItem('likedEvents');
        if (storedLikedEvents) {
          setLikedEvents(JSON.parse(storedLikedEvents));
        }
      } catch (error) {
        console.error('Error fetching liked events:', error);
      }
    };

    fetchEvents();
    fetchLikedEvents();
  }, []);

  useEffect(() => {
    const saveEvents = async () => {
      try {
        await AsyncStorage.setItem('events', JSON.stringify(events));
      } catch (error) {
        console.error('Error saving events:', error);
      }
    };

    const saveLikedEvents = async () => {
      try {
        await AsyncStorage.setItem('likedEvents', JSON.stringify(likedEvents));
      } catch (error) {
        console.error('Error saving liked events:', error);
      }
    };

    saveEvents();
    saveLikedEvents();
  }, [events, likedEvents]);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  const toggleLike = (eventId) => {
    const isLiked = likedEvents.includes(eventId);
    if (isLiked) {
      setLikedEvents(likedEvents.filter((id) => id !== eventId));
    } else {
      setLikedEvents([...likedEvents, eventId]);
    }
  };

  const showModal = () => setModalVisible(true);

  const hideModal = () => {
    setModalVisible(false);
    setEditEventId(null);
    setEditMode(false);
    setEventName('');
    setEventDate('');
    setEventDescription('');
    setTipoEvento('');
    setEventImage(null);
  };

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setEventImage(result.uri);
    }
  };

  const handleAddEvent = () => {
    if (!eventName.trim() || !eventDate.trim() || !tipoEvento.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (editMode && editEventId !== null) {
      // Modo de edição
      const updatedEvents = events.map((event) =>
        event.id.toString() === editEventId
          ? {
              ...event,
              title: eventName,
              date: eventDate,
              description: eventDescription,
              type: tipoEvento,
              thumbnail: eventImage,
            }
          : event
      );
      setEvents(updatedEvents);
    } else {
      // Modo de adição
      const newEvent = {
        id: (events.length + 1).toString(),
        title: eventName,
        date: eventDate,
        description: eventDescription,
        type: tipoEvento,
        thumbnail: eventImage,
      };
      setEvents([...events, newEvent]);
    }

    setEditMode(false);
    setEditEventId(null);
    setEventName('');
    setEventDate('');
    setEventDescription('');
    setTipoEvento('');
    setEventImage(null);

    hideModal();
  };

  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find((event) => event.id.toString() === eventId);
    if (eventToEdit) {
      setEditMode(true);
      setEditEventId(eventId);
      setEventName(eventToEdit.title);
      setEventDate(eventToEdit.date);
      setEventDescription(eventToEdit.description);
      setTipoEvento(eventToEdit.type);
      setEventImage(eventToEdit.thumbnail);
      showModal();
    }
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id.toString() !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.card}>
            <Card.Cover source={{ uri: item.thumbnail }} />
            <Card.Title
              title={'EVENTO:' + ' ' + item.title}
              subtitle={'DATA:' + ' ' + item.date}
              right={(props) => (
                <View style={styles.iconButtonContainer}>
                  <IconButton
                    {...props}
                    icon="heart"
                    color={likedEvents.includes(item.id) ? 'red' : 'gray'}
                    onPress={() => toggleLike(item.id)}
                  />
                  <IconButton
                    {...props}
                    icon="pencil"
                    onPress={() => handleEditEvent(item.id)}
                  />
                  <IconButton
                    {...props}
                    icon="delete"
                    onPress={() => handleDeleteEvent(item.id)}
                  />
                </View>
              )}
            />
            <Card.Content>
              <Paragraph>Descrição: {item.description}</Paragraph>
              <Paragraph>Tipo de Evento: {item.type}</Paragraph>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item) => item.id.toString()}
        onScroll={onScroll}
      />
      <AnimatedFAB
        icon="plus"
        label="Adicionar Evento"
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
            {editMode ? 'Editar Evento' : 'Adicionar Evento'}
          </Text>
          <TextInput
            label="Nome do Evento"
            value={eventName}
            onChangeText={(text) => setEventName(text)}
            style={styles.input}
          />
          <TextInput
            label="Data do Evento"
            value={eventDate}
            onChangeText={(text) => setEventDate(text)}
            keyboardType="numeric"
            style={styles.input}
            placeholder="DD/MM/YYYY"
          />
          <TextInput
            label="Descrição do Evento"
            value={eventDescription}
            onChangeText={(text) => setEventDescription(text)}
            multiline
            style={styles.input}
          />
          <TextInput
            label="Tipo de Evento"
            value={tipoEvento}
            onChangeText={(text) => setTipoEvento(text)}
            style={styles.input}
          />
          <View style={styles.imagePickerContainer}>
            <Text>Foto do Evento:</Text>
            <Button onPress={pickImage}>Selecionar Foto</Button>
            {eventImage && <Card.Cover source={{ uri: eventImage }} style={styles.selectedImage} />}
          </View>
          <Button mode="contained" onPress={handleAddEvent} style={styles.addButton}>
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
    alignItems: 'center',
  },
});
