import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ButtonGroup } from '@rneui/themed';
import SearchBar from '../SearchBar.js';
import { useColorSchemeContext } from '../ColorSchemeContext.js';
import RoundedButton from '../cards/RoundedButton.js';
import { getIsBookmarked } from '../cards/EventCard.js';
import Card from '../cards/EventCard.js';
import { GetSaved } from '../APIUse.js';
import NewButton from '../cards/NewButton.js'

import { getURL } from '../../AxiosService.js';
import { Button } from '@rneui/base';

const Home = ({route}) => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext()
  const filters = [
    { id: 0, type: 'All' },
    { id: 1, type: 'Club' },
    { id: 2, type: 'Movie' },
    { id: 3, type: 'University' },
  ];

  const data = [     
    { id: "0", title: 'Event 1', club: 'Club 1', type: 3, startdate: new Date('2024-01-24T10:30:00'), enddate: new Date('2024-01-22T12:30:00'), interested: 42, isBookmarked: 0, },
    { id: "1", title: 'Event 2', club: 'Club 2', type: 1, startDate: new Date('2024-01-24T11:30:00'), endDate: new Date('2024-01-26T18:30:00'), interested: 2245, isBookmarked: 0, },
    { id: "2", title: 'Event 3', club: 'Club 3', type: 2, startDate: new Date('2024-01-21T10:45:00'), endDate: new Date('2024-01-22T12:30:00'), interested: 1632 , isBookmarked: 0,},
    { id: "3", title: 'Event 4', club: 'Club 4', type: 3, startDate: new Date('2024-01-28T22:30:00'), endDate: new Date('2024-01-29T1:00:00'), interested: 4253, isBookmarked: 0, },
    { id: "4", title: 'Event 5', club: 'Club 5', type: 1, startDate: new Date('2024-01-24T10:30:00'), endDate: new Date('2024-01-24T12:15:00'), interested: 165, isBookmarked: 0, },
    { id: "5", title: 'Event 6', club: 'Club 6', type: 2, startDate: new Date('2023-01-24T11:30:00'), endDate: new Date('2024-01-25T12:30:00'), interested: 4332, isBookmarked: 0, },
    { id: "6", title: 'Event 7', club: 'Club 7', type: 2, startDate: new Date('2024-01-24T10:30:00'), endDate: new Date('2024-01-25T12:30:00'), interested: 9876 , isBookmarked: 0,},

  ];

  const ButtonData = [
    { id: 1, title: 'Popular' },
    { id: 2, title: 'Chronological' },
    { id: 3, title: 'Followed' },
  ];

  const originalData = [...data]; // Make a copy of the original data


function sortByInterestedDescending(data) {
  return [...data].sort((a, b) => b.interested - a.interested); // sort without alterting data
}

function sortByDateRecent(data) {
  return [...data].sort((a, b) => b.startDate - a.startDate);
}

const [DataToUse,ChangeData] = useState(data)

const sortedRecentData = sortByDateRecent([...data]);

