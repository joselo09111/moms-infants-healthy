import { Image, Text, TouchableHighlight, View } from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import goBackImg from "../../assets/go-back-arrow.png";
import BackButton from "./Button"
import * as Haptics from "expo-haptics";

export default function SignUpHeader(props) {
  let goBack = () => {
    Haptics.selectionAsync().then();
    props.goBack();
  };

  let backgroundColor = "white";

  /*if (props.index === 8) {   //Only on baby gender page
        if (props.male && props.female) {
            backgroundColor = "#800080"
        } else if (props.male) {
            backgroundColor = appStyles.blueColor;
        } else if (props.female) {
            backgroundColor = appStyles.pinkColor
        }
    }   */

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        height: appStyles.win.height * 0.1,
        backgroundColor: backgroundColor,
      }}
    >
      <BackButton
        style={appStyles.BackButton } 
        icon={goBackImg}
        onPress= {goBack}
      />
    </View>
  );
}
