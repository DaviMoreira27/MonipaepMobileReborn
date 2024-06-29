import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Platform } from "react-native";
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import { SafeAreaView } from "../components";
import { useAuth } from "../contexts/auth.context";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { BlueButton } from "../components";
import * as loginHandlers from "../handlers/login.handler";
import { commonErrorAlert, commonSucessAlert } from "../messages/common.messages";
import * as loginMessages from '../messages/login.messages';
import { useNavigation } from "@react-navigation/native";

export function Login() {
  //Seting function singIn with use Context
  const { login, signed } = useAuth();
  const navigation = useNavigation();


  //Seting useState and useRef to CPF
  const [isCPFFocused, setIsCPFFocused] = useState(false);
  const [isCPFFilled, setIsCPFFilled] = useState(false);
  const [cpf, setCPF] = useState<string>();
  const cpfRef = useRef(null);

  //Seting useState and useRef to Password
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);
  const [password, setPassword] = useState<string>("");
  const passwordRef = useRef(null);


  async function Check() {
    if (
      !cpfRef?.current.isValid() ||
      !loginHandlers.validatePassword(String(password))
    ) {
      commonErrorAlert(loginMessages.loginFailureMessage, () =>
        loginHandlers.resetAll(
          setCPF,
          setIsCPFFocused,
          setIsCPFFilled,
          setPassword,
          setIsPasswordFocused,
          setIsPasswordFilled
        )
      );
      return;
    }

    //Submit data to database
    try {
      const response = await login(cpfRef?.current.getRawValue(), password);

      //TODO: Lidar com o login corretamente, gerar o token de sucesso apos achar o usuario talvez seja melhor
      commonSucessAlert(loginMessages.loginSuccessMessage, () => {});

      return response;
    } catch (error) {
      commonErrorAlert(loginMessages.loginFailureMessage,
        () =>
          loginHandlers.resetAll(
            setCPF,
            setIsCPFFocused,
            setIsCPFFilled,
            setPassword,
            setIsPasswordFocused,
            setIsPasswordFilled
          )
      );
    }
  }

    function handleSignUp() {
      navigation.navigate('SignUp' as never);
    }

    function isMobileDevice(){
      return Platform.OS === 'ios' || Platform.OS === 'android'
    }

    return (
      <SafeAreaView
        accessible={true}
        accessibilityLabel="Página de Login, insira seus dados para entrar na sua conta"
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={isMobileDevice() ? Keyboard.dismiss : null}>
          <View style={styles.header}>
            <Text style={styles.welcome}>Bem-Vindo ao</Text>
            <Text style={styles.appName}>MoniPaEp</Text>
          </View>

          <View style={styles.container}>
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
                  loginHandlers.handleInputCPFBlur(
                    setIsCPFFocused,
                    setIsCPFFilled,
                    setCPF,
                    cpf
                  )
                }
                onFocus={() =>
                  loginHandlers.handleInputCPFFocus(setIsCPFFocused)
                }
                onChangeText={(value: string) =>
                  loginHandlers.handleInputCPFChange(
                    setIsCPFFilled,
                    setCPF,
                    value
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
                (isPasswordFocused || isPasswordFilled) && {
                  borderColor: colors.blue,
                },
              ]}
            >
              <TextInput
                accessible={true}
                placeholder="Digite sua senha"
                style={styles.input}
                value={password}
                textContentType="newPassword"
                secureTextEntry={true}
                onBlur={() =>
                  loginHandlers.handleInputPasswordBlur(
                    setIsPasswordFocused,
                    setIsPasswordFilled,
                    password
                  )
                }
                onFocus={() =>
                  loginHandlers.handleInputPasswordFocus(setIsPasswordFocused)
                }
                onChangeText={(value: string) =>
                  loginHandlers.handleInputPasswordChange(
                    setIsPasswordFilled,
                    setPassword,
                    value
                  )
                }
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
            <View style={styles.footer}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Botão. Clique caso tenha esquecido a senha"
              >
                <Text style={styles.textLink}>Esqueceu sua senha?</Text>
              </TouchableOpacity>
              <View style={styles.button}>
                <BlueButton
                  accessible={true}
                  accessibilityLabel="Botão. Clique para efetuar o login"
                  title="Entrar"
                  onPress={Check}
                />
              </View>
              <View style={styles.textAndLink}>
                <Text style={styles.text}>Não possui uma conta? </Text>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Botão. Clique para criar conta"
                  onPress={handleSignUp}
                >
                  <Text style={styles.textLink}>Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    //flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Dimensions.get("window").height * 0.1,
  },
  container: {
    //flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Dimensions.get("window").height * 0.03,
  },
  welcome: {
    fontFamily: fonts.welcome,
    fontSize: 24,
    color: colors.blue,
  },
  appName: {
    fontFamily: fonts.appName,
    fontSize: 32,
    color: colors.blue,
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
  footer: {
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textLink: {
    color: colors.blue_dark1,
    fontFamily: fonts.generic,
    fontSize: 12,
  },
  textAndLink: {
    flexDirection: "row",
    padding: 70,
  },
  text: {
    fontFamily: fonts.generic,
    fontSize: 12,
    color: colors.gray_dark3,
  },
  button: {
    padding: 20,
  },
});
