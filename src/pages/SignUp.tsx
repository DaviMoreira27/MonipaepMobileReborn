import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { HeaderWithOutMenu, SafeAreaView } from "../components";
import { BlueButton } from "../components/BlueButton";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import * as signupHandler from "../handlers/signup.handler";
import {
  commonErrorAlert,
  commonSucessAlert,
} from "../messages/common.messages";
import { useAuth } from "../contexts/auth.context";
import {
  signUpErrorMessages,
  signUpSuccessMessage,
  signUpFailureMessage,
} from "../messages/signup.messages";

export function SignUp() {
  const { register, signed } = useAuth();

  //Seting useState and useRef to email
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [email, setEmail] = useState<string>();
  const emailRef = useRef(null);

  //Seting useState to Name
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isNameFilled, setIsNameFilled] = useState(false);
  const [name, setName] = useState<string>();

  //Seting useState and useRef to CPF
  const [isCPFFocused, setIsCPFFocused] = useState(false);
  const [isCPFFilled, setIsCPFFilled] = useState(false);
  const [cpf, setCPF] = useState<string>();
  const cpfRef = useRef(null);

  //Seting useState and useRef to Cellphone number
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isPhoneFilled, setIsPhoneFilled] = useState(false);
  const [phone, setPhone] = useState<string>();
  const phoneRef = useRef(null);

  //Seting useState and useRef to Date number
  const [isDateFocused, setIsDateFocused] = useState(false);
  const [isDateFilled, setIsDateFilled] = useState(false);
  const [date, setDate] = useState<string>();
  const dateRef = useRef(null);

  //Seting useState and useRef to HomeAddress
  const [isHomeAddressFocused, setIsHomeAddressFocused] = useState(false);
  const [isHomeAddressFilled, setIsHomeAddressFilled] = useState(false);
  const [homeAddress, setHomeAddress] = useState<string>();
  const homeAddressRef = useRef(null);

  //Seting useState and useRef to WorkAddress
  const [isWorkAddressFocused, setIsWorkAddressFocused] = useState(false);
  const [isWorkAddressFilled, setIsWorkAddressFilled] = useState(false);
  const [workAddress, setWorkAddress] = useState<string>();
  const workAddressRef = useRef(null);

  //Seting useSate for Health Plan
  const [isHealthPlanSelected, setHealthPlanSelection] = useState(false);

  //Seting useSate for Allow Message
  const [isAllowMessageSelected, setAllowMessageSelection] = useState(false);

  //Seting useState to gender
  const [gender, setGender] = useState<string>();
  //Seting useState and useRef to Password
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);
  const [password, setPassword] = useState<string>();
  const passwordRef = useRef(null);

  //Seting useState and useRef to Confirm Password
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [isConfirmPasswordFilled, setIsConfirmPasswordFilled] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const confirmPasswordRef = useRef(null);

  //Seting useState and useRef to Neighborhood
  const [isNeighborhoodFocused, setIsNeighborhoodFocused] = useState(false);
  const [isNeighborhoodFilled, setIsNeighborhoodFilled] = useState(false);
  const [neighborhood, setNeighborhood] = useState<string>();
  const neighborhoodRef = useRef(null);

  //Seting useState and useRef to HouseNumber
  const [isHouseNumberFocused, setIsHouseNumberFocused] = useState(false);
  const [isHouseNumberFilled, setIsHouseNumberFilled] = useState(false);
  const [houseNumber, setHouseNumber] = useState<string>();
  const houseNumberRef = useRef(null);

  //Creating const for navigation
  const navigation = useNavigation();

  function handleLogin() {
    navigation.navigate("Login" as never);
  }

  //Checks if all the inputs are valid
  async function Check() {
    // Check Email
    if (!signupHandler.validateEmail(String(email))) {
      commonErrorAlert(signUpErrorMessages.EMAIL_INVALID, () =>
        signupHandler.resetField(
          setEmail,
          setIsEmailFocused,
          setIsEmailFilled,
          ""
        )
      );
      return;
    }
    // Check Name
    if (!name) {
      commonErrorAlert(signUpErrorMessages.NAME_REQUIRED, () =>
        signupHandler.resetField(setName, setIsNameFocused, setIsNameFilled, "")
      );
      return;
    }

    // Check CPF
    if (!cpfRef.current?.isValid()) {
      commonErrorAlert(signUpErrorMessages.CPF_INVALID, () =>
        signupHandler.resetField(setCPF, setIsCPFFocused, setIsCPFFilled, "")
      );
      return;
    }
    // Check Phone number
    if (!phoneRef.current?.isValid()) {
      commonErrorAlert(signUpErrorMessages.PHONE_INVALID, () =>
        signupHandler.resetField(
          setPhone,
          setIsPhoneFocused,
          setIsPhoneFilled,
          ""
        )
      );
      return;
    }

    // Check birthday
    if (!dateRef.current?.isValid()) {
      commonErrorAlert(signUpErrorMessages.DATE_INVALID, () =>
        signupHandler.resetField(setDate, setIsDateFocused, setIsDateFilled, "")
      );
      return;
    }

    // Check CEP
    if (!homeAddressRef.current?.isValid()) {
      commonErrorAlert(signUpErrorMessages.CEP_INVALID, () =>
        signupHandler.resetField(
          setHomeAddress,
          setIsHomeAddressFocused,
          setIsHomeAddressFilled,
          ""
        )
      );
      return;
    }
    // Check Neighborhood
    if (!neighborhood) {
      commonErrorAlert(signUpErrorMessages.NEIGHBORHOOD_REQUIRED, () =>
        signupHandler.resetField(
          setNeighborhood,
          setIsNeighborhoodFocused,
          setIsNeighborhoodFilled,
          ""
        )
      );
      return;
    }

    // Check HouseNumber
    if (!houseNumber) {
      commonErrorAlert(signUpErrorMessages.HOUSE_NUMBER_REQUIRED, () =>
        signupHandler.resetField(
          setHouseNumber,
          setIsHouseNumberFocused,
          setIsHouseNumberFilled,
          "0"
        )
      );
      return;
    }

    if (!gender) {
      commonErrorAlert(signUpErrorMessages.GENDER_REQUIRED, () => {});
      return;
    }

    if (!signupHandler.validatePassword(String(password))) {
      commonErrorAlert(signUpErrorMessages.PASSWORD_INVALID, () =>
        signupHandler.resetPassword(
          setPassword,
          setIsPasswordFocused,
          setIsPasswordFilled,
          setConfirmPassword,
          setIsConfirmPasswordFocused,
          setIsConfirmPasswordFilled
        )
      );
      return;
    }

    //Submit data to database

    try {

      const response = await register(
        email,
        name,
        cpfRef.current.getRawValue(),
        phoneRef.current.getRawValue(),
        workAddress,
        homeAddress,
        neighborhood,
        houseNumber,
        isHealthPlanSelected,
        dateRef.current.getRawValue(),
        password,
        isAllowMessageSelected,
        gender
      );
      
      commonSucessAlert(signUpSuccessMessage, () => {});

      return response;
    } catch (error) {      
      
      commonErrorAlert(signUpFailureMessage, () => {});
    }
  }

  return (
    <SafeAreaView
      accessible={true}
      accessibilityLabel="Página de Cadastro, insira seus dados para criar uma conta"
    >
      <ScrollView scrollEnabled={true}>
        <HeaderWithOutMenu titleScreen="Cadastro" />
        <KeyboardAvoidingView
          style={styles.container}
          //behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.container}>
            <View style={styles.warning}>
              <Text style={styles.warningText}>* Obrigatório </Text>
            </View>
            <View
              style={[
                styles.inputField,
                (isEmailFocused || isEmailFilled) && {
                  borderColor: colors.blue,
                },
              ]}
            >
              <TextInput
                accessible={true}
                placeholder="Digite seu Email"
                style={styles.input}
                keyboardType="email-address"
                textContentType="emailAddress"
                value={email}
                ref={emailRef}
                onBlur={() =>
                  signupHandler.handleInputEmailBlur(
                    setIsEmailFocused,
                    setIsEmailFilled
                  )
                }
                onFocus={() =>
                  signupHandler.handleInputEmailFocus(setIsEmailFocused)
                }
                onChangeText={(text) =>
                  signupHandler.handleInputEmailChange(
                    text,
                    setIsEmailFilled,
                    setEmail
                  )
                }
              />

              <MaterialIcons
                name="email"
                size={24}
                color="gray"
                style={[
                  styles.Icon,
                  (isEmailFocused || isEmailFilled) && { color: colors.blue },
                ]}
              />
            </View>

            <View style={styles.warning}>
              <Text style={styles.warningText}>* Obrigatório </Text>
            </View>
            <View
              style={[
                styles.inputField,
                (isNameFocused || isNameFilled) && {
                  borderColor: colors.blue,
                },
              ]}
            >
              <TextInput
                accessible={true}
                placeholder="Digite seu nome completo"
                style={styles.input}
                textContentType="name"
                onBlur={() =>
                  signupHandler.handleInputNameBlur(
                    setIsNameFocused,
                    setIsNameFilled,
                    setName,
                    name
                  )
                }
                onFocus={() =>
                  signupHandler.handleInputNameFocus(setIsNameFocused)
                }
                onChangeText={(text) =>
                  signupHandler.handleInputNameChange(
                    setIsNameFilled,
                    setName,
                    text
                  )
                }
              />
              <MaterialIcons
                name="person"
                size={24}
                color="gray"
                style={[
                  styles.Icon,
                  (isNameFocused || isNameFilled) && { color: colors.blue },
                ]}
              />
            </View>

            <View style={styles.warning}>
              <Text style={styles.warningText}>* Obrigatório </Text>
            </View>
            <View
              style={[
                styles.inputField,
                (isCPFFocused || isCPFFilled) && { borderColor: colors.blue },
              ]}
            >
              <TextInputMask
                accessible={true}
                placeholder="Digite seu CPF"
                type={"cpf"}
                value={cpf}
                style={styles.input}
                onBlur={() =>
                  signupHandler.handleInputCPFBlur(
                    setIsCPFFocused,
                    setIsCPFFilled,
                    setCPF,
                    cpf
                  )
                }
                onFocus={() =>
                  signupHandler.handleInputCPFFocus(setIsCPFFocused)
                }
                onChangeText={(text) =>
                  signupHandler.handleInputCPFChange(
                    setIsCPFFilled,
                    setCPF,
                    text
                  )
                }
                ref={cpfRef}
              />
              <MaterialIcons
                name="person-outline"
                size={24}
                color="gray"
                style={[
                  styles.Icon,
                  (isCPFFocused || isCPFFilled) && { color: colors.blue },
                ]}
              />
            </View>

            <View style={styles.warning}>
              <Text style={styles.warningText}>* Obrigatório </Text>
            </View>
            <View
              style={[
                styles.inputField,
                (isPhoneFocused || isPhoneFilled) && {
                  borderColor: colors.blue,
                },
              ]}
            >
              <TextInputMask
                accessible={true}
                placeholder="Digite seu Numero de Telefone"
                type={"cel-phone"}
                textContentType="telephoneNumber"
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) ",
                }}
                value={phone}
                style={styles.input}
                onBlur={() =>
                  signupHandler.handleInputPhoneBlur(
                    setIsPhoneFocused,
                    setIsPhoneFilled,
                    setPhone,
                    phone
                  )
                }
                onFocus={() =>
                  signupHandler.handleInputPhoneFocus(setIsPhoneFocused)
                }
                onChangeText={(text) =>
                  signupHandler.handleInputPhoneChange(
                    setIsPhoneFilled,
                    setPhone,
                    text
                  )
                }
                ref={phoneRef}
              />
              <MaterialIcons
                name="phone-android"
                size={24}
                color="gray"
                style={[
                  styles.Icon,
                  (isPhoneFocused || isPhoneFilled) && { color: colors.blue },
                ]}
              />
            </View>

            <View style={styles.warning}>
              <Text style={styles.warningText}>* Obrigatório </Text>
            </View>
            <View
              style={[
                styles.inputField,
                (isDateFocused || isDateFilled) && {
                  borderColor: colors.blue,
                },
              ]}
            >
              <TextInputMask
                accessible={true}
                placeholder="Data de nascimento: DD/MM/AAAA"
                type={"datetime"}
                options={{
                  format: "DD/MM/YYYY",
                }}
                value={date}
                style={styles.input}
                onBlur={() =>
                  signupHandler.handleInputDateBlur(
                    setIsDateFocused,
                    setIsDateFilled,
                    setDate,
                    date
                  )
                }
                onFocus={() =>
                  signupHandler.handleInputDateFocus(setIsDateFocused)
                }
                onChangeText={(text) =>
                  signupHandler.handleInputDateChange(
                    setIsDateFilled,
                    setDate,
                    text
                  )
                }
                ref={dateRef}
              />
              <MaterialIcons
                name="date-range"
                size={24}
                color="gray"
                style={[
                  styles.Icon,
                  (isDateFocused || isDateFilled) && { color: colors.blue },
                ]}
              />
            </View>

            <View style={styles.warning}>
              <Text style={styles.warningText}>* Obrigatório </Text>
            </View>
            <View
              style={[
                styles.inputField,
                (isHomeAddressFocused || isHomeAddressFilled) && {
                  borderColor: colors.blue,
                },
              ]}
            >
              <TextInputMask
                accessible={true}
                type={"custom"}
                placeholder="Digite o CEP da sua casa"
                textContentType="streetAddressLine1"
                keyboardType="numeric"
                // TODO: Corrigir e melhorar a implementação de seja lá oq for isso
                options={{
                  // required

                  /**
                   * mask: (String | required | default '')
                   * the mask pattern
                   * 9 - accept digit.
                   * A - accept alpha.
                   * S - accept alphanumeric.
                   * * - accept all, EXCEPT white space.
                   */
                  mask: "99999-999",

                  // optional

                  /**
                   * validator: (Function | optional | defaults returns true)
                   * use this funcion to inform if the inputed value is a valid value (for invalid phone numbers, for example). The isValid method use this validator.
                   */
                  validator: function (value, settings) {
                    // Regex Check
                    var objER = /^[0-9]{5}-[0-9]{3}$/;
                    if (value.length > 0) {
                      if (objER.test(value)) return true;
                      else return false;
                    } else return false;
                  },

                  /**
                   * getRawValue: (Function | optional | defaults return current masked value)
                   * use this function to parse and return values to use what you want.
                   * for example, if you want to create a phone number mask (999) 999-99-99 but want to get only
                   * the numbers for value, use this method for this parse step.
                   */
                  getRawValue: function (value, settings) {
                    return String(value.replace("-", ""));
                  },
                  /**
                   * translation: (Object | optional | defaults 9, A, S, *)
                   * the dictionary that translate mask and value.
                   * you can change defaults by simple override the key (9, A, S, *) or create some new.
                   */
                  translation: {
                    // this is a custom translation. The others (9, A, S, *) still works.
                    // this translation will be merged and turns into 9, A, S, *, #.
                    "#": function (val) {
                      if (val === " ") {
                        return val;
                      }

                      // if returns null, undefined or '' (empty string), the value will be ignored.
                      return null;
                    },
                    // in this case, we will override build-in * translation (allow all characters)
                    // and set this to allow only blank spaces and some special characters.
                    "*": function (val) {
                      return [" ", "#", ",", ".", "!"].indexOf(val) >= 0
                        ? val
                        : null;
                    },
                  },
                }}
                value={homeAddress}
                onBlur={() =>
                  signupHandler.handleInputHomeAddressBlur(
                    setIsHomeAddressFocused,
                    setIsHomeAddressFilled,
                    setHomeAddress,
                    homeAddress
                  )
                }
                onFocus={() =>
                  signupHandler.handleInputHomeAddressFocus(
                    setIsHomeAddressFocused
                  )
                }
                onChangeText={(text) =>
                  signupHandler.handleInputHomeAddressChange(
                    setIsHomeAddressFilled,
                    setHomeAddress,
                    text
                  )
                }
                style={styles.input}
                ref={homeAddressRef}
              />
              <MaterialIcons
                name="home"
                size={24}
                color="gray"
                style={[
                  styles.Icon,
                  (isHomeAddressFocused || isHomeAddressFilled) && {
                    color: colors.blue,
                  },
                ]}
              />
            </View>

            <View style={styles.warning}>
              <Text style={styles.warningText}>* Obrigatório </Text>
            </View>
            <View
              style={[
                styles.inputField,
                (isNeighborhoodFocused || isNeighborhoodFilled) && {
                  borderColor: colors.blue,
                },
              ]}
            >
              <TextInput
                accessible={true}
                placeholder="Digite seu Bairro"
                style={styles.input}
                textContentType="location"
                onBlur={() =>
                  signupHandler.handleInputNeighborhoodBlur(
                    setIsNeighborhoodFocused,
                    setIsNeighborhoodFilled,
                    setNeighborhood,
                    neighborhood
                  )
                }
                onFocus={() =>
                  signupHandler.handleInputNeighborhoodFocus(
                    setIsNeighborhoodFocused
                  )
                }
                onChangeText={(text) =>
                  signupHandler.handleInputNeighborhoodChange(
                    setIsNeighborhoodFilled,
                    setNeighborhood,
                    text
                  )
                }
                ref={neighborhoodRef}
              />
              <MaterialIcons
                name="house-siding"
                size={24}
                color="gray"
                style={[
                  styles.Icon,
                  (isNeighborhoodFocused || isNeighborhoodFilled) && {
                    color: colors.blue,
                  },
                ]}
              />
            </View>

            <View style={styles.warning}>
              <Text style={styles.warningText}>* Obrigatório </Text>
            </View>
            <View
              style={[
                styles.inputField,
                (isHouseNumberFocused || isHouseNumberFilled) && {
                  borderColor: colors.blue,
                },
              ]}
            >
              <TextInput
                accessible={true}
                placeholder="Digite o Número da sua casa"
                style={styles.input}
                textContentType="location"
                keyboardType="numeric"
                onBlur={() =>
                  signupHandler.handleInputHouseNumberBlur(
                    setIsHouseNumberFocused,
                    setIsHouseNumberFilled,
                    setHouseNumber,
                    houseNumber
                  )
                }
                onFocus={() =>
                  signupHandler.handleInputHouseNumberFocus(
                    setIsHouseNumberFocused
                  )
                }
                onChangeText={(text) =>
                  signupHandler.handleInputHouseNumberChange(
                    setIsHouseNumberFilled,
                    setHouseNumber,
                    text
                  )
                }
              />
              <MaterialIcons
                name="add-location"
                size={24}
                color="gray"
                style={[
                  styles.Icon,
                  (isHouseNumberFocused || isHouseNumberFilled) && {
                    color: colors.blue,
                  },
                ]}
              />
            </View>
            <View
              style={[
                styles.inputField,
                (isWorkAddressFocused || isWorkAddressFilled) && {
                  borderColor: colors.blue,
                },
              ]}
            >
              <TextInputMask
                accessible={true}
                type={"custom"}
                placeholder="DIgite o CEP do seu local de trabalho"
                textContentType="streetAddressLine1"
                keyboardType="numeric"
                // TODO: Corrigir e melhorar a implementação de seja lá oq for isso
                options={{
                  // required

                  /**
                   * mask: (String | required | default '')
                   * the mask pattern
                   * 9 - accept digit.
                   * A - accept alpha.
                   * S - accept alphanumeric.
                   * * - accept all, EXCEPT white space.
                   */
                  mask: "99999-999",

                  // optional

                  /**
                   * validator: (Function | optional | defaults returns true)
                   * use this funcion to inform if the inputed value is a valid value (for invalid phone numbers, for example). The isValid method use this validator.
                   */
                  validator: function (value, settings) {
                    // Regex Check
                    var objER = /^[0-9]{5}-[0-9]{3}$/;
                    if (value.length > 0) {
                      if (objER.test(value)) return true;
                      else return false;
                    } else return false;
                  },

                  /**
                   * getRawValue: (Function | optional | defaults return current masked value)
                   * use this function to parse and return values to use what you want.
                   * for example, if you want to create a phone number mask (999) 999-99-99 but want to get only
                   * the numbers for value, use this method for this parse step.
                   */
                  getRawValue: function (value, settings) {
                    return String(value.replace("-", ""));
                  },
                  /**
                   * translation: (Object | optional | defaults 9, A, S, *)
                   * the dictionary that translate mask and value.
                   * you can change defaults by simple override the key (9, A, S, *) or create some new.
                   */
                  translation: {
                    // this is a custom translation. The others (9, A, S, *) still works.
                    // this translation will be merged and turns into 9, A, S, *, #.
                    "#": function (val) {
                      if (val === " ") {
                        return val;
                      }

                      // if returns null, undefined or '' (empty string), the value will be ignored.
                      return null;
                    },
                    // in this case, we will override build-in * translation (allow all characters)
                    // and set this to allow only blank spaces and some special characters.
                    "*": function (val) {
                      return [" ", "#", ",", ".", "!"].indexOf(val) >= 0
                        ? val
                        : null;
                    },
                  },
                }}
                value={workAddress}
                onChangeText={() =>
                  signupHandler.handleInputWorkAddressChange(
                    setIsWorkAddressFilled,
                    setWorkAddress,
                    workAddress
                  )
                }
                onBlur={() =>
                  signupHandler.handleInputWorkAddressBlur(
                    setIsWorkAddressFocused,
                    setIsWorkAddressFilled,
                    setWorkAddress,
                    workAddress
                  )
                }
                onFocus={() =>
                  signupHandler.handleInputWorkAddressFocus(
                    setIsWorkAddressFocused
                  )
                }
                style={styles.input}
                ref={workAddressRef}
              />
              <MaterialIcons
                name="work"
                size={24}
                color="gray"
                style={[
                  styles.Icon,
                  (isWorkAddressFocused || isWorkAddressFilled) && {
                    color: colors.blue,
                  },
                ]}
              />
            </View>
            <View
              accessible={true}
              accessibilityRole="checkbox"
              accessibilityLabel="Caixa de seleção. Marque se possui plano de saúde"
              style={[
                styles.inputField,
                isHealthPlanSelected && { borderColor: colors.blue },
              ]}
            >
              <Text style={styles.label}>Possui plano de saúde privado? </Text>
              <CheckBox
                value={isHealthPlanSelected}
                onValueChange={() =>
                  signupHandler.handleInputHealthPlan(setHealthPlanSelection)
                }
              />
            </View>

            <View
              accessible={true}
              accessibilityLabel="Caixa de seleção. Marque para permitir que possamos te enviar menssagens"
              style={[
                styles.inputField,
                isAllowMessageSelected && { borderColor: colors.blue },
              ]}
            >
              <Text style={styles.label}>Nos permite enviar messagens? </Text>
              <CheckBox
                value={isAllowMessageSelected}
                onValueChange={() =>
                  signupHandler.handleInputAllowMessage(
                    setAllowMessageSelection
                  )
                }
              />
            </View>
            <View
              accessible={true}
              accessibilityLabel="Caixa de seleção. Marque seu sexo biológico"
              style={[
                styles.inputField,
                gender != null && { borderColor: colors.blue },
              ]}
            >
              <Picker
                selectedValue={gender}
                style={{
                  height: 50,
                  width: 270,
                  borderWidth: 1,
                  borderBottomColor: colors.black,
                }}
                onValueChange={(itemValue, gender) => setGender(itemValue)}
              >
                <Picker.Item label="Sexo biológico..." value={null} />
                <Picker.Item label="Masculino" value="masculino" />
                <Picker.Item label="Feminino" value="feminino" />
              </Picker>
            </View>

            <View style={styles.warning}>
              <Text style={styles.warningText}>* Obrigatório </Text>
            </View>
            <View
              style={[
                styles.inputField,
                (isPasswordFocused || isPasswordFilled) && {
                  borderColor: colors.blue,
                },
              ]}
            >
              <TextInput
                accessible={true}
                placeholder="Insira a sua Senha"
                style={styles.input}
                value={password}
                textContentType="newPassword"
                secureTextEntry={true}
                onBlur={() =>
                  signupHandler.handleInputPasswordBlur(
                    setIsPasswordFocused,
                    setIsPasswordFilled,
                    password
                  )
                }
                onFocus={() =>
                  signupHandler.handleInputPasswordFocus(setIsPasswordFocused)
                }
                onChangeText={(text) =>
                  signupHandler.handleInputPasswordChange(
                    setIsPasswordFilled,
                    setPassword,
                    text
                  )
                }
                ref={passwordRef}
              />
              <MaterialIcons
                name="lock"
                size={24}
                color="gray"
                style={[
                  styles.Icon,
                  (isPasswordFocused || isPasswordFilled) && {
                    color: colors.blue,
                  },
                ]}
              />
            </View>

            <View style={styles.warning}>
              <Text style={styles.warningText}>* Obrigatório </Text>
            </View>
            <View
              style={[
                styles.inputField,
                (isConfirmPasswordFocused || isConfirmPasswordFilled) && {
                  borderColor: colors.blue,
                },
              ]}
            >
              <TextInput
                accessible={true}
                placeholder="Digite novamente a sua senha"
                style={styles.input}
                value={confirmPassword}
                textContentType="password"
                secureTextEntry={true}
                onBlur={() =>
                  signupHandler.handleInputConfirmPasswordBlur(
                    setIsConfirmPasswordFocused,
                    setIsConfirmPasswordFilled,
                    confirmPassword
                  )
                }
                onFocus={() =>
                  signupHandler.handleInputConfirmPasswordFocus(
                    setIsConfirmPasswordFocused
                  )
                }
                onChangeText={(text) =>
                  signupHandler.handleInputConfirmPasswordChange(
                    setIsConfirmPasswordFilled,
                    setConfirmPassword,
                    text
                  )
                }
                ref={passwordRef}
              />
              <MaterialIcons
                name="lock-outline"
                size={24}
                color="gray"
                style={[
                  styles.Icon,
                  (isConfirmPasswordFocused || isConfirmPasswordFilled) && {
                    color: colors.blue,
                  },
                ]}
              />
            </View>
            <View style={styles.button}>
              <BlueButton
                accessible={true}
                accessibilityLabel="Clique para efetuar o cadastro"
                title="Cadastrar"
                onPress={Check}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  warning: {
    left: Dimensions.get("window").width * 0.33,
    paddingTop: 10,
  },
  warningText: {
    fontFamily: fonts.text,
    fontSize: 8,
    color: colors.red,
  },
  inputField: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: colors.gray,
    padding: 10,
  },
  Icon: {
    padding: 10,
  },
  input: {
    color: colors.gray_dark3,
    width: "70%",
    fontFamily: fonts.text,
    fontSize: 16,
    //textAlign: 'center'
  },
  label: {
    fontFamily: fonts.generic,
  },
  answer: {
    fontFamily: fonts.text,
  },
  button: {
    padding: 40,
  },
});
