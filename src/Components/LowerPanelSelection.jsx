import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {MaterialIcons} from '@expo/vector-icons';
import babyBottle from '../../assets/baby-bottle.png';
import clinicLogo from '../../assets/clinic-logo.png';
import shelterLogo from '../../assets/shelter-logo.png';
import lightBulb from '../../assets/light-bulb.png';
import document from '../../assets/document.png';
import WelcomeUserBanner from './WelcomeUserBanner';
import SelectionButton from './SelectionButton';
import translate from './getLocalizedText';
import appStyles from './AppStyles';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

export default function LowerPanelSelection(props) {
  const navigation = useNavigation();

  return (
    <>
      <GestureRecognizer
        onSwipeUp={() => props.setFullPanel(true)}
        onSwipeDown={() => props.setFullPanel(false)}
        style={{
          width: appStyles.win.width,
          height: appStyles.win.height * 0.16,
          alignItems: 'center',
        }}
      >
        <Button
          style={{
            Touchable: {
              height: appStyles.win.height * 0.06,
              width: appStyles.win.width,
            },
            Text: {},
          }}
          text=""
          underlayColor="transparent"
          onPress={() => props.setFullPanel(!props.fullPanel)}
        />
        <WelcomeUserBanner fullName={props.fullName} logout={props.logout} />
        <View>
          <MaterialIcons
            name="settings"
            size={45}
            color="gray"
            style={styles.userSettingStyle}
            onPress={() => navigation.navigate('SettingsScreen')}
          />
        </View>
      </GestureRecognizer>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          width: appStyles.win.width,
        }}
      >
        <SelectionButton
          style={appStyles.PanelSelectionButton}
          text={translate("facilities")}
          icon={clinicLogo}
          onPress={() => {
            props.setLowerPanelContent("facilities");
          }}
        />
        <SelectionButton
          style={appStyles.PanelSelectionButton}
          text={translate("learn")}
          icon={babyBottle}
          onPress={() => {
<<<<<<< HEAD
            navigation.navigate('Learn');
=======
            props.setLowerPanelContent("learn");
>>>>>>> df86d3a54805b2abdd7dcb89adcc4395aeab1ebb
          }}
        />
        <SelectionButton
          style={appStyles.PanelSelectionButton}
          text={translate("resources")}
          icon={lightBulb}
          onPress={() => {
<<<<<<< HEAD
            navigation.navigate('ResourcesPage');
=======
            props.setLowerPanelContent("resources");
>>>>>>> df86d3a54805b2abdd7dcb89adcc4395aeab1ebb
          }}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  userSettingStyle: {
    position: 'absolute',
    left: appStyles.win.width * 0.27,
    bottom: appStyles.win.height * 0.03,
    color: '#706e6c',
  },
});
