import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GreenButton, HeaderSimple, SafeAreaView } from '../components';
import Menu from '../components/Menu';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { useAuth } from '../contexts/auth.context';

export function Profile() {
    

    const [cpf, setCpf] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [cep, setCep] = useState('');
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };

    const toggleLocation = () => {
        setLocationEnabled(!locationEnabled);
    };

    // Function to open the drawer
    function openMenu() {
        setMenuVisible(true);
    }

    // Function to close the drawer
    function closeMenu() {
        setMenuVisible(false);
    }

    function handleEdit(){
        
    }

    useState(() => {
      const {user, refreshToken, token, signed, signOut} = useAuth();

      const date = user.birthdate
      const date_str = user.birthdate.toString();
      console.log(date,date_str)


      const userDate = new Date(user.birthdate.toString())
      const day = String(userDate.getDate()).padStart(2, '0'); // Ensure two digits
      const month = String(userDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = userDate.getFullYear();

      setCpf(user.CPF)

      setDob(`${day}/${month}/${year}`)
      setPhone(user.phone)
      setEmail(user.email)
      setAddress(user.homeAddress)
      setNeighborhood(user.neighborhood)
      setNumber(String(user.houseNumber))
      setCep(user.neighborhood)  
    })

    return (
        <SafeAreaView accessible={true} style={styles.safeArea}>
          <ScrollView>
            <HeaderSimple titleScreen="Minha Conta" />
            <View style={styles.bodyUp} accessible={true}>
                <TouchableOpacity onPress={openMenu}>
                    <MaterialIcons
                        style={styles.menu}
                        name="menu"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.textAPP} accessible={true}>
                <Text style={styles.appName}>MoniPaEp</Text>
            </View>
            <View style={styles.bodyMid} accessible={true}>
                <View style={styles.fieldContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>CPF</Text>
                        <Text style={styles.textValue}>{cpf}</Text>
                        <MaterialIcons style={styles.icons} name="person-outline" size={24} color="black" />
                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Data de Nascimento</Text>
                        <Text style={styles.textValue}>{dob}</Text>
                        <MaterialCommunityIcons style={styles.icons} name="calendar-blank-outline" size={24} color="black" />
                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Celular</Text>
                        <Text style={styles.textValue}>{phone}</Text>
                        <MaterialCommunityIcons style={styles.icons} name="phone-outline" size={24} color="black" />
                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.textValue}>{email}</Text>
                        <MaterialCommunityIcons style={styles.icons} name="email-outline" size={24} color="black" />
                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>CEP</Text>
                        <Text style={styles.textValue}>{address}</Text>
                        <MaterialIcons style={styles.icons} name="person-pin-circle" size={24} color="black" />
                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Número</Text>
                        <Text style={styles.textValue}>{number}</Text>
                        <MaterialIcons style={styles.icons} name="person-pin-circle" size={24} color="black" />
                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Bairro</Text>
                        <Text style={styles.textValue}>{neighborhood}</Text>
                        <MaterialIcons style={styles.icons} name="person-pin-circle" size={24} color="black" />
                    </View>
                </View>
            </View>
            <View
                accessible={true} 
                style={styles.bottom} 
            >
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionLabel}>Permitir Notificações</Text>
                    <Switch
                        trackColor={{ false: colors.gray_light1, true: colors.green }}
                        thumbColor={notificationsEnabled ? colors.white : colors.gray_light1}
                        ios_backgroundColor={colors.gray_light1}
                        onValueChange={toggleNotifications}
                        value={notificationsEnabled}
                    />
                </View>
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionLabel}>Permitir Localização</Text>
                    <Switch
                        trackColor={{ false: colors.gray_light1, true: colors.green }}
                        thumbColor={locationEnabled ? colors.white : colors.gray_light1}
                        ios_backgroundColor={colors.gray_light1}
                        onValueChange={toggleLocation}
                        value={locationEnabled}
                    />
                </View>
                <GreenButton 
                    accessibilityLabel="Botão. Clique para alterar dados"
                    title="Alterar Dados"
                    onPress={handleEdit}
                />
            </View>
            <View>
                <Modal
                    isVisible={menuVisible}
                    animationIn="slideInLeft"
                    animationOut="slideOutLeft"
                    onBackdropPress={closeMenu}
                    backdropOpacity={0.3}
                    style={styles.modalLeft}
                >
                    <Menu onCloseMenu={closeMenu} />
                </Modal>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  condition: {
    marginVertical: -10,
  },
  symptom: {
    marginVertical: -10,
  },
  container: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  bodyUp: {
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  menu: {
    padding: 20,
  },
  appName: {
    fontWeight: 'bold',
    fontFamily: fonts.appName,
    fontSize: 32,
    color: colors.blue,
  },
  textAPP: {
    alignItems: 'center',
  },
  bottom: {
    width: '100%',
    // position: 'absolute',
    // bottom: 40,
    marginBottom : 20,
    alignItems: 'center',
    marginVertical: -20
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
  },
  bodyMid:{
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50
  },
  fieldContainer: {
    flexDirection: 'row', // ou 'column' dependendo da disposição desejada
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, // Espaçamento horizontal para o contêiner
    marginBottom: 20, // Espaçamento inferior para separar os campos
  },
  textContainer: {
    flex: 1, // Ocupa todo o espaço restante no contêiner
    flexDirection: 'row', // ou 'column' dependendo da disposição desejada
    height: 53, // Altura do campo de texto
    borderWidth: 2,
    borderColor: colors.gray_dark1,
    borderRadius: 8,
    paddingHorizontal: 10, // Espaçamento interno horizontal para o texto
    justifyContent: 'center', // Centraliza verticalmente o texto
  },
  label: {
    fontSize: 11,
    fontFamily: fonts.generic,
    marginRight: 10, // Espaçamento direito entre o rótulo e o campo
    flex: 1, // Permite que o rótulo ocupe o espaço disponível
    alignSelf: 'center', // Centraliza verticalmente dentro do contêiner
    color: colors.blue_dark1
  },
  textValue: {
    fontSize: 16,
    fontFamily: fonts.generic,
    color: '#333', // Cor do texto
    marginRight : 10,
    alignSelf: 'center', // Centraliza verticalmente dentro do contêiner
  },
  icons:{
    alignSelf: 'center',
  },
  permissionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 30,
    width: Dimensions.get('window').width * 0.88
  },
  permissionLabel: {
    fontSize: 15,
  },
  modalLeft: {
    justifyContent: 'flex-start',
    margin: 0,
},
});