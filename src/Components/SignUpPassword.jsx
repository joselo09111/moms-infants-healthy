import React, {useEffect, useState} from 'react';
import {
  AsyncStorage,
  Keyboard,
  Text,
  TextInput as TextBox,
  TouchableOpacity,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const {liveMiami} = props.route.params;
  const {name} = props.route.params;
  const {dob} = props.route.params;
  const {email} = props.route.params;
  const {phone} = props.route.params;

  useEffect(() => {
    AsyncStorage.getItem('pass')
      .then((value) => {
        value !== null && value !== '' ? setPassword(value) : null;
      })
      .done();
    AsyncStorage.getItem('repeat')
      .then((value) => {
        value !== null && value !== '' ? setRepeat(value) : null;
      })
      .done();
  }, []);

  let onPress = () => {
    if (password !== repeat) {
      alert(translate('passwordMismatch'));
    } else if (!password || !repeat) {
      alert(translate('fillOutAllFields'));
    } else if (password.length < 6) {
      alert(translate('passwordTooShort'));
    } else if(warningMessage == 'Poor'){
      alert(translate('passwordTooWeak'));
    }else
    {
      // props.setUserInfo({password});
      // AsyncStorage.setItem('pass', password);
      // AsyncStorage.setItem('repeat', repeat);
      props.navigation.navigate('SignUpYesorNoPregnant', {
        liveMiami,
        name,
        dob,
        email,
        phone,
        password,
        question: translate('areYouPregnant'),
        value: 'pregnant',
      });
    }
  };
  function arrayFile(file)
  {
    const reader = new FileReader()
    reader.onload = async (e) =>
    {
      const text = (e.target.result);
      return text.split("");
    }
  }
  function contain(data, target)
  {
    var res = false;
    for(var i = 0; i < data.length && !res; i++)
    {
      res = target == data[i];
    }
    return res;
  }
  function amountOfTypes(input)
  {
    var letter = 0;
    var number = 0;
    var symbol = 0;
    var capital = 0;
    for(var i = 0; i < input.length; i++)
    {
      if(input.charCodeAt(i) > 64 && input.charCodeAt(i) < 132 && capital == 0)
      {
        capital = 1;
      }else if(input.charCodeAt(i) > 47 && input.charCodeAt(i) < 58 && number == 0)
      {
        number = 1;
      }else if(input.charCodeAt(i) > 96 && input.charCodeAt(i) < 123 && letter == 0)
      {
        letter = 1;
      }else if(symbol == 0)
      {
        symbol = 1;
      }
    }
    return letter + number + symbol + capital;
  }
  function passwordCheck(input)
  {
    if(len(input) >= 5 || contain(arrayFile("./10-million-password-list-top-1000.txt"), input) || amountOfTypes(input) > 3)//High
    {
      setWarningMessage('High');
      setWarningStyle('#298000');
    }else if(len(input) >= 4 || contain(arrayFile("./10-million-password-list-top-1000.txt"), input) || amountOfTypes(input) > 2)//Med
    {
      setWarningMessage('Med');
      setWarningStyle('#0052A1');
    }else//Low
    {
      setWarningMessage('Poor');
      setWarningStyle('#DF2172');
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={appStyles.signupContainer}
      enabled={false}
    >
      <TouchableHighlight
        onPress={Keyboard.dismiss}
        underlayColor="transparent"
        accessible={false}
      >
        <>
          <View style={appStyles.container}>
            <View
              style={{
                paddingTop: appStyles.win.height * 0.15,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
              }}
            >
              <Text style={appStyles.titleBlue}>
                {translate('createPassword')}
              </Text>
              <View style={{paddingTop: appStyles.win.height * 0.05}}>
                <TextBox
                  placeholder={translate('passwordInput')}
                  onChangeText={setPassword}
                  secureTextEntry
                  value={password}
                  style={appStyles.TextInputMask}
                />

                <TextBox
                  placeholder={translate('repeatPasswordInput')}
                  onChangeText={setRepeat}
                  secureTextEntry
                  value={repeat}
                  style={appStyles.TextInputMask}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              margin: '15%',
            }}
          >
            <Button
              style={appStyles.button}
              text={translate('continueButton')}
              onPress={onPress}
            />
          </View>
        </>
      </TouchableHighlight>
    </KeyboardAvoidingView>
  );
};
