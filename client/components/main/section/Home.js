import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ButtonGroup } from '@rneui/themed';
import SearchBar from '../SearchBar.js';
import { useColorSchemeContext } from '../ColorSchemeContext.js';
import RoundedButton from '../cards/RoundedButton.js';
import { getIsBookmarked } from '../cards/EventCard.js';
import Card from '../cards/EventCard.js';
import { GetSaved } from '../APIUse.js';
import { GetTwentyEvents } from '../APIUse.js';
import NewButton from '../cards/NewButton.js'

import { getURL } from '../../AxiosService.js';
import { Button } from '@rneui/base';

const Home = ({ route }) => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext()
  const filters = [
    { id: 0, type: 'All' },
    { id: 1, type: 'Club' },
    { id: 2, type: 'Movie' },
    { id: 3, type: 'University' },
  ];

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [endReached, setEndReached] = useState(false);
  const flatListRef = useRef(null);

  const data = [
    { id: "0", title: 'Event 1', club: 'Club 1', type: 3, startdate: new Date('2024-01-24T10:30:00'), enddate: new Date('2024-01-22T12:30:00'), interested: 42, isBookmarked: 0, },
    { id: "1", title: 'Event 2', club: 'Club 2', type: 1, startDate: new Date('2024-01-24T11:30:00'), endDate: new Date('2024-01-26T18:30:00'), interested: 2245, isBookmarked: 0, },
    { id: "2", title: 'Event 3', club: 'Club 3', type: 2, startDate: new Date('2024-01-21T10:45:00'), endDate: new Date('2024-01-22T12:30:00'), interested: 1632, isBookmarked: 0, },
    { id: "3", title: 'Event 4', club: 'Club 4', type: 3, startDate: new Date('2024-01-28T22:30:00'), endDate: new Date('2024-01-29T1:00:00'), interested: 4253, isBookmarked: 0, },
    { id: "4", title: 'Event 5', club: 'Club 5', type: 1, startDate: new Date('2024-01-24T10:30:00'), endDate: new Date('2024-01-24T12:15:00'), interested: 165, isBookmarked: 0, },
    { id: "5", title: 'Event 6', club: 'Club 6', type: 2, startDate: new Date('2023-01-24T11:30:00'), endDate: new Date('2024-01-25T12:30:00'), interested: 4332, isBookmarked: 0, },
    { id: "6", title: 'Event 7', club: 'Club 7', type: 2, startDate: new Date('2024-01-24T10:30:00'), endDate: new Date('2024-01-25T12:30:00'), interested: 9876, isBookmarked: 0, },

  ];

  const ButtonData = [
    { id: 1, title: 'Popular' },
    { id: 2, title: 'Chronological' },
    { id: 3, title: 'Followed' },
  ];

  const today = new Date();          //Gets todays date

  const originalData = [...data]; // Make a copy of the original data

  function sortByInterestedDescending(data) {
    return [...data].sort((a, b) => b.interested - a.interested); // sort without alterting data
  }

  function sortByDateRecent(data) {
    return [...data].sort((a, b) => b.startDate - a.startDate);
  }

  const [DataToUse, ChangeData] = useState(data)

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

  const { title, dbLink } = route.params || { title: "All Events", dbLink: ["ALL"] }
  console.log("dbLink " + dbLink)
  const eventScreenName = title === undefined ? "Title Here" : title;     // Define a defualt in case alternative title was not passed
  console.log(eventScreenName)
                     
  const keys = dbLink                 //Laads int database link for more clear naming
  const [activeButton, changeActiveButton] = useState(keys[0])
  const [loadActiveButton, changeButtonLoadState] = useState()

  function GetAllEventData()                                 //ROUTE MUST LOOK LIKE THIS 
  {
    const response = axios.get(getURL() + '/api/' + dbLink + '/events')
      .then(response => {                    //Error Catching
        console.log("Get Request Succesful")
        return response.data;
      })
      .catch(error => {
        console.error("Get Request Failed", error)
      })
  }
  const [likedInformation, SetLiked] = useState(null)
