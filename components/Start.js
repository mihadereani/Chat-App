import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StyleSheet,
} from 'react-native';

const backgroundColors = {
  black: { backgroundColor: '#090C08' },
  purple: { backgroundColor: '#474056' },
  grey: { backgroundColor: '#8A95A5' },
  green: { backgroundColor: '#B9C6AE' },
};

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  render() {
    const { black, purple, grey, green } = backgroundColors;

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/background-image.png')}
          style={styles.image}
        >
          <Text style={styles.title}>Chat App</Text>
          <View style={styles.box}>
            <TextInput
              style={[styles.input, styles.text]}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Your Name'
            />

            <View style={styles.colorWrapper}>
              <Text style={styles.text}>Choose your Background Color</Text>
              <View style={styles.colors}>
                <TouchableOpacity
                  style={[
                    styles.color,
                    black,
                    this.state.color === black.backgroundColor
                      ? styles.colorSelected
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: black.backgroundColor })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    purple,
                    this.state.color === purple.backgroundColor
                      ? styles.colorSelected
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: purple.backgroundColor })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    grey,
                    this.state.color === grey.backgroundColor
                      ? styles.colorSelected
                      : {},
                  ]}
                  onPress={() => this.setState({ color: grey.backgroundColor })}
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    green,
                    this.state.color === green.backgroundColor
                      ? styles.colorSelected
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: green.backgroundColor })
                  }
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              title='Start Chatting'
              onPress={() => this.props.navigation.navigate('Chat')}
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    resizeMode: 'cover',
  },

  title: {
    flex: 0.8,
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
    margintop: 20,
  },

  input: {
    height: 50,
    width: '88%',
    borderColor: 'gray',
    color: '#757083',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 20,
  },

  text: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',

    paddingLeft: 10,
  },

  button: {
    height: 50,
    width: '88%',
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },

  buttonText: {
    padding: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  color: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 40,
  },

  colorWrapper: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  colors: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
