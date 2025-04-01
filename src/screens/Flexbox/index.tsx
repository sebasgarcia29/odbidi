import React from 'react';
import { StyleSheet, View } from 'react-native';

const Flexbox = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1} />
      <View style={styles.box2} />
      <View style={styles.box3} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  box1: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
  box2: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    alignSelf: 'flex-end',
  },
  box3: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
  },
});

export default Flexbox;
