import React from 'react';
import {View, Text, ScrollView} from 'react-native';

function Row({children}) {
  return <View style={{flexDirection: 'row'}}>{children}</View>;
}

function Item({children}) {
  return (
    <View style={{width: 200, height: 30, marginHorizontal: 40}}>
      <Text>{children}</Text>
    </View>
  );
}

export function Summary({summary}) {
    console.log("render summary");
  return (
    <ScrollView style={{paddingTop: 20}}>
      <Row>
        {/*<Item>exp. #</Item>*/}
        <Item>logics count</Item>
        <Item>epics count</Item>
        <Item>duration</Item>
        <Item>stack size</Item>
      </Row>

      {summary.map(({config, results}, index) => (
        <Row key={index}>
          {/*<Item>{index}</Item>*/}
          <Item>{config.logicsCount}</Item>
          <Item>{config.epicsCount}</Item>
          <Item>{results.duration}</Item>
          <Item>{results.stackSize}</Item>
        </Row>
      ))}
    </ScrollView>
  );
}
