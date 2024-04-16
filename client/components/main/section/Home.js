import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ButtonGroup } from '@rneui/themed';
import SearchBar from '../SearchBar.js';
import { useColorSchemeContext } from '../ColorSchemeContext.js';
import RoundedButton from '../cards/RoundedButton.js';
import { getIsBookmarked } from '../cards/EventCard.js';
import Card from '../cards/EventCard.js';
import { GetSaved } from '../APIUse.js';

import { getURL } from '../../AxiosService.js';

const Home = ({route}) => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext()
  const filters = [
    { id: 0, type: 'All' },
    { id: 1, type: 'Club' },
    { id: 2, type: 'Movie' },
    { id: 3, type: 'University' },
  ];

   data = [     
    { id: "0", title: 'Event 1', club: 'Club 1', type: 3, startdate: new Date('2024-01-24T10:30:00'), enddate: new Date('2024-01-22T12:30:00'), interested: 42, isBookmarked: 0, },
    { id: "1", title: 'Event 2', club: 'Club 2', type: 1, startDate: new Date('2024-01-24T11:30:00'), endDate: new Date('2024-01-26T18:30:00'), interested: 2245, isBookmarked: 0, },
    { id: "2", title: 'Event 3', club: 'Club 3', type: 2, startDate: new Date('2024-01-21T10:45:00'), endDate: new Date('2024-01-22T12:30:00'), interested: 1632 , isBookmarked: 0,},
    { id: "3", title: 'Event 4', club: 'Club 4', type: 3, startDate: new Date('2024-01-28T22:30:00'), endDate: new Date('2024-01-29T1:00:00'), interested: 4253, isBookmarked: 0, },
    { id: "4", title: 'Event 5', club: 'Club 5', type: 1, startDate: new Date('2024-01-24T10:30:00'), endDate: new Date('2024-01-24T12:15:00'), interested: 165, isBookmarked: 0, },
    { id: "5", title: 'Event 6', club: 'Club 6', type: 2, startDate: new Date('2023-01-24T11:30:00'), endDate: new Date('2024-01-25T12:30:00'), interested: 4332, isBookmarked: 0, },
    { id: "6", title: 'Event 7', club: 'Club 7', type: 2, startDate: new Date('2024-01-24T10:30:00'), endDate: new Date('2024-01-25T12:30:00'), interested: 9876 , isBookmarked: 0,},

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
      console.log(item.id)
      console.log(item.id in likedInformation)
  
      return <Card id = {item.id} title={item.title} club={item.club} type={item.type} 
        startDate={new Date(item.startdate)} endDate={new Date(item.enddate)} interested={item.interested} 
        SizePerc={.43} UserLiked={likedInformation.includes(item.id)? false: true}/>;
     }                             //LikedInformation will not be stored in a seperate table    
    }                             //if the id is in saved table, the favorited will be on 

    return null;
  };


  const [buttonOne, setButtonOne] = useState(0);
  const [buttonTwo, setButtonTwo] = useState(0);
  const [buttonThree, setButtonThree] = useState(0);
    

  const [activeButton, setActiveButton] = useState(null);
   const handlePress = (buttonIndex) => {
    // handle button press here
    if (activeButton != buttonIndex)
    setActiveButton(buttonIndex);
  else
  setActiveButton(0);
    
    if (buttonIndex == 1)
    {
      if (buttonOne == 0)
      {
      data = sortByInterestedDescending(data);
      //console.log('buttonOne was ', buttonOne);
      setButtonOne(1);
      //console.log('buttonOne is now ', buttonOne);
      }
      else
      {
        data = originalData;
        //console.log('buttonOne is 1 and now its 0');
        setButtonOne(0);
      }
    }

    if (buttonIndex == 2)
    {
      if (buttonTwo == 0)
      {
      data = sortByDateRecent(data);
      
      setButtonTwo(1);
      
      }
      else
      {
        data = originalData;
        
        setButtonTwo(0);
      }
    }
    
    if (buttonIndex == 3)
    {
      if (buttonThree == 0)
      {
      data = sortByDateRecent(data);
      
      setButtonThree(1);
      
      }
      else
      {
        data = originalData;
        
        setButtonThree(0);
      }
    }
    
  };

function getData() {
    if (buttonOne == 1)
    return DataToUse;
else if (buttonTwo == 1)
  return sortedRecentData;
else if (buttonThree == 1)
    return originalData;
else
return originalData;
}

  
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
        <View style={styles.button}> 
        <RoundedButton
        style={[styles.button, { }]}
        title="Popular"
        
        isActive={activeButton === 1}
        onPress={() => { handlePress(1)}}
        buttonStyle={{  }} // You can customize the button's background color here
        textStyle={{  }} // You can customize the text color here
        Key={'Test'}
        ChangeDataFunction={ChangeData}
      />
      <RoundedButton
      style={[styles.button, {  }]}
        title="Chronological" 
        isActive={activeButton === 2}
        onPress={() => handlePress(2)}
        buttonStyle={{   }} // You can customize the button's background color here
        textStyle={{  }} // You can customize the text color here
        Key={'music_festival'}
        ChangeDataFunction={ChangeData}
      />
      <RoundedButton
      style={[styles.button, { }]}
        title="Followed"
        isActive={activeButton === 3}
        onPress={() => handlePress(3)}
        buttonStyle={{  }} // You can customize the button's background color here
        textStyle={{  }} // You can customize the text color here
        Key={'test2'}
        ChangeDataFunction={ChangeData}
      />
      </View>
      </View>
      
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
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#FFFFFF',
  },
  Title:
  {
    paddingTop: 10,
    fontSize: 40,
    fontWeight: '600',
    alignSelf: 'center'
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