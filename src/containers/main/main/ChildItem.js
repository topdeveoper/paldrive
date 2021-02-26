import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

export default (ChildItem = ({
  item,
  style,
  onPress,
  index,
  imageKey,
  local,
  height
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      >
      <Image
        style={[styles.image, style, {height: height}]}
        source={item[imageKey]}
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 230,
    resizeMode: 'stretch',
  },
});