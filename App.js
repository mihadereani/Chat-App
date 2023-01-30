import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.blue}>Hello World!</Text>
      <Text style={styles.bigRed}>How are you?</Text>
      <Text style={[styles.blue, styles.bigRed]}>I'm feeling blue!</Text>
      <StatusBar style='auto' />
      <View style={styles.box}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  blue: {
    color: 'blue',
    fontWeight: '600',
  },

  bigRed: {
    color: 'red',
    fontSize: 30,
  },

  bigRedBold: {
    color: 'red',
    fontSize: 30,
    fontWeight: '600',
  },

  box: {
    width: 60,
    height: 60,
    backgroundColor: 'blue',
  },
});
