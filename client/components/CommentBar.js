import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Entypo } from "@expo/vector-icons";

import Icon from './Icon';

const CommentBar = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Icon
          iconStyle={styles.commentIcon}
          iconSource={props.iconSource}
        />
      </View>
      <View style={ props.commentPhrase == "" ? styles.commentBar__empty : styles.commentBar__notEmpty }>
        <TextInput
          style={styles.input}
          placeholder="Add comment..."
          placeholderTextColor="#888"
          value={props.commentPhrase}
          onChangeText={props.setCommentPhrase}
          onFocus={() => { props.setClicked(true); }}
        />
      </View>
      {props.clicked && props.commentPhrase != "" && (
        <View>
          <Button
            title="Send"
            onPress={() => {
              Keyboard.dismiss();
              props.onSend(props.commentPhrase);
              props.setClicked(false);
              props.setCommentPhrase("");
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
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    maxWidth: "100%",
    height: 45,
  },
  commentIcon: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  commentBar__empty: {
    padding: 10,
    flexDirection: "row",
    width: "88%",
    backgroundColor: "#D9D9D9",
    borderRadius: 23,
    alignItems: "center",
    height: 40,
  },
  commentBar__notEmpty: {
    padding: 10,
    flexDirection: "row",
    width: "74%",
    backgroundColor: "#D9D9D9",
    borderRadius: 23,
    alignItems: "center",
    height: 40,
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    height: "150%",
    width: "85%",
    color: 'black',
  },
});

export default CommentBar;