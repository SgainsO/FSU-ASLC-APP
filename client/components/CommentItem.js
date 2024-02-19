import React, { useState } from 'react';
import { View, SafeAreaView, Modal, Text, FlatList, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

import Icon from './Icon';

const CommentBar = (props) => {
  return (
    <View style={props.container}>
        <View style={{ flexDirection: 'row' }}>
            <Icon
                iconStyle={props.iconStyle}
                iconSource={{ uri: props.avatar }}
            />
            <Text style={props.textStyle}>
                <Text style={{ fontWeight: '500' }}>{props.name}</Text>
                <Text style={{ fontWeight: '400', color: 'gray' }}> {props.timeSince}</Text>
                {'\n'}{props.text}{'\n'}
                <View style={{ paddingTop: 20 }}></View>
                <TouchableWithoutFeedback onPress={() => {
                    props.setReplyingTo(props.name);
                    props.setClicked(true);
                    props.focusInput();
                    }}
                >
                    <Text style={{ fontWeight: '400', color: 'gray' }}>Reply</Text>
                </TouchableWithoutFeedback>
            </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
            <Text style={{ position: 'absolute', right: 18, top: 3, fontSize: 12, color: props.liked.includes(props.comment_id) ? "#782F40" : "gray", }}>{props.likes}</Text>
            <AntDesign
                name={props.liked.includes(props.comment_id) ? "heart" : "hearto"}
                size={16}
                color={props.liked.includes(props.comment_id) ? "#782F40" : "gray"}
                style={{ position: 'absolute', right: -5, top: 3, }}
                onPress={() => props.toggleLike(props.comment_id)}
            />
        </View>
    </View>
  );
};

export default CommentBar;