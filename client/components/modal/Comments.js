import { View, Modal, Text, FlatList, StyleSheet, TouchableWithoutFeedback, } from 'react-native';
import { AntDesign, Entypo } from "@expo/vector-icons";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import Icon from '../Icon';

const CommentSection = (props) => {
  const data = [
    {
      id: 0,
      name: 'Daniel Dang',
      avatar: 'https://c.stocksy.com/a/bBo600/z9/1622887.jpg',
      text: 'This is a comment!',
      replies: [ 
        {
          id: 1,
          name: 'Zachary De Aguiar',
          avatar: 'https://i.pinimg.com/originals/80/fb/8d/80fb8d8390601bfe5ba4c52b4dc79b8a.jpg',
          text: 'This is a reply!'
        },
        {
          id: 2,
          name: 'Jas Chawla',
          avatar: 'https://i.pinimg.com/236x/47/51/48/475148587abdbdd81cc3d09fdbcbab16.jpg',
          text: 'This is another reply!'
        },
       ]
    },
    {
      id: 3,
      name: 'Ryan Nageer',
      avatar: 'https://th.bing.com/th/id/R.57529fe941352b6a608aa0c77cacc099?rik=ja%2f2y3qTNUZQVQ&riu=http%3a%2f%2fwww.pak101.com%2ffunnypictures%2fFunny%2f2011%2f7%2f22%2f5_cjlxs.jpg&ehk=8WobPJQV0XRZ0iGg7UzDSOJbCsygoHpsoYYUz7WoF9o%3d&risl=&pid=ImgRaw&r=0',
      text: 'This is another comment!'
    },
    {
      id: 4,
      name: 'Matthew Echenique',
      avatar: 'https://th.bing.com/th/id/OIP.3GZTipqj8i7LniAr6IgDdwAAAA?rs=1&pid=ImgDetMain',
      text: 'This is yet another adfggggggggggggdfagadfgcomment!'
    }
  ]

  const totalComments = data.reduce((acc, item) => acc + (item.replies ? item.replies.length + 1 : 1), 0);

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.comment}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            iconStyle={styles.commentIcon}
            iconSource={{uri: item.avatar}}
          />
          <Text style={styles.commentText}>
            <Text style={{fontWeight: '500'}}>{item.name}</Text>{'\n'}{item.text}
          </Text>
        </View>
        <AntDesign 
            name="heart" 
            size={16} 
            color="#782F40" 
            style={{ right: -5, marginTop: 3, }} 
            onPress={props.onClose}
        />
      </View>
      {item.replies && item.replies.map(reply => (
        <View key={reply.id} style={styles.reply}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              iconStyle={styles.replyIcon}
              iconSource={{uri: reply.avatar}}
            />
            <Text style={styles.replyText}>
              <Text style={{fontWeight: '500'}}>{reply.name}</Text>{'\n'}{reply.text}
            </Text>
          </View>
          <AntDesign 
            name="hearto" 
            size={16} 
            color="#000" 
            style={{ right: -5, marginTop: 3, }} 
            onPress={props.onClose}
          />
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
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <View style={styles.headerContainer}>
                  <Text style={styles.title}>{totalComments} comments</Text>
                  <Entypo 
                    name="cross" 
                    size={24} 
                    color="#000" 
                    style={{ position: 'absolute', right: -6 }} 
                    onPress={props.onClose}
                  />
                </View>
                <View style={styles.commentContainer}>
                  <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<View style= {styles.noCommentContainer}><Text style={styles.noCommentText}>Be the first to comment!</Text></View>}
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    paddingTop: 0,
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
  headerContainer:{
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  commentContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'left',
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  commentIcon: {
    marginTop: 3,
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  replyIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 10,
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
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  comment: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 5,
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
  },
  reply: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 5,
    paddingLeft: 45,
    width: '100%',
    flexDirection: 'row',
  },
  commentText: {
    flexShrink: 1,
  },
  
  replyText: {
    flexShrink: 1,
  }
});

export default CommentSection;