import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Entypo } from "@expo/vector-icons";

import Icon from './Icon';

const CommentBar = (props) => {
  return (
    <View style={styles.container}>
      <View style={ props.commentPhrase == "" ? styles.commentBar__empty : styles.commentBar__notEmpty }>
        <Icon
          iconStyle={styles.commentIcon}
          iconSource={props.iconSource}
        />
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
    margin: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    maxWidth: 360,
    height: 35,
  },
  commentIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentBar__empty: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderRadius: 18,
    alignItems: "center",
    height: 35,
  },
  commentBar__notEmpty: {
    padding: 10,
    flexDirection: "row",
    width: "85%",
    backgroundColor: "#D9D9D9",
    borderRadius: 18,
    alignItems: "center",
    height: 35,
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