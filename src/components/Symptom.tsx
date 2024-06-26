import React, { useState } from 'react'
import{ StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import Checkbox from "expo-checkbox";

import colors from '../styles/colors'
import fonts from '../styles/fonts'


interface SymptopmProps{
    title: string;
    parentHandleSelection: (title: string)=>void;
}

export function Symptom({
    title,
    parentHandleSelection
    }: SymptopmProps){

    const[isSelected, setIsSelected] = useState(false);

    function handleSelected(){
        setIsSelected(!isSelected);
        parentHandleSelection(title)
    }
    return(
        <View
            accessible={true}
            accessibilityLabel="Caixa de seleção. Marque para selecionar o sintoma" 
            style={[
                    styles.inputField,
                    (isSelected) && 
                    {borderColor: colors.blue}
                ]}
        >
            <Text style={styles.label}>{title}</Text>
            <Checkbox style={styles.checkbox}
                value={isSelected}
                onValueChange={handleSelected}
                // boxType= 'circle'
                // onCheckColor= {colors.green}
                color={colors.green}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: colors.gray,
        padding: 10
        
    },
    label:{
        fontFamily: fonts.generic,
        
    },
    checkbox:{
        
    }
})