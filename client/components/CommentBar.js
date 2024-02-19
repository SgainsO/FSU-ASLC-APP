import React from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button, Text } from "react-native";

import Icon from './Icon';

const CommentBar = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          iconStyle={styles.commentIcon}
          iconSource={props.iconSource}
        />
      </View>
      <View style={{ width: props.commentPhrase === "" ? "88%" : "74%" }}>
        {props.isReply && (
          <View style={styles.replyingToBar}>
            <Text style={styles.replyingToText}>Replying to {props.repliedName}</Text>
          </View>
        )}
        <View style={!props.isReply ? styles.commentBar : styles.commentBarReplying}>
          <TextInput
            style={styles.input}
            placeholder={props.isReply ? "Add Reply..." : "Add comment..."}
            placeholderTextColor="#888"
            value={props.commentPhrase}
            onChangeText={props.setCommentPhrase}
            onFocus={() => { props.setClicked(true); }}
            onBlur={() => { props.setClicked(false); props.setReplyingTo(""); props.setReplyId(-1)}}
            ref={props.inputRef}
          />
        </View>
      </View>
      {props.clicked && props.commentPhrase !== "" && (
        <View style={styles.sendButtonContainer}>
          <Button
            title="Send"
            onPress={() => {
              Keyboard.dismiss();
              props.onSend(props.commentPhrase);
              props.setClicked(false);
              props.setCommentPhrase("");
              props.setReplyingTo("");
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 20,
    marginBottom: 5,
    paddingHorizontal: '4%',
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
    width: "100%",
    maxWidth: "100%",
  },
  iconContainer: {
    backgroundColor: "white",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  commentIcon: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  commentBar: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    alignItems: "center",
    height: 40,
  },
  commentBarReplying: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    height: 40,
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
    flex: 1, // Use flex to ensure it fills the available space
  },
  replyingToBar: {
    backgroundColor: "#eee", // A light grey to distinguish the replying to bar
    padding: 8,
    paddingLeft: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  replyingToText: {
    fontSize: 14,
    color: "#666", // A darker grey for text
  },
  sendButtonContainer: {
    marginLeft: 5, // Ensure some space between the text input and the send button
  },
});

export default CommentBar;
