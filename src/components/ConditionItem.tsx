import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

const ConditionItem = ({ description, isChecked, onPress }) => {
  return (
    <Pressable style={styles.condition} onPress={onPress}>
      <Text style={styles.conditionText}>{description}</Text>
      <View style={styles.divider} />
      <Image
        style={styles.radioIcon}
        source={isChecked ? require('../assets/GreenRadio.png') : require('../assets/Radio.png')}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  condition: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  conditionText: {
    flex: 1,
    fontWeight: '500',
  },
  divider: {
    flex: 0.1,
    height: 1,
    marginHorizontal: 8,
  },
  radioIcon: {
    width: 16,
    height: 16,
  },
});

export default ConditionItem;
