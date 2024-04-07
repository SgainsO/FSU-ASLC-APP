import React, { useState, useRef } from 'react';
import { View, SafeAreaView, Modal, Text, FlatList, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, } from 'react-native';
import { AntDesign, Entypo } from "@expo/vector-icons";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import CommentBar from '../CommentBar';
import CommentItem from '../CommentItem';

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
      date: '2024-02-16T04:00:00Z',
      text: 'This is a comment!',
      replies: [ 
        {
          comment_id: 1,
          uuid: 1,
          likes: 1245,
          date: '2024-02-16T05:30:00Z',
          text: 'This is a reply!'
        },
        {
          comment_id: 2,
          uuid: 2,
          likes: 251,
          date: '2024-02-16T05:38:30Z',
          text: 'This is another reply!'
        },
       ]
    },
    {
      comment_id: 3,
      uuid: 3,
      likes: 356451,
      date: '2024-01-01T00:00:00Z',
      text: 'This is another comment!'
    },
    {
      comment_id: 4,
      uuid: 4,
      likes: 1236451,
      date: '2021-10-03T00:00:00Z',
      text: 'This is yet another comment!'
    }
  ]
  
  const totalComments = data.reduce((acc, item) => acc + (item.replies ? item.replies.length + 1 : 1), 0);

  const [liked, setLiked] = useState([]); // in backend, we can request liked per post
  const [comments, setComments] = useState(data); // data is what is requested from backend
  const [commentCount, setCommentCount] = useState(totalComments);

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

  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
    let interval = seconds / 31536000; // Number of seconds in a year
  
    if (interval > 1) {
      return Math.floor(interval) + "y";
    }
    interval = seconds / 604800; // Number of seconds in a week
    if (interval > 1) {
      return Math.floor(interval) + "w";
    }
    interval = seconds / 86400; // Number of seconds in a day
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    interval = seconds / 3600; // Number of seconds in an hour
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60; // Number of seconds in a minute
    if (interval >= 1) {
      return Math.floor(interval) + "m";
    }
    
    return Math.floor(seconds) + "s";
  };
  
  const addNewComment = (commentText) => {
    if (replyingTo === "") {
      const newComment = {
        comment_id: commentCount,
        uuid: loggedInUUID,
        likes: 0,
        date: new Date().toISOString(),
        text: commentText,
        replies: []
      };

      setComments([...comments, newComment]);
    }
    else {
      const newReply = {
        comment_id: commentCount,
        uuid: loggedInUUID,
        likes: 0,
        date: new Date().toISOString(),
        text: commentText,
      };
  
      let repliedToFound = false;

    const updatedComments = comments.map(comment => {
      if (comment.comment_id === replyId || (comment.replies && comment.replies.some(reply => reply.comment_id === replyId))) {
        // Found the parent comment or a reply to which the user is replying
        repliedToFound = true;
        const newReplies = comment.replies ? [...comment.replies, newReply] : [newReply];
        return { ...comment, replies: newReplies };
      }
      return comment;
    });

    // This means the reply was to a nested reply. We need to add the reply to the correct nested location
    if (!repliedToFound) {
      for (let i = 0; i < updatedComments.length; i++) {
        let comment = updatedComments[i];
        if (comment.replies && comment.replies.length > 0) {
          let newReplies = comment.replies.map(reply => {
            if (reply.comment_id === replyId) {
              // This is the nested reply being replied to
              return { ...reply, replies: [...(reply.replies || []), newReply] };
            } else {
              return reply;
            }
          });
          updatedComments[i] = { ...comment, replies: newReplies };
          break;
        }
      }
    }

    setComments(updatedComments);
  }

    setCommentCount(commentCount + 1);
  };
  
  // Comment bar consts
  const [commentPhrase, setCommentPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [replyingTo, setReplyingTo] = useState("");
  const [replyId, setReplyId] = useState(-1);
  const inputRef = useRef(null);

  // Focus the input when replying to a comment
  const focusInput = () => {
    inputRef.current.focus();
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <CommentItem
        comment_id={item.comment_id}
        item={item}
        liked={liked}
        likes={formatLikes(item.likes)}
        toggleLike={toggleLike}
        iconStyle={styles.commentIcon}
        textStyle={styles.commentText}
        container={styles.comment}
        avatar={users[item.uuid].avatar}
        name={users[item.uuid].name}
        timeSince={timeSince(item.date)}
        text={item.text}
        setReplyingTo={setReplyingTo}
        setReplyId={setReplyId}
        setClicked={setClicked}
        focusInput={focusInput}
      />
      {item.replies && item.replies.map(reply => (
        <CommentItem
          key={reply.comment_id}
          comment_id={reply.comment_id}
          item={reply}
          liked={liked}
          likes={formatLikes(reply.likes)}
          toggleLike={toggleLike}
          iconStyle={styles.replyIcon}
          textStyle={styles.replyText}
          container={styles.reply}
          avatar={users[reply.uuid].avatar}
          name={users[reply.uuid].name}
          timeSince={timeSince(reply.date)}
          text={reply.text}
          setReplyingTo={setReplyingTo}
          setReplyId={setReplyId}
          setClicked={setClicked}
          focusInput={focusInput}
        />
      ))}
    </View>
  );
 const [VisibleOrInvisible, changeVisible] = useState(props.isModalVisible)
  return (
    <Modal 
      animationType='slide'
      transparent={true}
      visible={VisibleOrInvisible}
      onRequestClose={props.hideModal}
    >
      <TouchableWithoutFeedback onPress={props.onClose}>
        <View style={styles.darkBackground}/>
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{commentCount} comments</Text>
            <Entypo 
              name="cross" 
              size={24} 
              color="#000" 
              style={{ position: 'absolute', right: 25 }} 
              onPress={() => changeVisible(false)}
            />
          </View>
          <View style={styles.commentContainer}>
            <FlatList
              data={comments}
              renderItem={renderItem}
              keyExtractor={item => item.comment_id}
              ListEmptyComponent={<View style= {styles.noCommentContainer}><Text style={styles.noCommentText}>Be the first to comment!</Text></View>}
              keyboardDismissMode="interactive"
            />
          </View>
          <SafeAreaView style={styles.commentBarContainer}>
            <CommentBar
              iconSource={{uri: users[loggedInUUID].avatar}}
              commentPhrase={commentPhrase}
              setCommentPhrase={setCommentPhrase}
              clicked={clicked}
              setClicked={setClicked}
              onSend={addNewComment}
              isReply={replyingTo !== ""}
              repliedName={replyingTo}
              setReplyingTo={setReplyingTo}
              setReplyId={setReplyId}
              inputRef={inputRef}
            />
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    overflow: 'hidden',
  },
  headerContainer:{
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  commentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'left',
    width: '100%',
  },
  commentBarContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    width: '100%',
  },
  darkBackground: {
    flex: 0.4,
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
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  reply: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 5,
    paddingLeft: 45,
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  commentText: {
    flexShrink: 1,
  },
  replyText: {
    flexShrink: 1,
  },
});

export default CommentSection;