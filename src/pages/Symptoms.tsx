import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Alert,
  Modal,
  TouchableOpacity
} from "react-native";
import {
  GreenButton,
  HeaderSimple,
  SafeAreaView,
  Symptom,
} from "../components";
import  Menu  from "../components/Menu";
import { useAuth } from "../contexts/auth.context";
import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface SymptomsProps {
  symptom: string;
}

export function Symptoms() {
  const { user, refreshToken, token } = useAuth();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchFilled, setIsSearchFilled] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [symptoms, setSymptoms] = useState<SymptomsProps[]>([]);
  const searchRef = useRef(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchSymptoms() {
      const response = await api.get("/symptom", {
        params: { symptom: search },
      });
      setSymptoms(response.data.symptoms);
    }
    fetchSymptoms();
  }, [search]);

//   function handleProfile() {
//     navigation.navigate("Profile");
//   }

  // Function to open the drawer
  function openMenu() {
    setMenuVisible(true);
  }

  // Function to close the drawer
  function closeMenu() {
    setMenuVisible(false);
  }

  //Functions handle for Search
  function handleInputSearchBlur() {
    setIsSearchFocused(false);
    setIsSearchFilled(!!search);
  }

  function handleInputSearchFocus() {
    setIsSearchFocused(true);
  }

  function handleInputSearchChange(value: string) {
    setIsSearchFilled(!!value);
    setSearch(value);
  }

  function handleSeach() {
    //console.log(search)
  }

  function handleSymptomSelection(title: string) {
    if (selectedSymptoms.includes(title)) {
      setSelectedSymptoms(
        selectedSymptoms.filter((symptom) => {
          return symptom != title;
        })
      );
    } else {
      setSelectedSymptoms([...selectedSymptoms, title]);
    }
  }

  async function handleSymptom() {
    try {
      await api.post("/symptomoccurrenceSeveral", {
        patient_id: user?.id,
        symptoms: selectedSymptoms,
      });
      Alert.alert(
        "Atualização concluida",
        `Sintomas cadastrados: ${selectedSymptoms}`,
        [
          {
            text: "Ok",
            onPress: () => {},
          },
        ]
      );
      console.log("Sintomas submetidos");
    } catch (error) {
      Alert.alert(
        "Erro na atualização de sintomas",
        `${error.response.data.message}`,
        [
          {
            text: "Ok",
            onPress: () => {},
          },
        ]
      );
      console.log(error.response.data.message);
    }
  }

  return (
    <SafeAreaView accessible={true} style={styles.safeArea}>
      <HeaderSimple titleScreen="Atualizar Sintomas" />
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
        <View
          style={[
            styles.search,
            (isSearchFocused || isSearchFilled) && { borderColor: colors.blue },
          ]}
        >
          <TextInput
            accessible={true}
            placeholder="Digite um sintoma"
            style={styles.textSerch}
            value={search}
            onBlur={handleInputSearchBlur}
            onFocus={handleInputSearchFocus}
            onChangeText={handleInputSearchChange}
          />
        </View>
        <View style={styles.symptomsList}>
          <FlatList
            data={symptoms}
            keyExtractor={(item: { symptom: any }) => String(item.symptom)}
            renderItem={({ item }) => (
              <Symptom
                parentHandleSelection={handleSymptomSelection}
                title={item.symptom}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <GreenButton
          accessibilityLabel="Botão. Clique para ir para a página de atualizar sintomas"
          title="Atualizar Sintomas"
          onPress={handleSymptom}
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
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
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
  search: {
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: colors.gray_light1,
    borderColor: colors.black,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
  },
  textSerch: {
    color: colors.gray_dark2,
    width: "70%",
    fontFamily: fonts.generic,
    fontSize: 16,
  },
  Icon: {
    padding: 10,
  },
  symptomsList: {
    width: Dimensions.get("window").width * 0.8,
    paddingTop: 20,
    justifyContent: "center",
    flex: 1,
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
});
