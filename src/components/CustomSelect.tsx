// components/CustomSelect.tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Picker } from '@react-native-picker/picker';

interface CustomSelectProps {
  label: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  items: { label: string; value: string }[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, selectedValue, onValueChange, items }) => {
  return (
    <View style={styles.container}>
      {label !== "" && <Text style={styles.label}>{label}</Text>}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 20,
  },
  label: {
    fontFamily: fonts.generic,
    fontSize: 16,
    marginBottom: 5,
    color: colors.black,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.gray_light2,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default CustomSelect;
