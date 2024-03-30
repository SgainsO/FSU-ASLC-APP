import { useColorSchemeContext } from '../../../main/ColorSchemeContext';
import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView,  TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


  
const Display = () => {
        
        const { colorScheme, toggleColorScheme } = useColorSchemeContext(); // Get colorScheme and toggleColorScheme from the context
        
          const handleToggle = () => {
            toggleColorScheme(); // Call toggleColorScheme to toggle dark mode
          };
        const navigation = useNavigation();
        
        const [activeIcon, setActiveIcon] = useState("Home");
    
        const handleIconPress = (iconName, navigateTo) => {
            setActiveIcon(iconName);
            navigation.navigate(navigateTo);
        };
    return (
<View style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
  
<TouchableOpacity onPress={() => handleIconPress('Sett', 'Sett')} >
    <Text style={styles.back}> {'< Back'}  </Text>
    </TouchableOpacity>
   <View style={styles.toggle}>
    <TouchableOpacity onPress={() => handleToggle()} >
    <Text style={[styles.toggle, colorScheme === 'dark' && styles.darkText]}> {'Toggle Dark Mode'}  </Text>
    </TouchableOpacity>

    
      <Text style={[styles.text, colorScheme === 'dark' && styles.darkText]}>
        
      </Text>
    
      </View>
</View>


        );
};

const styles = StyleSheet.create({
    Title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'black', fontSize: 40, fontWeight: 'bold',
        marginLeft: 5,
    },
    line: {
        height: 1,
        backgroundColor: 'black',
        width: '100%', // Adjust the width of the line as needed
      },
      image: {
        width: 100, // Set the width of the image
        height: 100, // Set the height of the image
        resizeMode: 'contain', // Adjust the resizeMode property as needed
        marginRight: 25,
        marginTop: 10,
      },
      word: {
        fontSize: 30,
        marginBottom: 5,
        marginLeft: 20,
        marginTop: 10,
      },
      back: {
        fontSize: 20,
        color: '#007AFF'
        , marginLeft: 5,
        fontWeight: 'bold',
        marginTop: 5,
      },
      toggle: {
        fontSize: 24,
        justifyContent: 'center', // Center vertically
        alignItems: 'center',
      },
      darkContainer: {
        flex: 1,
        backgroundColor: '#121212',
      },
      darkText: {
        color: '#FFFFFF',
      },
});

export default Display;