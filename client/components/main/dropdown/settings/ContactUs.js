import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView,  TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorSchemeContext } from '../../../main/ColorSchemeContext';

const ContactUs = () => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext();
        const navigation = useNavigation();
        
        const [activeIcon, setActiveIcon] = useState("Home");
    
        const handleIconPress = (iconName, navigateTo) => {
            setActiveIcon(iconName);
            navigation.navigate(navigateTo);
        };
    return (
      <ScrollView>
<SafeAreaView style={colorScheme === 'dark' && styles.darkContainer}>
<TouchableOpacity onPress={() => handleIconPress('Sett', 'Sett')} >
    <Text style={styles.back}> {'< Back'}  </Text>
    </TouchableOpacity>
    
    <Text style={styles.Title}>

    {'\n'}CONTACT INFORMATION{'\n'}
    
    </Text>

    <Text style={[styles.text, colorScheme === 'dark' && styles.darkText]}>
    (850) 644–6860{'\n'}
studentunion@fsu.edu{'\n'}{'\n'}
Reubin O'D. Askew Student Life Center{'\n'}942 Learning Way, Tallahassee, FL 32304

      </Text>

      <Text style={styles.Title}>
    {'\n'}STANDARD HOURS{'\n'}
    </Text>

    <Text style={[styles.text, colorScheme === 'dark' && styles.darkText]}>
Monday – Thursday: 8am – 11pm{'\n'}
Friday (or any Midnight movie date): 8am – 12am{'\n'}
Saturday & Sunday: 12pm – 11pm{'\n'} 
(850) 644–6860{'\n'}

      </Text>

      <SafeAreaView style={[styles.container, { marginLeft: -10 }]}>
      <Image
        source={require('../../../../assets/ASLC-Map.png')} // Path to your image file
        style={[{ width: 300, height: 300 }, styles.image]} // Adjust width and height as needed
      />
<Text style={styles.captionText}>The Student Life Cinema is located in the Askew Student Life Center at 942 Learning Way, 
in the southwest corner of the Florida State University campus. 
Parking is available on the east side of Woodward Ave and in Traditions Parking Garage.</Text>
</SafeAreaView>

</SafeAreaView>
</ScrollView>
        );
};

const styles = StyleSheet.create({
    Title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
       fontSize: 28, fontWeight: 'bold',
        marginLeft: 6, fontFamily: 'Times New Roman', color: '#782F40'
    },
    line: {
        height: 1,
        backgroundColor: 'black',
        width: '100%', // Adjust the width of the line as needed
      },
      text: {
        fontSize: 16, fontFamily: 'Arial', marginLeft: 6,
      },
      image: {
        resizeMode: 'contain', // Adjust the resizeMode property as needed
        justifyContent: 'center',
        alignItems: 'center',
      },
      back: {
        fontSize: 20,
        color: '#007AFF'
        , marginLeft: 5,
        fontWeight: 'bold',
        marginTop: 5,
      },
      darkContainer: {
        flex: 1,
        backgroundColor: '#121212',
      },
      darkText: {
        color: '#FFFFFF',
      },
      container: {
        flexDirection: 'row',
        paddingVertical: 1,
      },
      captionText: {
        fontSize: 16,
        fontFamily: 'Arial',
        flexShrink: 1,
        marginRight: 1,
      },

});

export default ContactUs;