import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default class Start extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>App Title</Text>
        <View
          style={{ flex: 0.44, justifyContent: 'center', alignItems: 'center' }}
        >
          <TextInput
            style={styles.input}
            placeholder='useless placeholder'
            keyboardType='numeric'
          />
          <Button
            title='Start Chating'
            color='#841584'
            accessibilityLabel='Start Chating'
            onPress={() => this.props.navigation.navigate('Chat')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
