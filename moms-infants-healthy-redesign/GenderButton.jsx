import {Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";

export default function GenderButton(props){

    let onClick = () => {
        Haptics.selectionAsync().then();
        props.onClick();
    };

    return (
        <TouchableHighlight
            style={{margin: 10,
                alignItems: 'center',
                backgroundColor: props.selected ? 'grey' : 'white',
                height: 100,
                width: 105,
                borderRadius: appStyles.button.TouchableHighlight.borderRadius,
                borderWidth: 0,
                shadowColor: appStyles.greyColor,
                shadowOpacity: appStyles.shadow.shadowOpacity,
                shadowOffset: appStyles.shadow.shadowOffset,
                shadowRadius: appStyles.shadow.shadowRadius,
            }}
            onPress={onClick}>
            <Text style={{color: props.color, fontSize: 85}}>{props.text}</Text>
        </TouchableHighlight>
    )
}