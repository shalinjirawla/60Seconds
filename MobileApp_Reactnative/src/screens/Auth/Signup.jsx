import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Alert, Dimensions, KeyboardAvoidingView } from 'react-native';
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Text from "../../components/Text";
import AgreementText from "./AgreementText";
import SocialMediaLogins from "./SocialMediaLogins";
import { POST } from "../../api/Services";
import Settings from "../../config/Settings";
import * as EmailValidator from 'email-validator';
import FullScreenLoader from "../../components/FullScreenLoader";
import axios from 'axios';

const window = Dimensions.get('window');
const ratio = window.width / 421;

const Signup = ({ navigation }) => {

    const scrollViewRef = useRef(null);

    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [isFetching, shouldFetch] = useState(false);
    const [isSignupSuccess, setSignupSuccess] = useState(null);
    const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(0);

    const isPasswordValid = () => {
        // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return regex.test(password);
    }

    const handleOnSubmit = () => {
        let foundErrors = false;
        setFirstNameError(false), setLastNameError(false), setEmailError(false), setPasswordError(false), setConfirmPasswordError(false);

        if (firstName === "") {
            setFirstNameError(true);
            foundErrors = true;
        }
        if (lastName === "") {
            setLastNameError(true);
            foundErrors = true;
        }
        if (email === "") {
            setEmailError(true);
            foundErrors = true;
        }
        if (!EmailValidator.validate(email)) {
            setEmailError(true);
            foundErrors = true;
        }
        if (password === "") {
            setPasswordError(true);
            foundErrors = true;
        }
        if (confirmPassword === "") {
            setConfirmPasswordError(true);
            foundErrors = true;
        }

        if (password !== confirmPassword) {
            setPasswordError(true);
            setConfirmPasswordError(true);
            Alert.alert("Passwords do not match");
            foundErrors = true;
            return;
        }

        if (foundErrors)
            return;

        if (!isPasswordValid()) {
            setPasswordError(true);
            Alert.alert("Password needs to be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
            foundErrors = true;
            return;
        }

        shouldFetch(true);

        try {

            axios(`${Settings.AUTH_URL}/dbconnections/signup`,
                {
                    client_id: Settings.AUTH0_LOGIN_CLIENT_ID,
                    email: email,
                    password: password,
                    connection: "Username-Password-Authentication",
                    given_name: firstName,
                    family_name: lastName,
                    name: `${firstName} ${lastName}`,
                    user_metadata: { platform: 'mobile' }
                },
                response => {
                    if (response.status == "200") {
                        setFirstName("");
                        setLastName("");
                        setEmail("");
                        setPassword("");
                        setConfirmPassword("");
                        Alert.alert("Alert", "Successful signup",
                            [
                                { text: 'OK', onPress: () => shouldFetch(false) },
                            ],
                        );
                    } else {

                        Alert.alert("Alert", "Sorry, we weren't able to sign up.",
                            [
                                { text: 'OK', onPress: () => shouldFetch(false) },
                            ],
                        );
                        console.log('error', response);
                    }
                });
        } catch (error) {
            Alert.alert("Alert", "Sorry, we weren't able to sign up.",
                [
                    { text: 'OK', onPress: () => shouldFetch(false) },
                ],
            );
            console.log('error', error);
        }
    }

    return (
        <>
            <KeyboardAvoidingView behavior={"padding"} enabled >
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={{
                        height: 800 * ratio,
                    }}
                    showsVerticalScrollIndicator={false}>
                    <SocialMediaLogins />

                    <View style={{ width: '100%' }}>
                        <View style={{ height: 1, alignSelf: 'stretch', backgroundColor: '#CCD9F6', marginTop: 25, }} />
                        <Text style={{ fontSize: 12, position: 'absolute', top: 18, textAlign: 'center', color: '#3068B3', fontWeight: 'bold', backgroundColor: '#EAF3FF', alignSelf: 'center' }} value={'OR'} />
                    </View>

                    <View style={styles.loginForm}>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: .5, marginRight: 5 }}>
                                <Text style={{ color: "rgb(82, 99, 118)", marginBottom: 5, fontSize: 16 }} value={'First Name'} />
                                <TextInput
                                    value={firstName}
                                    onChangeText={value => setFirstName(value)}
                                    style={{
                                        borderBottomColor: firstNameError ? 'red' : "rgb(158,168,188)",
                                        borderBottomWidth: 2,
                                        height: 50
                                    }}
                                    onFocus={() => scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })}
                                />
                            </View>
                            <View style={{ flex: .5, marginLeft: 5 }}>
                                <Text style={{ color: "rgb(82, 99, 118)", marginBottom: 5, fontSize: 16 }} value={'Last Name'} />
                                <TextInput
                                    value={lastName}
                                    onChangeText={value => setLastName(value)}
                                    style={{
                                        borderBottomColor: lastNameError ? 'red' : "rgb(158,168,188)",
                                        borderBottomWidth: 2,
                                        height: 50
                                    }}
                                    onFocus={() => scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })}
                                />
                            </View>
                        </View>

                        <Text style={{ color: "rgb(82, 99, 118)", marginBottom: 5, fontSize: 16 }} value={'Email'} />
                        <TextInput
                            value={email}
                            onChangeText={value => setEmail(value)}
                            style={{
                                borderBottomColor: emailError ? 'red' : "rgb(158,168,188)",
                                borderBottomWidth: 2,
                                height: 50
                            }}
                            onFocus={() => scrollViewRef.current.scrollTo({ x: 0, y: 100, animated: true })}
                        />

                        <Text style={{ color: "rgb(82, 99, 118)", marginBottom: 5, fontSize: 16 }} value={'Password'} />
                        <TextInput
                            value={password}
                            onChangeText={value => setPassword(value)}
                            style={{
                                borderBottomColor: passwordError ? 'red' : "rgb(158,168,188)",
                                borderBottomWidth: 2,
                                height: 50
                            }}
                            secureTextEntry={true}
                            onFocus={() => scrollViewRef.current.scrollTo({ x: 0, y: 300, animated: true })}
                        />

                        <Text style={{ color: "rgb(82, 99, 118)", marginBottom: 5, fontSize: 16 }} value={'Confirm Password'} />
                        <TextInput
                            value={confirmPassword}
                            onChangeText={value => setConfirmPassword(value)}
                            style={{
                                borderBottomColor: confirmPasswordError ? 'red' : "rgb(158,168,188)",
                                borderBottomWidth: 2,
                                height: 50
                            }}
                            secureTextEntry={true}
                            onFocus={() => scrollViewRef.current.scrollTo({ x: 0, y: 300, animated: true })}
                        />

                        <AgreementText />

                        <Button label={"SIGN UP"} onPress={() => handleOnSubmit()}
                            buttonStyle={{
                                backgroundColor: "rgb(53,154,219)",
                                marginTop: 20,
                                marginBottom: 12,
                                paddingVertical: 12,
                                borderWidth: StyleSheet.hairlineWidth,
                                borderColor: "rgba(255,255,255,0.7)",
                            }}
                            textStyle={{ color: '#fff', fontWeight: 'bold' }}
                        />

                        <Text style={{
                            width: '100%',
                            color: "rgb(82, 99, 118)",
                            fontSize: 16,
                            alignItems: 'center',
                            textAlign: 'center',
                            marginTop: 5,
                            marginBottom: 5
                        }}
                            value={`(c) ${new Date().getFullYear()}. 60seconds.`} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <FullScreenLoader isFetching={isFetching} shouldFetch={shouldFetch} />
        </>
    );
}

var styles = StyleSheet.create({

    loginForm: {
        height: '100%',
        width: "100%",
        marginTop: 22,
    },
});

export default Signup;