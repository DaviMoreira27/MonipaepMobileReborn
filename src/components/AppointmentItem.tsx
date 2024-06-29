// AppointmentItem.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

const AppointmentItem = ({ appointment, onPress }) => {
  return (
    <View style={styles.consulta}>
      <Text style={[styles.infos, styles.infosTypo]}>Próxima Consulta</Text>
      <Text style={[styles.sintomas, styles.infosTypo]}>
        <Text style={styles.infosTypo1}>Local:</Text>
        <Text style={styles.rDrJoo}>{` ${appointment.local}`}</Text>
      </Text>
      <Text style={[styles.atualizar, styles.atualizarLayout]}>
        <Text style={styles.infosTypo1}>{`Médico(a):  `}</Text>
        <Text style={styles.rDrJoo}>{appointment.doctor}</Text>
      </Text>
      <Text style={[styles.atualizar1, styles.atualizarLayout]}>
        <Text style={styles.infosTypo1}>{`Data da Consulta:  `}</Text>
        <Text style={styles.rDrJoo}>{appointment.dateConsulta}</Text>
      </Text>
      <Text style={[styles.atualizar2, styles.atualizarLayout]}>
        <Text style={styles.titleTypo}>{`Data do Lembrete:  `}</Text>
        <Text style={styles.text1}>{appointment.dateLembrete}</Text>
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => onPress(appointment)}>
        <Text style={styles.buttonText}>Alterar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  consulta: {
    height: 245,
    width: 360,
    overflow: "hidden",
  },
  infosTypo: {
    color: colors.black,
    lineHeight: 19,
    textAlign: "left",
    position: "absolute",
    fontWeight: "bold",
  },
  infos: {
    top: 14,
    left: 37,
    width: 306,
    height: 69,
    textAlign: "left",
    fontFamily: fonts.generic,
    fontWeight: "500",
  },
  infosTypo1: {
    fontFamily: fonts.generic,
    fontWeight: "bold",
  },
  rDrJoo: {
    fontFamily: fonts.generic,
  },
  sintomas: {
    top: 40,
    width: 312,
    height: 111,
    left: 10,
    textAlign: "left",
  },
  atualizar: {
    top: 108,
    left: 11,
    height: 74,
  },
  atualizar1: {
    top: 139,
    height: 71,
    left: 10,
  },
  titleTypo: {
    fontFamily: fonts.generic,
    fontWeight: "bold",
  },
  text1: {
    fontFamily: fonts.generic,
  },
  atualizar2: {
    top: 167,
    height: 70,
    left: 10,
  },
  atualizarLayout: {
    width: 332,
    textAlign: "left",
    color: colors.black,
    lineHeight: 19,
    position: "absolute",
  },
  button: {
    marginTop: 200,
    backgroundColor: colors.green,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
    left: 25
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.generic,
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default AppointmentItem;
