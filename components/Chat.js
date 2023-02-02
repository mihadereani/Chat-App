import React from 'react';
import { View, Text } from 'react-native';

export default class Screen2 extends React.Component {
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    let color = this.props.route.params.color;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color,
        }}
      >
        <Text>Hello Screen2!</Text>
      </View>
    );
  }
}
