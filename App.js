import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {
  AsyncStorage,
  NativeModules,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {
  logIn,
  registerForPushNotificationsAsync,
  storeObjectInDatabase,
  getUserInfo,
} from './src/Firebase';
import LogIn from './src/Components/LogIn';
import LetsGetStarted from './src/Components/LetsGetStarted';
import SignUpInfo from './src/Components/SignUpInfo';
import SignUpYesorNo from './src/Components/SignUpYesorNo';
import MustLiveInMiami from './src/Components/MustLiveInMiami';
import translate from './src/Components/getLocalizedText';
// import * as firebase from "firebase";

export default App = () => {
  const initState = {
    uid: '',
    email: '',
    password: '',
    fullName: '' /* babyGender: "", */,
  };
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLanguages[0] ||
        NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;
  const [appState, setAppState] = useState(initState);
  const [screen, setScreen] = useState('login');

  useEffect(() => {
    getCookies();
  }, []);

  let getCookies = async () => {
    let email = await getCookie('email');
    let password = await getCookie('password');
    if (email && password) loginWithEmailPassword(email, password);
    let fullName = await getCookie('fullName');
    let uid = await getCookie('uid');

    setAppState({
      email,
      password,
      fullName,
      uid,
    });
  };

  let saveCookie = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value).then();
    } catch (e) {
      console.log(`Error storeData: ${e}`);
    }
  };

  let getCookie = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log(`Error getData: ${e}`);
    }
  };

  let loginWithEmailPassword = (email, password) => {
    if (email && password) {
      logIn(email, password).then(
        (response) => {
          loginWithUid(response.user.uid);
          saveCookie('email', email);
          saveCookie('password', password);
          registerForPushNotificationsAsync(response.user);
        },
        (e) => {
          alert('Invalid E-mail and Password Combination!');
        }
      );
    } else {
      alert('Please enter your E-Mail and Password!');
    }
  };

  let loginWithUid = (uid) => {
    let today = new Date();
    let date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}@${today.getHours()}:${today.getMinutes()}`;
    storeObjectInDatabase(uid, {
      lastInteraction: date,
      deviceLanguage,
    });
    getUserInfo(uid).on('value', (snapshot) => {
      saveCookie('fullName', snapshot.val().fullName);
      saveCookie('uid', uid);
      setScreen('homepage');
      // setAppState({babyGender: snapshot.val().babyGender});
    });
  };

  let logout = () => {
    setScreen('login');
    saveCookie('email', '');
    saveCookie('password', '');
    saveCookie('uid', '');
    saveCookie('fullName', '');
  };

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LogIn} />
        <Stack.Screen name="LetsGetStarted" component={LetsGetStarted} />
        <Stack.Screen name="SignUpInfo" component={SignUpInfo} />
        <Stack.Screen name="SignUpYesorNoMiami" component={SignUpYesorNo} />
        <Stack.Screen name="MustLiveInMiami" component={MustLiveInMiami} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
