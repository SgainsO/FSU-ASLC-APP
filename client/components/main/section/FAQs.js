import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const FAQ = [
  {
    question: 'Where is the ASLC located?',
    answer: '942 Learning Way, Tallahassee, FL 32304',
  },
  {
    question: 'What are our hours of operation?',
    answer: 'Monday – Thursday: 8am – 11pm\nFriday (or any Midnight movie date): 8am – 12am \nSaturday & Sunday: 12pm – 11pm',
  },
];

const FAQs = () => {
  renderHeader = (section) => {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{section.question}</Text>
      </View>
    );
  };
  
  renderContent = (section) => {
    return (
      <View style={styles.answer}>
        <Text>{section.answer}</Text>
      </View>
    );
  };

  const [activeSection, setActiveSection] = useState("");

  return (
    <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>FAQ</Text>
        </View>
      
        <View style={styles.accordionContainer}>
          <Accordion
            expandMultiple={true}
            sections={FAQ}
            activeSections={activeSection}
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
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  headerContainer: {
    width: "100%",
    textAlign: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: '600',
  },
  accordionContainer: {
    marginTop: 16,
    marginHorizontal: 24,
    flexDirection: 'column',
  },
  questionContainer: {
    backgroundColor: 'white',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingLeft: 12,
  },
  question: {
    fontSize: 24,
    fontWeight: 'italic',
    color: '#782f40',
  },
  answer: {
    fontSize: 16,
  },
});


export default FAQs;