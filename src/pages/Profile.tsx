import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions, Image,
    StyleSheet,
    Text,


    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FAQ, GreenButton, HeaderSimple, PatientStatus, SafeAreaView } from '../components';
import { useAuth } from '../contexts/auth.context';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function Profile(){
    const navigation = useNavigation();
    const {user, refreshToken, token, signed, signOut} = useAuth()
    
    const date = user?.lastUpdate;
    let dateString = '';
    let days = 0;
    
    if (typeof date === 'string') {
        dateString = date;
        const difference = Math.abs(Date.now() - Date.parse(dateString));
        days = Math.round(difference / (1000 * 3600 * 24));
    } else if (date instanceof Date) {
        dateString = date.toISOString();
        const difference = Math.abs(Date.now() - date.getTime());
        days = Math.round(difference / (1000 * 3600 * 24));
    }
    

    async function Data(){
        //const patientId = await getUser()
        //const token = await getAccessToken()
        //const refreshToken = await getRefreshToken()
        /*
        console.log("Exibindo UseContext")
        console.log(user)
        console.log(token)
        console.log(refreshToken)
        console.log("Signed: "+signed)
        */

        //navigation.navigate('Symptoms')
    }

    function handleConfig(){
        //navigation.navigate('Config')
    }

    return(
        <SafeAreaView  
            accessible={true}
            accessibilityLabel="Página de perfil"
        >
            <HeaderSimple
                titleScreen= {`Bem vindo(a) ${user?.name.split(' ')[0]}`}
            />
            <View
                style={styles.container}
                accessible={true} 
            >
                <MaterialIcons 
                    style={styles.icons} 
                    accessible={true} accessibilityLabel="Menu" 
                    name="menu" size={24} 
                    color="black"
                    onPress={handleConfig} 
                />
                <View
                    style={styles.bodyUp}
                    accessible={true} 
                >
                    
                    
                
                </View>

                <View
                    accessible={true} 
                    style={styles.bottom} 
                >

                    <Text
                        accessible={true}
                        allowFontScaling= {true}
                        style={styles.text}
                    >
                        Você está há {days} dias sem atualizar os seus sintomas!
                    </Text>
                    <GreenButton
                        
                        accessibilityLabel="Botão. Clique para ir para a página de atualizar sintomas"
                        title="Atualizar Sintomas"
                        onPress={Data}
                    />
                    
                    <Text 
                        accessible={true} 
                        style={styles.status}
                    >
                        Seu Status atual é:
                    </Text>
                    <PatientStatus
                        title={user?.status? user.status : ''}
                    />
                    <FAQ
                        accessible={true}
                        accessibilityLabel="Botão. Clique para ir para a página de perguntas frequentes"
                        title = "Perguntas Frequentes"
                        onPress={signOut}
                    />
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        
    },
    bodyUp:{
        alignItems: 'center',
    },
    icons:{
        padding: 20
    },
    image:{
        width: Dimensions.get('window').height * 0.30,
        height: Dimensions.get('window').height * 0.30,
        borderRadius: (Dimensions.get('window').height * 0.30)/2
    },
    bottom:{
        //marginTop: 40,
        width: Dimensions.get('window').width * 0.9,
        padding: 20,
        
        
    },
    text:{
        fontSize: 20,
        color: colors.black,
        fontFamily: fonts.warning,
        padding: 20
    },
    status:{
        fontSize: 16,
        color: colors.black,
        fontFamily: fonts.warning,
        padding: 20
    },
    test:{
        fontSize: 40,
        color: colors.black,
        fontFamily: fonts.warning,
        padding: 20
    }
})