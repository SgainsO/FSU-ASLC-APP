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
      <View style={styles.comment}>
        <Text>{item.name}: {item.text}</Text>
      </View>
      {item.replies && item.replies.map(reply => (
        <View key={reply.id} style={styles.reply}>
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
      swipeDirection="down"
      onSwipeComplete={() => { props.isVisible = false; }}
    >
      <TouchableWithoutFeedback onPress={props.onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.container}>
              <View>
                <Text style={styles.title}>{totalComments} COMMENTS</Text>
              </View>
              <View style={styles.commentContainer}>
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                  ListEmptyComponent={<View style= {styles.noCommentContainer}><Text style={styles.noCommentText}>Be the first to comment!</Text></View>}
                />
              </View>
            </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
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
    borderRadius: 20,
    width: '100%',
  },
  commentContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  comment: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  noCommentContainer: {
    marginTop: '150%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCommentText: {
    fontSize: 16,
    color: 'gray',
  },
  reply: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    marginVertical: 3,
    marginLeft: 20, // Indent replies for visual hierarchy
    borderRadius: 5,
  },
});

export default CommentSection;