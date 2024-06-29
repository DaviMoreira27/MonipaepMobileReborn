import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { FAQ, GreenButton, HeaderSimple, PatientStatus, SafeAreaView } from '../components';
import { ChatButton } from '../components/ChatButton';
import { useAuth } from '../contexts/auth.context';
import  Menu  from "../components/Menu";
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Home(){ 
    const navigation = useNavigation();
    const {user, refreshToken, token, signed, signOut} = useAuth();
    const [menuVisible, setMenuVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [redirected, setRedirected] = useState(false)
    
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

    function handleConditions() {
        navigation.navigate('HealthConditions' as never);
    }
    
    function handleFrequentQuestions() {
        navigation.navigate('FrequentQuestions' as never);
    }

    // Function to open the drawer
    function openMenu() {
        setMenuVisible(true);
    }

    // Function to close the drawer
    function closeMenu() {
        setMenuVisible(false);
    }

    const handleButtonClick = () => {
        if (!redirected) {
            setShowPopup(true);
        } else {
            //handleEncaminhamento
        }
        // Marque como redirecionado para a próxima vez
        setRedirected(true);
    };

    const closeModal = () => {
        setShowPopup(false);
        // Navegue para onde desejar após fechar o pop-up, exemplo fictício:
        // navigation.navigate('MinhaPágina');
    };

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
                <View
                    style={styles.top}
                    accessible={true} 
                >
                    <TouchableOpacity onPress={openMenu}>
                    <MaterialIcons
                    style={styles.icons}
                    name="menu"
                    size={24}
                    color="black"
                    />
                </TouchableOpacity>
                <ChatButton 
                    accessibilityLabel="Botão. Clique para visualizar mensagens do médico"
                    title="Mensagens do médico"
                    onPress={Data}
                />
                </View>
                <View>
                    <Modal
                        visible={showPopup}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setShowPopup(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Atualize os seus registros antes de obter um encaminhamento!</Text>
                                <TouchableOpacity  style={styles.button}
                                    accessibilityLabel="Botão para fechar o pop up"
                                    onPress={closeModal}
                                >
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View
                    accessible={true} 
                    style={styles.bottom} 
                >
                    <GreenButton 
                        accessibilityLabel="Botão. Clique para ir para a página de atualizar comorbidades"
                        title="Atualizar comorbidades"
                        onPress={handleConditions}
                    />
                </View>
                <View
                    accessible={true} 
                    style={styles.bottom} 
                >
                    <GreenButton 
                        accessibilityLabel="Botão. Clique para ir para a página de atualizar condições especiais"
                        title="Atualizar condições especiais"
                        onPress={handleConditions}
                    />
                </View>
                <View
                    accessible={true} 
                    style={styles.bottom} 
                >
                    <GreenButton 
                        accessibilityLabel="Botão. Clique para ir para a página de atualizar sintomas"
                        title="Atualizar sintomas"
                        onPress={handleConditions}
                    />
                </View>
                <View
                    accessible={true} 
                    style={styles.bottom} 
                >
                    <GreenButton 
                        accessibilityLabel="Botão. Clique para ir para a página de encaminhamento"
                        title="Obter encaminhamento"
                        onPress={handleButtonClick}
                    />
                </View>
                <View
                    accessible={true} 
                    style={styles.bottom} 
                >
                    <FAQ
                        accessible={true}
                        accessibilityLabel="Botão. Clique para ir para a página de perguntas frequentes"
                        title = "Perguntas Frequentes"
                        onPress={handleFrequentQuestions}
                    />
                </View>
            </View>

            {/* Modal for the Menu */}
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
        backgroundColor: colors.white,
        justifyContent: "center",
    },
    top: {
        flexDirection: 'row'
    },
    bodyUp:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    icons:{
        padding: 20
    },
    cardCarousel:{
        width: Dimensions.get('window').width * 0.88
    },
    imageCarousel:{
        height: 250,
        borderRadius: 8
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.88,
        height: 200,
        alignItems: 'center',
    },
    modalText:{
        fontSize: 15,
        fontFamily: fonts.generic, // Mantendo a fonte existente
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 25
    },
    button:{
        backgroundColor: colors.green,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.8,
        marginTop: 30
    },
    buttonText:{
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.warning,
        fontWeight: 'bold'
    },
    bottom: {
        display:'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center',
        marginTop:55
      },
    text:{
        fontSize: 20,
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