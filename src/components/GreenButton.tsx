import React from 'react'
import{ Dimensions, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'


interface GreenButtonProps extends TouchableOpacityProps{
    title: string;
}

export function GreenButton({title, ...rest}: GreenButtonProps){
    return(
        <TouchableOpacity style={styles.container}>
            <Text 
                style={styles.text}
                {...rest}    
            >
               {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.green,
        width: 300,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight:50
    },
    text:{
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.warning,
        fontWeight: 'bold'
    }
})