const sortedDescendingData = sortByInterestedDescending([...data]); // Pass a copy of the original data to the function

  // Search bar consts
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  // Dropdown filter consts
  const [dropdownType, setdropdownType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  // Filter button consts
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const {title, dbLink} = route.params || {title: "All Events", dbLink: "ALL"}
  const eventScreenName = title === undefined ? "Title Here" : title;     // Define a defualt in case alternative title was not passed
  console.log(eventScreenName)

  function GetAllEventData()                                 //ROUTE MUST LOOK LIKE THIS 
  {
    const response = axios.get(getURL() + '/api/' + dbLink + '/events')
      .then(response => {                    //Error Catching
        console.log("Get Request Succesful")
        return response.data;})
      .catch(error => {
        console.error("Get Request Failed", error)
      })
  }
  const [likedInformation, SetLiked] = useState(null)
  const [loading, setLoading] = useState(true);

   useEffect(() => {             //all of the cards will recieve the same "liked" information file
        async function fetchData() {
          setLoading(true)
          SetLiked(await GetSaved())
          setLoading(false)  
        }
        fetchData()
  }, []);


  const renderItem = ({ item }) => {
    const isMatch = searchPhrase === "" ||
    item.title.toUpperCase().includes(searchPhrase.toUpperCase()) ||
    item.club.toUpperCase().includes(searchPhrase.toUpperCase());
  
    if (isMatch) {
      if(!loading)
      {
       console.log(likedInformation)
       const found = likedInformation.find((element) => element === item.id.toString())
   
       console.log(found)
       return (<Card id = {item.id} title={item.title} club={item.club} type={item.type} 
         startDate={new Date(item.startdate)} endDate={new Date(item.enddate)} interested={item.interested} 
         SizePerc={.43} UserLiked={found === undefined ? false : true}/>);
      }                             //LikedInformation will not be stored in a seperate table    
     }                             //if the id is in saved table, the favorited will be on 
 
     return null;
  };


  const [activeButton, setActiveButton] = useState(null);

  const handleButtonPress = (id) => {
    setActiveButton(id);
  };

  const keysForTesting = ['Test', 'music_festival', 'test2'] 
  //const [jsonifiedKeys, ChangeKeys] = useState([{id: 10, Key: 'INITIAL STATE'},{id: 20, Key: 'INITIAL STATE'}]);
  const [loadingKeys, keyLoadingStateChange] = useState(true);
  let jsonifiedKeys = []
  
  useEffect(() => {
    console.log('useffect ran')
    keyLoadingStateChange(true)
    function ReFormatKeys()
    {
      console.log("Inreformat Keys")
    const newKeys = {};
    for (let i = 0; i < keysForTesting.length; i++) {
      newKeys[i] = { id: i, Key: keysForTesting[i] };
    }
    console.log(newKeys)
    jsonifiedKeys = newKeys
    keyLoadingStateChange(false);
    }
    ReFormatKeys()
    console.log(jsonifiedKeys)
  }, []);


  const renderButton = (item) => {
    console.log('enter')
    console.log(JSON.stringify(item))
    console.log("Button Item= " + item)
    if(!loadingKeys)
    {
    return (
      <RoundedButton
      Title={item.item}
      Key={item.item}
      ChangeDataFunction={ChangeData}


    />
    )
    }
    return null;
  };
      
  return (
    <View style={colorScheme === 'dark' ? styles.darkContainer : styles.container}>
        <Text style = {[styles.Title, colorScheme === 'dark' && styles.darkText]}>{eventScreenName}</Text>
        
      <View style={[styles.topContainer, colorScheme === 'dark' && styles.darkContainer]}>
        <View style={styles.searchstyle}>

        <SearchBar
        
          dropdownType={dropdownType}
          setdropdownType={setdropdownType}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList           // Flatlist for the 3 buttons
        data={keysForTesting}
        renderItem={renderButton}
        keyExtractor={item => item}
        horizontal
        contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'center', flexGrow: 1 }}
      />
    </View>
      </View >
      
      <FlatList
        data={DataToUse}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={() => <Text style={[styles.title, colorScheme === 'dark' && styles.darkText]}>DISCOVER EVENTS</Text>}
        ListEmptyComponent={() => <Text style={{}}>NO MATCHES FOUND</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 12,
    backgroundColor: 'white',
    fontFamily: 'Arial',
  },
  darkContainer: {
    flex: 12,
    backgroundColor: '#121212',
    fontFamily: 'Arial',
  },
  darkText: {
    color: '#FFFFFF',
    
  },
  Title:
  {
    paddingTop: 10,
    fontSize: 40,
    fontWeight: '600',
    alignSelf: 'center',
    fontFamily: 'Times New Roman',
  },
  topContainer: {
    height: 95,
    backgroundColor: 'white',
    shadowColor: 'rgba(60,60,67, 0.29)',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
    
  },
  searchContainer: {
    height: 40,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBox: {
    width: 300,
    height: 35,
    backgroundColor: '#D9D9D9',
    borderRadius: 18,
  },
  searchInput: {
    fontSize: 16,
    color: '#3C3C4399',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 35,
    marginVertical: 14,
    marginTop: 15,
    fontFamily: 'Times New Roman',
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginBottom: 0,
  },
  button: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    
  },
  searchstyle: {
    alignItems: 'center',
  },
});

export default Home;