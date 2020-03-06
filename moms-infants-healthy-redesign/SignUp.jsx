import React from "react";
import SignUpInfo from "./SignUpInfo";
import Congratulations from "./Congratulations";
import SignUpPassword from "./SignUpPassword";
import SignUpBabyGender from "./SignUpBabyGender";
import Firebase from "./Firebase";
import SignUpContact from "./SignUpContact";
import LoadingSignUp from "./LoadingSignUp";
import SignUpYesorNo from "./SignUpYesorNo";
import MustLiveInMiami from "./MustLiveInMiami";


export default class SignUp extends React.Component {
    state = {index: 0, email: null, phoneNumber: null, password: null, fullName: null, dob: null, pregnant: null, infant: null, babyGender: null, liveMiami: null};
    showGenderSelection = false;
    showMiamiOnlyAlert = true;

    getNextScreen = () => {
        let currentIndex = this.state.index;

        if (!this.showMiamiOnlyAlert && currentIndex === 1){
            currentIndex += 1;
        }

        console.log("show", this.showGenderSelection)
        console.log(this.state.index)
        if (!this.showGenderSelection && currentIndex === 7) {
            console.log('in here')
            currentIndex +=1;
        }

        if (currentIndex < this.screens.length - 1){
            currentIndex += 1;
        }

        this.setState({index: currentIndex})
    };

    isEquivalent = (a, b) => {
        // Create arrays of property names
        let aProps = Object.getOwnPropertyNames(a);
        let bProps = Object.getOwnPropertyNames(b);

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length !== bProps.length) {
            return false;
        }

        for (let i = 0; i < aProps.length; i++) {
            let propName = aProps[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    };

    setUserInfo = (keyToValue) => {

        if (this.isEquivalent(keyToValue, {pregnant: true}) || this.isEquivalent(keyToValue, {infant: true})) {
            console.log("EEQUIV")
            this.showGenderSelection = true;
        }

        if (this.isEquivalent(keyToValue, {liveMiami: true})) {
            this.showMiamiOnlyAlert = false;
        }

        this.setState(keyToValue);

    };

    signUpAndUploadData = () => {
        let fb = new Firebase();
        fb.signUp(this.state.email, this.state.phoneNumber, this.state.password, this.state.fullName, this.state.dob, this.state.pregnant, this.state.infant, this.state.babyGender);
        setTimeout( () => {
            this.props.login(this.state.email, this.state.password)
        }, 2000);
    };

    screens = [
        <Congratulations setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen}/>,
        <SignUpYesorNo setUserInfo={this.setUserInfo} question={"Do You Live in Miami?"} value={"liveMiami"} getNextScreen={this.getNextScreen}/>,
        <MustLiveInMiami getNextScreen={this.getNextScreen}/>,
        <SignUpInfo setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen}/>,
        <SignUpContact setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen}/>,
        <SignUpPassword setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen}/>,
        <SignUpYesorNo setUserInfo={this.setUserInfo} question={"Are You Pregnant?"} value={"pregnant"} getNextScreen={this.getNextScreen}/>,
        <SignUpYesorNo setUserInfo={this.setUserInfo} question={"Do You Have Any Infants?"} value={"infant"} getNextScreen={this.getNextScreen}/>,
        <SignUpBabyGender setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen}/>,
        <LoadingSignUp signUpAndUploadData={this.signUpAndUploadData}/>
    ];

    render() {
        return (this.screens[this.state.index])
    }
};
