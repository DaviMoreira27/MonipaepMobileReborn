import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions, Image,
    Modal,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FAQ, GreenButton, HeaderSimple, SafeAreaView } from '../components';
import { useAuth } from '../contexts/auth.context';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Menu from '../components/Menu';


export function Profile(){
    const navigation = useNavigation();
    const {user, refreshToken, token, signed, signOut} = useAuth()
    const [menuVisible, setMenuVisible] = useState(false);

    const closeMenu = () => {
        setMenuVisible(false);
    };

    const openMenu = () => {
        setMenuVisible(true);
    };

    
    const patientImg = require("../assets/profile.png")
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

    function handleInsertions(){
        navigation.navigate('ConditionInsert' as never)
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
                    onPress={openMenu} 
                />
                <View
                    style={styles.bodyUp}
                    accessible={true} 
                >
                <View
                    style={styles.bodyUp}
                    accessible={true} 
                >
                    
                    <Image
                        accessible={true} 
                        accessibilityLabel = "Imagem. Foto do usuário" 
                        source={patientImg}
                        style = {styles.image}
                    />
                
                </View>
                
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
                        title="Atualizar Condiões ou Sintomas"
                        onPress={handleInsertions}
                    />

                    <FAQ
                        accessible={true}
                        accessibilityLabel="Botão. Clique para ir para a página de perguntas frequentes"
                        title = "Perguntas Frequentes"
                        onPress={signOut}
                    />
                </View>
            </View>
            <Modal
                visible={menuVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeMenu}
            >
                <Menu onCloseMenu={closeMenu} />
            </Modal>

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
        padding: 20,
        marginBottom: 30
    },

    test:{
        fontSize: 40,
        color: colors.black,
        fontFamily: fonts.warning,
        padding: 20
    },
})