import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const FAQs = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.midTextContainer}>
          <Text style={styles.title}>FAQ</Text>
          <Image
          source={require('../../assets/question.png')} // Provide the correct path to your image
          style={styles.image}
          />
        </View>
      
        <View style={styles.topTextContainer}>
          <Text style={styles.question}>
           {"\n"}Where is the ASLC located?
          </Text>
          <Text style= {styles.answer}> 942 Learning Way, Tallahassee, FL 32304</Text>
          <Text style={styles.question}>What are our hours of operation?</Text>
          <Text style= {styles.anaswer}> Monday – Thursday: 8am – 11pm{"\n"}Friday (or any Midnight movie date): 8am – 12am {"\n"}Saturday & Sunday: 12pm – 11pm</Text>
          <Text style = {styles.question}>Sample question?</Text>
          <Text style = {styles.answer}>More than 100 stealth egg attacks baffle one Euclid homeowner and police (photos and video) EUCLID, Ohio -- An 85-year-old Euclid man's home has become the target of mysterious egging attacks that began in March 2014 and haven't stopped. The continuous onslaught of eggs has baffled police, neighbors and local government officials who have tried and failed to identify the source of the attacks that have ruined the man's home and kept his family on edge. "The accuracy is phenomenal," Albert Clemens, Sr. said. "Because almost every time when it's nice weather and they launch five or six of these at a time, they almost invariably hit the front door." Clemens green two-story house sits on the corner of Wilmore Avenue and East 210th Street. He and his wife bought the home as newlyweds about 60 years ago. Though his wife has since passed away, Clemens still lives there with his 49-year-old daughter and 51-year-old son. The house has been pelted with eggs several times a week -- sometimes more than once a day -- for the past year. The attacks always happen after dark and last around 10 minutes each. The family has been awoken as late as 2 a.m. by what sounds like the crack of a gunshot against the aluminum siding or front door. Clemens and police believe the eggs are being launched from a block or two away. The siding on the front of Clemens' home is destroyed, splattered with dried egg residue that stripped off the paint. Other than a few rogue eggs that hit nearby homes, no other neighbors have been targeted. "Somebody is deeply, deeply angry at somebody in that household for some reason," Euclid Lt. Mitch Houser said. Winter offered a short respite for the family, as the egging became less frequent during the cold weather. But both Clemens and police anticipate the attacks picking back up as the snow and ice thaw. An unsolved mystery Euclid police have not taken the investigation lightly. They've spent a year doing undercover stakeouts, canvassing the neighborhood and even sending eggshells for testing. The department's entire community policing unit was dedicated to tracking down the eggers at one point. Officers respond quickly to every egging call at the home -- which is less than a mile from the police station. Both Clemens and detectives are at a dead end when it comes to suspects. Clemens had suspicions about a young man across the street who confronted him a couple years ago and asked him to stop calling police about suspicious activity in the neighborhood. Clemens said that he had started calling police more often as he noticed more crime -- mostly suspected drug activity. Another neighbor Clemens suspected was ruled out when officers saw him standing outside as an attack occurred in the presence of police. Investigators have taken several different approaches to nabbing the eggers, including installing a surveillance camera on the house. Detectives even collected some eggshell samples and tested them in a crime lab. The eggs were traced back to a local Amish farm, but the trail ended there. Clemens says the culprits either have access to a large supply of eggs or are stealing them from businesses that throw them out when they go bad. Detectives have followed this thread, visiting local restaurants and businesses asking about missing eggs. They've also tried collecting fingerprints from eggshells, but Houser said that's an impossible task. When an egg breaks, it releases proteins that destroy DNA. Officers have gone door to door questioning neighbors and handing out fliers. Nobody has come forward with any tips. "The person or people who are doing it have remained very tight-lipped apparently," Houser said. "I would imagine it would be hard to keep a secret of something that had been done hundreds of times and for nobody to step forward to talk about it." The guilty parties don't appear to be intimidated by police interest in the case. An officer last year was taking a report when a barrage of eggs was launched at the house. One hit him in the foot. Houser said he's never seen this level of vandalism in his 20 years of police work. It's frustrated the whole department, which has dedicated hundreds of hours toward solving the egging mystery. "The man hours put into that investigation were huge and one of the reasons it's so frustrating that we don't have somebody right now that we can criminally charge," Houser said. The culprits will face charges of felony vandalism and criminal damaging, Houser said. Additional charges could be tacked on if investigators find evidence that the attacks are a hate crime. The search continues Clemens is waiting until the perpetrators are caught before he repairs the tarnished siding. His insurance company is refusing to settle a claim until the guilty party is found. He said he used to clean up after each attack, but it became so frequent that he couldn't keep up. Police initially offered a $500 reward for information, but bumped it up to $1,000 after nobody came forward. That money is still up for grabs. "We're not going to let it go," Houser said. "We'll continue to put effort into it until we figure something out." Despite all the torment, Clemens said he'd never consider moving from his beloved home. "I like the neighborhood," Clemens said. "I like the city of Euclid. I would live and die in this house -- but it's been kind of a nightmare."
        </Text>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Center items vertically within the container
    marginBottom: 8, // Add some space below the midTextContainer
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