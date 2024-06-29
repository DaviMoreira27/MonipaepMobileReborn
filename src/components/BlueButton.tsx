import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface BlueButtonProps extends TouchableOpacityProps {
  title: string;
}

export function BlueButton({ title, ...rest }: BlueButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
  },
  text: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fonts.generic,
  },
});
