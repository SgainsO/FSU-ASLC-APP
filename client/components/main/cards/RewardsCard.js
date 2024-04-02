

import { Text, View, StyleSheet } from 'react-native';
import { useColorSchemeContext } from '../ColorSchemeContext';

const Card = ({ title, icon, rewardAmount}) => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext();
  const cardImageStyle = {
    marginHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 100,
    paddingHorizontal: 30,
    width: '45%',
    height: 250,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    shadowColor: 'rgba(0,0,0, 0.25)',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4
  };

  const overlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'left',
    borderBottomLeftRadius: 10, // Match the border radius of the parent View
    borderBottomRightRadius: 10,
  };

   return (
    <View style={[cardImageStyle]}>
      <View style={[overlayStyle, colorScheme === 'dark' && styles.darkContainer]}>
        <Text style={[{ fontSize: 16, fontWeight: 600 },colorScheme === 'dark' && styles.darkText]}>{title}</Text>
        <Text style={[{ fontSize: 16, color: '#455154' },colorScheme === 'dark' && styles.darkText]}>{icon} {rewardAmount}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#FFFFFF',
  },
});
export default Card;