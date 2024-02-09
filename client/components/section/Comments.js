import { View, Modal, Text, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const CommentSection = (props) => {
  const data = [
    {
      id: 0,
      name: 'Daniel Dang',
      avatar: 'https://www.jesusisthesubject.org/wp-content/uploads/2017/04/blank-profile-hi.jpg',
      text: 'This is a comment!',
      replies: [ 
        {
          id: 1,
          name: 'Zachary De Aguiar',
          avatar: 'https://www.jesusisthesubject.org/wp-content/uploads/2017/04/blank-profile-hi.jpg',
          text: 'This is a reply!'
        },
        {
          id: 2,
          name: 'Jas Chawla',
          avatar: 'https://www.jesusisthesubject.org/wp-content/uploads/2017/04/blank-profile-hi.jpg',
          text: 'This is another reply!'
        },
       ]
    },
    {
      id: 3,
      name: 'Ryan Nageer',
      avatar: 'https://www.jesusisthesubject.org/wp-content/uploads/2017/04/blank-profile-hi.jpg',
      text: 'This is another comment!'
    },
    {
      id: 4,
      name: 'Matthew Echenique',
      avatar: 'https://www.jesusisthesubject.org/wp-content/uploads/2017/04/blank-profile-hi.jpg',
      text: 'This is yet another comment!'
    }
  ]

  const totalComments = data.reduce((acc, item) => acc + (item.replies ? item.replies.length + 1 : 1), 0);

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.commentStyle}>
        <Text>{item.name}: {item.text}</Text>
      </View>
      {item.replies && item.replies.map(reply => (
        <View key={reply.id} style={styles.replyStyle}>
          <Text>{reply.name}: {reply.text}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <Modal 
      animationType='slide'
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onClose}
    >
      <TouchableWithoutFeedback onPress={props.onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.containerStyle}>
              <View>
                <Text style={styles.title}>{totalComments} COMMENTS</Text>
              </View>
              <View>
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                  ListEmptyComponent={() => <Text>No comments</Text>}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background, removed later
  },
  modalStyle: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  commentStyle: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  replyStyle: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    marginVertical: 3,
    marginLeft: 20, // Indent replies for visual hierarchy
    borderRadius: 5,
  },
});

export default CommentSection;