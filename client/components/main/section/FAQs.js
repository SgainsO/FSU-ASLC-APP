import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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
  {
    question: 'Sample question?',
    answer: 'More than 100 stealth egg attacks baffle one Euclid homeowner and police (photos and video) EUCLID, Ohio -- An 85-year-old Euclc4tq32iuynct4g3uxiyqmgh43octxghqn3otcxnqg3hotq3tcoy3qthco43qycxtq3irthcmgxqekchxtgmqeikutcqenghrklqeghnklfcgnhkldghnclfksghklsv'
  },
  {
    question: 'Sample question?',
    answer: 'More than 100 stealth egg attacks baffle one Euclid homeowner and police (photos and video) EUCLID, Ohio -- An 85-year-old Euclc4tq32iuynct4g3uxiyqmgh43octxghqn3otcxnqg3hotq3tcoy3qthco43qycxtq3irthcmgxqekchxtgmqeikutcqenghrklqeghnklfcgnhkldghnclfksghklsv'
  },
  {
    question: 'Sample question?',
    answer: 'More than 100 stealth egg attacks baffle one Euclid homeowner and police (photos and video) EUCLID, Ohio -- An 85-year-old Euclc4tq32iuynct4g3uxiyqmgh43octxghqn3otcxnqg3hotq3tcoy3qthco43qycxtq3irthcmgxqekchxtgmqeikutcqenghrklqeghnklfcgnhkldghnclfksghklsv'
  },
];

const FAQs = () => {
  renderHeader = (section, index, isActive) => {
    const dynamicBorderStyle = {
      ...styles.questionContainer,
      borderTopWidth: index === 0 ? 0 : 1,
    };

    return (
      <View style={dynamicBorderStyle}>
        <Text style={styles.question}>{section.question}</Text>
        <AntDesign name={ isActive ? 'up' : 'down' } size={16} color={ isActive ? 'black' : '#3C3C4399' } />
      </View>
    );
  };
  
  renderContent = (section) => {
    return (
      <View style={styles.answerContainer}>
        <Text style={styles.answer}>{section.answer}</Text>
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
    fontFamily: 'Times New Roman',
  },
  accordionContainer: {
    marginTop: 16,
    marginHorizontal: 24,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'black',
    overflow: 'hidden',
    background: 'transparent'
  },
  questionContainer: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderTopWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    color: '#782f40',
    fontWeight: '500',
    fontFamily: 'Times New Roman',
  },
  answerContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopWidth: 1,
  },
  answer: {
    fontSize: 14,
    fontFamily: 'Arial',
  },
});


export default FAQs;