import React, { useState } from 'react';
import { ScrollView, View, FlatList, Text, Dimensions } from 'react-native';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryStack, VictoryLegend } from "victory-native";

import AdminStat from '../cards/AdminStat';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AdminHome = () => {
  const containerStyle = {
    flex: 1,
    backgroundColor: '#D9D9D950',
    alignItems: 'center',
    paddingHorizontal: 15,
  };
  const chartStyle = {
    paddingTop: 10,
    paddingBottom: 20,
    marginHorizontal: 5,
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
  }
  
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [zoomDomain, setZoomDomain] = useState(null);

  const handleZoom = (domain) => {
    setSelectedDomain(domain);
  };

  const handleBrush = (domain) => {
    setZoomDomain(domain);
  };
  
  const statsData = [
    {
      id: 0,
      title: 'TOTAL USERS',
      stat: 1000,
      increase: 10,
    },
    {
      id: 1,
      title: 'TOTAL CLUBS',
      stat: 200,
      increase: 5,
    },
    {
      id: 2,
      title: 'TOTAL EVENTS',
      stat: 50,
      increase: 2,
    },
  ];

  const userData = [
    {x: new Date(2000, 1, 1), y: 125},
    {x: new Date(2000, 1, 2), y: 257},
    {x: new Date(2000, 1, 3), y: 345},
    {x: new Date(2000, 1, 4), y: 515},
    {x: new Date(2000, 1, 5), y: 132},
    {x: new Date(2000, 1, 6), y: 305},
    {x: new Date(2000, 1, 7), y: 270},
    {x: new Date(2000, 1, 8), y: 470}
  ];

  const clubData = [
    {x: new Date(2000, 1, 1), y: 25},
    {x: new Date(2000, 1, 2), y: 57},
    {x: new Date(2000, 1, 3), y: 145},
    {x: new Date(2000, 1, 4), y: 215},
    {x: new Date(2000, 1, 5), y: 232},
    {x: new Date(2000, 1, 6), y: 305},
    {x: new Date(2000, 1, 7), y: 370},
    {x: new Date(2000, 1, 8), y: 420}
  ];

  const eventData = [
    {x: new Date(2000, 1, 1), y: 225},
    {x: new Date(2000, 1, 2), y: 357},
    {x: new Date(2000, 1, 3), y: 445},
    {x: new Date(2000, 1, 4), y: 515},
    {x: new Date(2000, 1, 5), y: 632},
    {x: new Date(2000, 1, 6), y: 705},
    {x: new Date(2000, 1, 7), y: 870},
    {x: new Date(2000, 1, 8), y: 970}
  ];

  const renderItem = ({ item }) => {
      return <AdminStat
        title={item.title}
        stat={item.stat}
        increase={item.increase}
      />
  };

  return (
    <View style={containerStyle}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <FlatList
            data={statsData}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            horizontal={true}
            scrollEnabled={false}
          />
        </View>

        <View style={chartStyle}>
          <Text style={{fontSize: 18, fontWeight: 600, color: '#000', paddingLeft: 10, alignSelf:'flex-start' }}>Overview</Text>
          <VictoryChart
            width={width * 0.8}
            height={height * 0.4}
            scale={{x: "time"}}
            domainPadding={10}
          >
            <VictoryAxis
              tickFormat={(x) => `${new Date(x).getMonth()+1}/${new Date(x).getDate()}`}
              style={{
                tickLabels: { angle: 45, textAnchor: 'start', fontSize: 10 },
              }}
              tickCount={20}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(y) => (`${y}`)}
              style={{
                axis: {stroke: "#756f6a"},
                axisLabel: {fontSize: 20, padding: 30},
                grid: {
                  stroke: ({ tick }) => tick > 0 ? "grey" : "transparent",
                  strokeDasharray: "4, 5"
                },
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: 15, padding: 5}
              }}
              tickCount={10}
            />
            <VictoryStack
              offset={10}
              colorScale={"qualitative"}
            >
              <VictoryBar
                name="Users"
                style={{ data: { fill: "#c43a31" } }}
                data={userData}
              />
              <VictoryBar
                name="Clubs"
                style={{ data: { fill: "#4c72b0" } }}
                data={clubData}
              />
              <VictoryBar
                name="Events"
                style={{ data: { fill: "#55a868" } }}
                data={eventData}
              />
            </VictoryStack>

            <VictoryLegend
              x={55} y={10}
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: "white" }, title: {fontSize: 20 } }}
              data={[
                { name: "Users", symbol: { fill: "#c43a31" } },
                { name: "Clubs", symbol: { fill: "#4c72b0" } },
                { name: "Events", symbol: { fill: "#55a868" } }
              ]}
            />
          </VictoryChart>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminHome;
