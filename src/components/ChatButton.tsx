import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ChatButtonProps extends TouchableOpacityProps {
  title: string;
}

export function ChatButton({ title, ...rest }: ChatButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF', 
        height: 40,
        borderRadius: 5,
        borderColor: colors.blue,
        borderWidth: 2, 
        justifyContent: "center", 
        paddingHorizontal: 5,
        width: 180,
        left: Dimensions.get('window').width*0.3,
        marginTop: 20,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.6,
        shadowRadius: 3, 
        elevation: 6, 
      },
      text: {
        fontSize: 10,
        color: '#000000', 
        fontFamily: fonts.generic, 
        fontWeight: 'bold',
      },      
});