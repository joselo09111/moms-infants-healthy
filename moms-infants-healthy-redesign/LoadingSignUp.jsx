import {Image, Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import dnaLoading from "./dna-loading.gif";


export default class LoadingSignUp extends React.Component {

    state = {loadingText: "Registering Account", color: appStyles.greyColor};

    constructor(props) {
        super(props);
        setTimeout(() => {
            this.setState({loadingText: "You're All Set!", color: appStyles.pinkColor})
            setTimeout(() => {
                this.props.signUpAndUploadData();
            }, 1000);
        }, 2000);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={appStyles.container}>
                    <View style={{
                        marginTop: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute'}}>
                        <Image source={dnaLoading} style={{width: 250, height: 250}}/>
                        <Text style={{...appStyles.paragraphText, color: this.state.color}}>{this.state.loadingText}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}