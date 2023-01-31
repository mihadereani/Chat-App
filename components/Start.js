import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.box}>
          <TextInput
            style={[styles.input, styles.text]}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='Enter your username'
          />
          <TouchableOpacity
            style={styles.button}
            title='Start Chatting'
            onPress={() => this.props.navigation.navigate('Chat')}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
  },

  box: {
    backgroundColor: '#fff',
    width: '88%',
    alignItems: 'center',
    height: '44%',
    justifyContent: 'space-evenly',
  },

  input: {
    height: 50,
    width: '88%',
    borderColor: 'gray',
    color: '#757083',
    borderWidth: 2,
    borderRadius: 20,
  },

  text: {
    color: '#757083',
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
  },

  button: {
    height: 50,
    width: '50%',
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  buttonText: {
    padding: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
