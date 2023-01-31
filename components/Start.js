import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

export default class Screen1 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello Screen1!</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder='useless placeholder'
          keyboardType='numeric'
        />
        <Button
          onPress={onPressLearnMore}
          title='Learn More'
          color='#841584'
          accessibilityLabel='Learn more about this purple button'
        />
        <Button
          title='Go to Screen 2'
          onPress={() => this.props.navigation.navigate('Screen2')}
        />
      </View>
    );
  }
}
