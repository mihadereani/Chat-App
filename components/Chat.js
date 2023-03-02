import React, { Component } from 'react';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        avatar: '',
        name: '',
      },
      loggedInText: 'Please wait, you are getting logged in',
      image: null,
      location: null,
    };

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCroZxRzgAifRtXPxtOzzF03SAuhXdxExY',
        authDomain: 'chatapp-647e0.firebaseapp.com',
        projectId: 'chatapp-647e0',
        storageBucket: 'chatapp-647e0.appspot.com',
        messagingSenderId: '545610072431',
        appId: '1:545610072431:web:d63960cf1f06ea3d1de89a',
        measurementId: 'G-V8QYK48RJ2',
      });
    }

    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  async getMessages() {
    let messages = '';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      // console.log("called set state for messages", messages);
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    //Set the name property to be included in the navigation bar
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    this.getMessages();

    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');
      } else {
        this.setState({ isConnected: false });
        console.log('offline');
      }
    });

    this.referenceChatMessages = firebase.firestore().collection('messages');

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      //update user state with current user data
      this.setState({
        uid: user?.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
        },
        loggedInText: '',
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    //stop listening for changes
    this.unsubscribe();
    //stop listening to authentication
    this.authUnsubscribe();
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // appends messages so that new messages can be added without losing previous messages
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      }
    );
  }

  // save message to Firestore
  addMessage = () => {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  };

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    // if (!this.state.isConnected) return;
    const messages = [];
    //go through each document
    querySnapshot.forEach((doc) => {
      //get the queryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar || '',
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  };

  // disables chat input while offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  // Bubble customization
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#a5b2c2',
          },
          left: {
            backgroundColor: '#fff',
          },
        }}
        textStyle={{
          right: {
            color: '#090C08',
          },
        }}
        timeTextStyle={{
          right: {
            color: '#090C08',
          },
        }}
      />
    );
  }

  render() {
    // Set the color property as background color for the chat screen
    const { color } = this.props.route.params;
    return (
      <ActionSheetProvider>
        <View style={{ flex: 1, backgroundColor: color }}>
          <Text>{this.state.loggedInText}</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Welcome')}
          ></TouchableOpacity>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            renderActions={this.renderCustomActions.bind(this)}
            renderCustomView={this.renderCustomView.bind(this)}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: this.state.uid,
              avatar: 'https://placeimg.com/140/140/any',
            }}
            accessible={true}
            accessibilityLabel='Text message input field.'
            accessibilityHint='You can type your message here.  You can send your message by pressing the button on the right.'
          />
          {/* resolve screen display on older androids */}
          {Platform.OS === 'android' ? (
            <KeyboardAvoidingView behavior='height' />
          ) : null}
        </View>
      </ActionSheetProvider>
    );
  }
}
