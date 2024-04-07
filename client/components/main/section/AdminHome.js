import React, { useState } from 'react';
import { View, StyleSheet, Button, FlatList, Text, Dimensions } from 'react-native';
import { VictoryLine, VictoryChart, VictoryZoomContainer, VictoryBrushContainer, VictoryAxis } from "victory-native";

import AdminStat from '../cards/AdminStat';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AdminHome = () => {
  const containerStyle = {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  };
  
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
      stat: '1000',
      increase: '10',
    },
    {
      id: 1,
      title: 'TOTAL CLUBS',
      stat: '200',
      increase: '5',
    },
    {
      id: 2,
      title: 'TOTAL EVENTS',
      stat: '50',
      increase: '2',
    },
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
      <Text style={{fontSize: 16, fontWeight: '600', paddingLeft: 35, paddingBottom: 14, paddingTop: 5}}>ANALYTICS</Text>
      <View>
        <FlatList
          data={statsData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          horizontal={true}
          scrollEnabled={false}
        />
      </View>

      <VictoryChart
        width={width * 0.8}
        height={300}
        scale={{x: "time"}}
        containerComponent={
          <VictoryZoomContainer responsive={false}
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoom}
          />
        }
      >
        <VictoryLine
          style={{
            data: {stroke: "tomato"}
          }}
          data={[
            {x: new Date(1982, 1, 1), y: 125},
            {x: new Date(1987, 1, 1), y: 257},
            {x: new Date(1993, 1, 1), y: 345},
            {x: new Date(1997, 1, 1), y: 515},
            {x: new Date(2001, 1, 1), y: 132},
            {x: new Date(2005, 1, 1), y: 305},
            {x: new Date(2011, 1, 1), y: 270},
            {x: new Date(2015, 1, 1), y: 470}
          ]}
        />

      </VictoryChart>

      <VictoryChart
        width={width * 0.9}
        height={90}
        scale={{x: "time"}}
        padding={{top: 0, left: 50, right: 50, bottom: 30}}
        containerComponent={
          <VictoryBrushContainer responsive={false}
            brushDimension="x"
            brushDomain={selectedDomain}
            onBrushDomainChange={handleBrush}
          />
        }
      >
        <VictoryAxis
          tickValues={[
            new Date(1985, 1, 1),
            new Date(1990, 1, 1),
            new Date(1995, 1, 1),
            new Date(2000, 1, 1),
            new Date(2005, 1, 1),
            new Date(2010, 1, 1),
            new Date(2015, 1, 1)
          ]}
          tickFormat={(x) => new Date(x).getFullYear()}
        />
        <VictoryLine
          style={{
            data: {stroke: "tomato"}
          }}
          data={[
            {x: new Date(1982, 1, 1), y: 125},
            {x: new Date(1987, 1, 1), y: 257},
            {x: new Date(1993, 1, 1), y: 345},
            {x: new Date(1997, 1, 1), y: 515},
            {x: new Date(2001, 1, 1), y: 132},
            {x: new Date(2005, 1, 1), y: 305},
            {x: new Date(2011, 1, 1), y: 270},
            {x: new Date(2015, 1, 1), y: 470}
          ]}
        />
      </VictoryChart>
    </View>
  );
};

export default AdminHome;
