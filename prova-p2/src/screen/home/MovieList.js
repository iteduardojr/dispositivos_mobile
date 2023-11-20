import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Divider, IconButton, Modal, Portal, Text } from 'react-native-paper';
import Api from '../../services/Api';
import Global from '../../../style/Global';

export function MostrarImage(props) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {visible ? (
        <Card.Content>
          <Card.Cover source={{ uri: props.image }} />
          {props.children}
        </Card.Content>
      ) : null}
      <Card.Actions>
        <Button onPress={() => setVisible(!visible)} mode='outlined'>{visible ? 'Esconder' : 'Mostrar'}</Button>
      </Card.Actions>
    </>
  );
}

const IndexScreen = (props) => {
  const { navigation } = props;
  const [topRated, setTopRated] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState({});
  const [visible, setVisible] = React.useState(false);

  const [editComment, setEditComment] = useState('');
  const [currentCommentId, setCurrentCommentId] = useState(null);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  useEffect(() => {
    try {
      Api.get('/users?limit=10').then(response => {
        setTopRated(response.data.users);
        const initialComments = {};
        response.data.users.forEach(user => {
          initialComments[user.id] = [];
        });
        setComments(initialComments);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleComment = (userId) => {
    setComments(prevComments => ({
      ...prevComments,
      [userId]: [...prevComments[userId], { text: comment, id: Date.now() }],
    }));
    setComment('');
  };

  const handleDeleteComment = (userId, commentId) => {
    setComments(prevComments => ({
      ...prevComments,
      [userId]: prevComments[userId].filter(comment => comment.id !== commentId),
    }));
  };


  const handleEditComment = (postId, commentId) => {
    const commentToEdit = comments[postId].find(comment => comment.id === commentId);
    setEditComment(commentToEdit.text);
    setCurrentCommentId(commentId);
    showModal(true);
  };

  const handleSaveEdit = (postId) => {
    const updatedComments = comments[postId].map(comment => {
      if (comment.id === currentCommentId) {
        return { ...comment, text: editComment };
      }
      return comment;
    });
    setComments({ ...comments, [postId]: updatedComments });
    hideModal(false);
  };

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={topRated}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <>
            <Card mode='outlined' contentStyle={{ backgroundColor: Global.mainColor, borderColor: Global.mainColor, borderRadius: 14 }}>
              <Card.Title titleStyle={{ color: Global.secondColor }} subtitleStyle={{ color: Global.secondColor }}
                title={item.firstName + ' ' + item.lastName}
                subtitle={item.university}
                left={(props) => <Avatar.Image size={45} source={{ uri: item.image }} />}
                right={(props) => <IconButton iconColor={Global.secondColor} mode='outlined' {...props} icon="dots-vertical" onPress={() => navigation.push('dinamica', item.id)} />}
              />
              <Divider style={{ marginBottom: 10 }} bold />
              <MostrarImage image={item.image} >
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Comentários:</Text>
                  {comments[item.id] && comments[item.id].map((comment, index) => (
                    <View key={comment.id} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>{comment.text}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => handleDeleteComment(item.id, comment.id)}>
                          <Text style={{ color: 'red', marginLeft: 10 }}>Excluir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleEditComment(item.id, comment.id)}>
                          <Text style={{ color: 'blue', marginLeft: 10 }}>Editar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                  <TextInput
                    placeholder="Adicione um comentário..."
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                  />
                  <TouchableOpacity onPress={() => handleComment(item.id)}>
                    <Text style={{ color: 'blue' }}>Comentar</Text>
                  </TouchableOpacity>
                </View>

                <Portal>
                  <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <TextInput
                      placeholder="Edite seu comentário..."
                      value={editComment}
                      onChangeText={(text) => setEditComment(text)}
                    />
                    <TouchableOpacity onPress={() => handleSaveEdit(item.id)}>
                      <Text style={{ color: 'blue' }}>Salvar</Text>
                    </TouchableOpacity>
                  </Modal>
                </Portal>
              </MostrarImage>
            </Card>
          </>
        )}
      />
    </View>
  );
};

export default IndexScreen;
