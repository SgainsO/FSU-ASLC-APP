import { Text, View, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const AdminStat = (props) => {
  const cardStyle = {
    marginHorizontal: 5,
    marginVertical: 15,
    width: width * 0.28,
    height: 100,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0, 0.25)',
    shadowOpacity: 0,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <View style={cardStyle}>
        <View>
            <Text style={{ fontSize: 12, fontWeight: 600, color: '#455154' }}>{props.title}</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', paddingVertical: 5, }}>{props.stat}</Text>
            <Text style={{ fontSize: 12, color: '#455154' }}>
                <Text style={{ fontWeight: 600, color: '#22c55e' }}>+{props.increase}</Text> from last week
            </Text>
        </View>
    </View>
  );
};

export default AdminStat;