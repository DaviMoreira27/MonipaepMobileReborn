import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5, AntDesign, Octicons } from '@expo/vector-icons';
import colors from '../styles/colors';

const windowHeight = Dimensions.get('window').height;

interface MenuProps {
  onCloseMenu: () => void;
  independent?: boolean; // Propriedade para indicar se é independente
}

const Menu = ({ onCloseMenu, independent }: MenuProps) => {
  const navigation = useNavigation();

  function handleConditions() {
    onCloseMenu();
    navigation.navigate('HealthConditions' as never);
  }

  function handleHome() {
    onCloseMenu();
    navigation.navigate('Home' as never);
  }

  function handleMyAccount() {
    onCloseMenu();
    navigation.navigate('Symptoms' as never);
  }

  function handleFrequentQuestions() {
    onCloseMenu();
    navigation.navigate('FrequentQuestions' as never);
  }

  function handleMyAppointments() {
    onCloseMenu();
    navigation.navigate('MyAppointments' as never);
  }

  function handleConfig() {
    onCloseMenu();
    navigation.navigate('Config' as never);
  }

  function handleLogout() {
    onCloseMenu();
    navigation.navigate('Login' as never);
  }

  if (independent) {
    return (
      <Modal visible={true} transparent={true} animationType="slide">
        <View style={styles.menuContainer}>
          <View style={styles.menuContent}>
            <TouchableOpacity style={styles.menuItem} onPress={handleHome}>
              <MaterialCommunityIcons name="home-circle-outline" size={24} color="black" />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleMyAccount}>
              <Ionicons name="person-circle-outline" size={24} color="black" />
              <Text style={styles.menuText}>Minha Conta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleFrequentQuestions}>
              <Octicons name="question" size={24} color="black" />
              <Text style={styles.menuText}>Perguntas Frequentes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleConditions}>
              <FontAwesome5 name="history" size={24} color="black" />
              <Text style={styles.menuText}>Histórico de Sintomas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleMyAppointments}>
              <MaterialCommunityIcons name="calendar-heart" size={24} color="black" />
              <Text style={styles.menuText}>Minhas Consultas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Octicons name="gear" size={24} color="black" />
              <Text style={styles.menuText}>Configurações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItemSair} onPress={handleLogout}>
              <AntDesign name="logout" size={24} color="black" />
              <Text style={styles.menuText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuContent}>
        <TouchableOpacity style={styles.menuItem} onPress={handleHome}>
        <MaterialCommunityIcons name="home-circle-outline" size={24} color="black" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleMyAccount}>
          <Ionicons name="person-circle-outline" size={24} color="black" />
          <Text style={styles.menuText}>Minha Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleFrequentQuestions}>
          <Octicons name="question" size={24} color="black" />
          <Text style={styles.menuText}>Perguntas Frequentes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleConditions}>
          <FontAwesome5 name="history" size={24} color="black" />
          <Text style={styles.menuText}>Histórico de Sintomas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleMyAppointments}>
          <MaterialCommunityIcons name="calendar-heart" size={24} color="black" />
          <Text style={styles.menuText}>Minhas Consultas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleConfig}>
          <Octicons name="gear" size={24} color="black" />
          <Text style={styles.menuText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItemSair} onPress={handleLogout}>
          <AntDesign name="logout" size={24} color="black" />
          <Text style={styles.menuText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: '70%',
    backgroundColor: '#fff',
    marginTop: windowHeight * 0.068,
  },
  menuContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 40,
    width: '100%',
  },
  menuItem: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemImage: {
    width: 20,
    height: 20,
    margin: 5,
    marginRight: 10,
  },
  menuText: {
    color: 'rgba(0,0,0,1)',
    fontSize: 17,
    lineHeight: 17,
    fontFamily: 'Roboto',
    fontWeight: '500',
    marginLeft: 5,
  },
  menuItemSair: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '90%',
  },
});

export default Menu;