// const [loadingLiked, setLoadingLiked] = useState(null)
/*  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      SetLiked(await GetSaved());
      setLoading(false);
    }
    console.log("fetch data running")
    fetchData();
  }, []); */


  async function fetchData() {
    setLoading(true);
    SetLiked(await GetSaved());
    setLoading(false);
  }



  const [loadFetch, setFetchLoadState] = useState(false)
  const fetchEvents = async (forBookmark) => {
   // if (loading || endReached) return;
   console.log("Fetch Events, Before if")

   if( loadFetch || loading || endReached) return;
    setFetchLoadState(true);
    try {
      SetLiked(await GetSaved())
      console.log("reached try")
      console.log("active button " + activeButton)
      let data;
      if(forBookmark){

        data = await GetTwentyEvents(offset, limit, 'ALL');
        data = data.filter(event => likedInformation.includes(event.id.toString()));
     
      }
      else if(activeButton === 'today')
      {
        console.log("Todays Events")
        data = await GetTwentyEvents(offset, limit, activeButton);
        data.filter(event => event.getDate() === today.getDate && event.getMonth()
                                     === today.getMonth() && event.getFullYear() === today.getFullYear);

      }else{
      data = await GetTwentyEvents(offset, limit, activeButton)};
      console.log('data:', data);

      if (data.length === 0) {
        console.log("No more events to load.");
        setEndReached(true);
      } 

      else {
        setOffset(data.reduce((maxId, obj) => Math.max(maxId, obj.id), -Infinity));
        setEvents(prevEvents => [...prevEvents, ...data]);
    //    setOffset(prevOffset => prevOffset + limit);
        if (data.length < limit) {
          setEndReached(true);
        }
      }
    } 
    catch (error) {
      console.error('Error fetching events:', error);
    } 
    finally {
      setFetchLoadState(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setEndReached(false);
    setLimit(20);
    setEvents([]);
    fetchEvents(false);
  }, []);


  useEffect( () =>{
    console.log("Route Change")
    changeActiveButton(keys[0]) 
    
    console.log("linfo " + likedInformation)

    if (dbLink[0] === "Bookmark") {
      setEvents([])
      setOffset(0)
      fetchEvents(true)
      const filteredEvents = events.filter(event => likedInformation.includes(event.id.toString()));
      console.log("fe" + JSON.stringify(filteredEvents))

    //  setEvents(filteredEvents);
    }
    },[route])

    useEffect(() => {
      console.log("Liked Information" + likedInformation)
      setEvents([])
      setOffset(0);
      console.log("key" + activeButton);
      SetLiked(fetchData());
      fetchEvents();
      setEndReached(false);

    }, [activeButton])


  const handleEndReached = () => {
    if (!endReached) {
      fetchEvents();
    }
  };

  const renderItem = useCallback(({ item }) => {
    const isMatch = searchPhrase === "" ||
      item.title.toUpperCase().includes(searchPhrase.toUpperCase()) ||
      item.club.toUpperCase().includes(searchPhrase.toUpperCase());
  
    if (isMatch) {
      return (
        <Card 
          id={item.id}
          title={item.title}
          club={item.club}
          type={item.type}
          startDate={new Date(item.startdate)}
          endDate={new Date(item.enddate)}
          interested={item.interested}
          SizePerc={0.43}
          image_url={item.url}
          UserLiked={likedInformation && likedInformation.includes(item.id.toString())}
        />
      );
    }
    return null;
  }, [searchPhrase, likedInformation, loading]);

  const handleButtonPress = (id) => {
    setActiveButton(id);
  };

  //const keys = ['Test', 'music_festival', 'test2']  //For Testing
  console.log(dbLink)
  
  console.log("key" + keys)

  const changeColors = (name) => {
    changeActiveButton(name)
  }




  const renderButton = (item) => {
    console.log('enter')
    console.log("Button Item= " + JSON.stringify(item))
    return (
      <RoundedButton
        style={styles.button}
        title={item.item}
        Key={item.item}
        ChangeDataFunction={ChangeData}
        isActive={activeButton}
        onPress={() => changeActiveButton(item.item)}
        color={activeButton === item.item ? '#CEB888' : 'white'}
        opacity={keys.length === 1 ? 0 : 100}
      />
    )
  };

  return (
    <View style={colorScheme === 'dark' ? styles.darkContainer : styles.container}>
      <Text style={[styles.Title, colorScheme === 'dark' && styles.darkText]}>{eventScreenName}</Text>

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

        <View style={styles.row}>
          <FlatList           // Flatlist for the 3 buttons
            //      data={keys.length === 1 ? [] : keys}
            data={keys}
            renderItem={renderButton}
            keyExtractor={item => item}
            horizontal
            contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'center', flexGrow: 1 }}
          />
        </View>
      </View >

      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={() => <Text style={[styles.title, colorScheme === 'dark' && styles.darkText]}>DISCOVER EVENTS</Text>}
        ListEmptyComponent={() => <Text style={{}}>NO MATCHES FOUND</Text>}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator style={{ margin: 10 }} color="#0000ff" />}
        removeClippedSubviews={false}
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
