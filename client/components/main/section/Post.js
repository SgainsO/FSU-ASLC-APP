import { View, FlatList, Text,  StyleSheet, } from 'react-native';
import { useColorSchemeContext } from '../ColorSchemeContext';
const Post = () => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext();

  return (
    <View style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
      <Text style={[styles.text, colorScheme === 'dark' && styles.darkText]}>
         Post 
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 12,
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#121212'
  },
  text: {
    fontSize: '60',
  },
  darkText: {
    color: '#FFFFFF',
  },
});
export default Post;