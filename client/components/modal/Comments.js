import React, { useState } from 'react';
import { View, Modal, Text, FlatList, StyleSheet, TouchableWithoutFeedback, } from 'react-native';
import { AntDesign, Entypo } from "@expo/vector-icons";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import Icon from '../Icon';

const CommentSection = (props) => {
  const loggedInUUID = 0;

  const users = [
    {
    uuid: 0,
    name: 'Daniel Dang',
    avatar: 'https://c.stocksy.com/a/bBo600/z9/1622887.jpg',
    },
    {
    uuid: 1,
    name: 'Zachary De Aguiar',
    avatar: 'https://i.pinimg.com/originals/80/fb/8d/80fb8d8390601bfe5ba4c52b4dc79b8a.jpg',
    },
    {
    uuid: 2,
    name: 'Jas Chawla',
    avatar: 'https://i.pinimg.com/236x/47/51/48/475148587abdbdd81cc3d09fdbcbab16.jpg',
    },
        {
    uuid: 3,
    name: 'Ryan Nageer',
    avatar: 'https://th.bing.com/th/id/R.57529fe941352b6a608aa0c77cacc099?rik=ja%2f2y3qTNUZQVQ&riu=http%3a%2f%2fwww.pak101.com%2ffunnypictures%2fFunny%2f2011%2f7%2f22%2f5_cjlxs.jpg&ehk=8WobPJQV0XRZ0iGg7UzDSOJbCsygoHpsoYYUz7WoF9o%3d&risl=&pid=ImgRaw&r=0',
    },
    {
      uuid: 4,
      name: 'Matthew Echenique',
      avatar: 'https://th.bing.com/th/id/OIP.3GZTipqj8i7LniAr6IgDdwAAAA?rs=1&pid=ImgDetMain',
    },
  ]

  const data = [
    {
      comment_id: 0,
      uuid: 0,
      likes: 12451,
      text: 'This is a comment!',
      replies: [ 
        {
          comment_id: 1,
          uuid: 1,
          likes: 1245,
          text: 'This is a reply!'
        },
        {
          comment_id: 2,
          uuid: 2,
          likes: 251,
          text: 'This is another reply!'
        },
       ]
    },
    {
      comment_id: 3,
      uuid: 3,
      likes: 356451,
      text: 'This is another comment!'
    },
    {
      comment_id: 4,
      uuid: 4,
      likes: 1236451,
      text: 'This is yet another comment!'
    }
  ]
  
  const [liked, setLiked] = useState([0, 1, 4]); // in backend, we can request liked per post
  const [comments, setComments] = useState(data); // data is what is requested from backend

  const totalComments = data.reduce((acc, item) => acc + (item.replies ? item.replies.length + 1 : 1), 0);

  const formatLikes = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  };

  const toggleLike = (commentId) => {
    // Create a new array with updated likes
    const updatedComments = comments.map(comment => {
      if (comment.comment_id === commentId) {
        // For a top-level comment
        return {
          ...comment,
          likes: liked.includes(commentId) ? comment.likes - 1 : comment.likes + 1,
        };
      } else if (comment.replies) {
        // Check if it's a reply to a comment
        const updatedReplies = comment.replies.map(reply => {
          if (reply.comment_id === commentId) {
            return {
              ...reply,
              likes: liked.includes(commentId) ? reply.likes - 1 : reply.likes + 1,
            };
          }
          return reply;
        });
        return {...comment, replies: updatedReplies};
      }
      return comment;
    });
  
    // Set the updated comments array back to the state
    setComments(updatedComments);
  
    // Update the liked state
    if (liked.includes(commentId)) {
      setLiked(liked.filter(id => id !== commentId));
    } else {
      setLiked([...liked, commentId]);
    }
  };
  

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.comment}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            iconStyle={styles.commentIcon}
            iconSource={{uri: users[item.uuid].avatar}}
          />
          <Text style={styles.commentText}>
            <Text style={{fontWeight: '500'}}>{users[item.uuid].name}</Text>{'\n'}{item.text}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center', backgroundColor: 'white',}}>
          <Text style={{fontSize: 12, color: liked.includes(item.comment_id) ? "#782F40" : "gray", textAlign: 'center', marginTop: 1}}>{formatLikes(item.likes)}</Text>
          <AntDesign 
              name={liked.includes(item.comment_id) ? "heart" : "hearto"} 
              size={16} 
              color={liked.includes(item.comment_id) ? "#782F40" : "gray"} 
              style={{ right: -5, marginTop: 3, }} 
              onPress={() => toggleLike(item.comment_id)}
          />
        </View>
      </View>
      {item.replies && item.replies.map(reply => (
        <View key={reply.comment_id} style={styles.reply}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              iconStyle={styles.replyIcon}
              iconSource={{uri: users[reply.uuid].avatar}}
            />
            <Text style={styles.replyText}>
              <Text style={{fontWeight: '500'}}>{users[reply.uuid].name}</Text>{'\n'}{reply.text}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center', backgroundColor: 'white',}}>
            <Text style={{fontSize: 12, color: liked.includes(reply.comment_id) ? "#782F40" : "gray", textAlign: 'center', marginTop: 1}}>{formatLikes(reply.likes)}</Text>
            <AntDesign 
                name={liked.includes(reply.comment_id) ? "heart" : "hearto"} 
                size={16} 
                color={liked.includes(reply.comment_id) ? "#782F40" : "gray"} 
                style={{ right: -5, marginTop: 3, }} 
                onPress={() => toggleLike(reply.comment_id)}
            />
          </View>
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
                    style={{ position: 'absolute', right: 15 }} 
                    onPress={props.onClose}
                  />
                </View>
                <View style={styles.commentContainer}>
                  <FlatList
                    data={comments}
                    renderItem={renderItem}
                    keyExtractor={item => item.comment_id}
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
    borderRadius: 30,
    width: '100%',
    overflow: 'hidden',
  },
  headerContainer:{
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  commentContainer: {
    flex: 1,
    padding: 30,
    paddingTop: 0,
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
    marginTop: 3,
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
    marginTop: 25,
    width: '100%',
    flexDirection: 'row',
  },
  reply: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 5,
    paddingLeft: 45,
    marginTop: 15,
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