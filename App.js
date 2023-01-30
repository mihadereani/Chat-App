import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
export default class HelloWorld extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ width: 50, height: 50, backgroundColor: 'blue' }}></View>
        <View style={{ flex: 1, backgroundColor: 'red' }}></View>
        <View
          style={{ width: 100, height: 200, backgroundColor: 'green' }}
        ></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  box1: {
    flex: 10,
    backgroundColor: 'blue',
  },
  box2: {
    flex: 120,
    backgroundColor: 'red',
  },
  box3: {
    flex: 50,
    backgroundColor: 'green',
  },
});
