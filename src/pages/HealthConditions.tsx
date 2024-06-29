import React, { useState, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerLayout } from 'react-native-gesture-handler';
import { BlueButton, HeaderSimple, SafeAreaView } from '../components';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import ConditionCard from '../components/ConditionCard';
import SymptomCard from '../components/SymptomCard';
import { useNavigation } from "@react-navigation/native";
import Menu from '../components/Menu';

interface ConditionsProps {
  condition: string;
}

interface SymptomCardProps {
  symptom: string;
}

export function HealthConditions() {
  const navigation = useNavigation();
  const [conditions, setConditions] = useState<ConditionsProps[]>([
    { condition: 'Diabetes Tipo 2' },
    { condition: 'Alergia a Amendoim' }
  ]);
  const [symptoms, setSymptoms] = useState<SymptomCardProps[]>([
    { symptom: 'Febre alta e constante' },
    { symptom: 'Dor nas articulações' }
  ]);
  const drawerRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  function handleCondition() {
    navigation.navigate('ConditionInsert' as never);
  }

  // Function to open the drawer
  function openMenu() {
    setMenuVisible(true);
  }

  // Function to close the drawer
  function closeMenu() {
    setMenuVisible(false);
  }

  return (
      <SafeAreaView accessible={true} style={styles.safeArea}>
        <HeaderSimple titleScreen="Condições e Sintomas" />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.container}>
            <View style={styles.bodyUp} accessible={true}>
              <TouchableOpacity onPress={openMenu}>
              <MaterialIcons
                style={styles.icons}
                name="menu"
                size={24}
                color="black"
              />
              </TouchableOpacity>
              <View style={styles.textAPP} accessible={true}>
                <Text style={styles.appName}>MoniPaEp</Text>
              </View>
            </View>
            <View style={styles.conditionsContainer}>
              {conditions.map((item, index) => (
                <View key={index} style={styles.condition}>
                  <View style={[styles.hr, index === conditions.length - 1 && { marginBottom: 15 }]} />
                  <ConditionCard condition={item.condition} />
                  {index !== conditions.length && <View style={styles.hr} />}
                </View>
              ))}
            </View>
            <View style={styles.symptomsContainer}>
              {symptoms.map((item, index) => (
                <View key={index} style={styles.symptom}>
                  <View style={[styles.hr, index === symptoms.length - 1 && { marginBottom: 15 }]} />
                  <SymptomCard symptom={item.symptom} />
                  {index !== symptoms.length && <View style={styles.hr} />}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottom}>
          <BlueButton 
            accessibilityLabel="Botão. Clique para atualizar condições de saúde"
            title="Atualizar Registros"
            onPress={handleCondition}
          />
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
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    height: Dimensions.get('window').height * 0.15,
    justifyContent: 'center',
    paddingBottom: 15,
  },
  icons: {
    padding: 20,
  },
  appName: {
    fontFamily: fonts.appName,
    fontSize: 32,
    color: colors.blue,
  },
  textAPP: {
    alignItems: 'center',
  },
  hr: {
    borderBottomColor: colors.gray_light2,
    borderBottomWidth: 1.5,
    marginTop: 15,
    marginBottom: 15
  },
  bottom: {
    width: '100%',
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
  },
  conditionsContainer: {
    marginTop: Dimensions.get('window').height*0.09,
  },
  symptomsContainer: {
    marginTop: 0,
  },
});
