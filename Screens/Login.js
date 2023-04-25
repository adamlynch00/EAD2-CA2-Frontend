import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useContext, useState, Suspense } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';
import * as localization from 'expo-localization'
import { I18n } from 'i18n-js';

const translations = {

  en: {
    login: "login",
    Username: "Username",
    Password: "Password",
    Donthaveanaccount: "Dont have an account",
    Register: "Register"
  },

  ja: {
    login: "ログイン",
    Username: "ユーザー名",
    Password: "パスワード",
    Donthaveanaccount: "アカウントを持っていない?",
    Register: "登録"  

  }
}

const i18n =  new I18n(translations);

i18n.locale = localization.locale;

i18n.enableFallback = true;

const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [role, setRole] = useState('');

    const [locale, setLocale] = useState(i18n.locale)

    const changeLocale = (locale) => {
      i18n.locale = locale;
      setLocale(locale)
    }

    

    
    const navigation = useNavigation();
    

   
    const HandleLogin = async (username, password) => {
      const data = {
          "username": username,
          "password": password
      };

      await axios.post(`${BASE_URL}/auth/login`, data)
          .then( async (res) => {
              if (res.status === 200) {
                await AsyncStorage.setItem("accessToken", res.data.accessToken);
                await AsyncStorage.setItem("role", res.data.role.toString());

                setAccessToken(res.data.accessToken);
                setRole(res.data.role);

                navigation.navigate("Home");
              }
              else {
                console.log("Failed to apply access token/role - Status " + result.status)
              }
          })
          .catch( (err) => {
              console.log(err.response.data);
          });
    }

  return (
    <Suspense fallback={null}>
      <View style={styles.container}>

        <Image style={styles.image} source={require("../assets/sh-logo-transparent.png")} />

        <View style={styles.inputView}>
          <Text>
          {i18n.t('Username')}
          </Text>
          <TextInput
            style={styles.TextInput}
            value={username}
            placeholder='Enter username'
            onChangeText={text => setUsername(text)}
          />
        </View>

        <View style={styles.inputView}>
        <Text>
        {i18n.t('Password')}
          </Text>
          <TextInput
            style={styles.TextInput}
            value={password}
            placeholder='Enter Password'
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginBtn}
          onPress={() => HandleLogin(username, password)}>

          <Text style={styles.loginText}>{i18n.t('login')}</Text>
        </TouchableOpacity>

        <Text>{i18n.t('Donthaveanaccount')}</Text>
        <View>
          <Pressable onPress={() => {
            navigation.navigate("Register")
            testID="register-button"
          }}>
            <Text>{i18n.t('Register')}</Text>

          </Pressable>
        </View>

        <View style={{paddingTop:10}}>
          <TouchableOpacity 
          onPress={() => changeLocale('ja')}
          testID='language-button'>
            <Text>
              Japanese
            </Text>
          </TouchableOpacity>
        </View>

        <View >
          <TouchableOpacity 
          testID='language-button-eng'
          onPress={() => changeLocale('en')}>
            <Text>
              English
            </Text>
          </TouchableOpacity>
        </View>

        

        
      </View>

    </Suspense>
  )
}

export default Login

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderColor: "#BBB",
    borderWidth: 1
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontSize: 15,
    textAlignVertical: "center",
    textAlign: "center"
  },
  image: {
    width: "60%",
    resizeMode: "contain",
    height: 150
  },
  container: {
    flex: 1,
    backgroundColor: "#EEE",
    alignItems: "center",
    paddingTop: "15%"
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#398378",
    borderColor: "#BBB",
    borderWidth: 1,
    marginBottom: 20
  },
  loginText: {
    color: "#FFF",
    fontWeight: "bold"
  }
})