import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const FAQ = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

const FAQs = () => {
  renderSectionTitle = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };
  
  renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };
  
  renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const [activeSection, setActiveSection] = useState("");

  return (
    <ScrollView style={styles.container}>
        <View style={styles.midTextContainer}>
          <Text style={styles.title}>FAQ</Text>
        </View>
      
        <View style={styles.topTextContainer}>
          <Accordion
            sections={FAQ}
            activeSections={activeSection}
            renderSectionTitle={renderSectionTitle}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={setActiveSection}
          />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
  },
  topTextContainer: {
    marginRight: 16,
    flexDirection: 'column',
  },
  midTextContainer: {
    width: "100%",
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 24,
    fontWeight: 'italic',
    color: '#782f40',
  },
  answer: {
    fontSize: 16,
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 5,
    position: 'absolute', right: 0, top: 0,
    alignSelf: 'flex-end'
  },
});


export default FAQs;