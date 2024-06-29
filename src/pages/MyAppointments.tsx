// MyAppointments.js
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert, // Importar ScrollView
} from "react-native";
import {
  GreenButton,
  HeaderSimple,
  SafeAreaView,
} from "../components";
import Menu from "../components/Menu";
import { useAuth } from "../contexts/auth.context";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import AppointmentItem from "../components/AppointmentItem"; 

export function MyAppointments() {
  const { user, refreshToken, token } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const openMenu = () => {
    setMenuVisible(true);
  }

  const closeMenu = () => {
    setMenuVisible(false);
  }

  const handleHome = () => {
    navigation.navigate("Home" as never);
  }

  const handleAppointmentChange = (appointment) => {
    Alert.alert(
      "Informações da Consulta",
      `Local: ${appointment.local}\nMédico(a): ${appointment.doctor}\nData da Consulta: ${appointment.dateConsulta}\nData do Lembrete: ${appointment.dateLembrete}`,
    );
  };

  const appointments = [
    {
      id: 1,
      local: "R. Dr. João Navarro Siquerolli, s/n - Parque Santa Felicia Jardim, São Carlos - SP, 13563-714",
      doctor: "Doutora Simone",
      dateConsulta: "12/05/2020",
      dateLembrete: "10/05",
    },
    {
      id: 2,
      local: "R. Dr. João Navarro Siquerolli, s/n - Parque Santa Felicia Jardim, São Carlos - SP, 13563-714",
      doctor: "Doutora Simone Cópia",
      dateConsulta: "13/05/2020",
      dateLembrete: "11/05",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderSimple titleScreen="Atualizar Sintomas" />
      <View style={styles.container}>
        <View style={styles.bodyUp}>
          <TouchableOpacity onPress={openMenu}>
            <MaterialIcons
              style={styles.icons}
              name="menu"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <View style={styles.textAPP}>
            <Text style={styles.appName}>MoniPaEp</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          {appointments.map((appointment, index) => (
            <View key={appointment.id}>
              <AppointmentItem
                appointment={appointment}
                onPress={handleAppointmentChange}
              />
              {index < appointments.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bottom}>
        <GreenButton
          accessibilityLabel="Botão de Cadastrar Consulta. Pressione para cadastrar uma nova consulta"
          title="Cadastrar Consulta"
          onPress={handleHome}
        />
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
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  bodyUp: {
    width: "100%",
    height: Dimensions.get("window").height * 0.15,
    justifyContent: "center",
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
    alignItems: "center",
  },
  bottom: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  greenButton: {
    width: Dimensions.get("window").width * 0.9,
  },

  scrollView: {
    flex: 1,
  },
  divider: {
    borderColor: colors.gray_light1,
    borderTopWidth: 1,
    marginVertical: 5,
  },
});
