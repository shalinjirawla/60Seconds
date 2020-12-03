import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Text, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as EmailValidator from 'email-validator';
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Settings from "../config/Settings";
import { axiosInstance, } from "../api/Services";
import FullScreenLoader from "../components/FullScreenLoader";

const window = Dimensions.get('window');
const ratio = window.width / 421;

const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [isFetching, shouldFetch] = useState(false);

    const handleOnSubmit = async () => {

        setEmailError(false);

        if (email === "") {
            setEmailError(true);
            return;
        }
        else if (!EmailValidator.validate(email)) {
            setEmailError(true);
            return;
        }

        shouldFetch(true);

        try {

            await axiosInstance.post(`${Settings.AUTH_URL}/dbconnections/change_password`,
                {
                    client_id: Settings.AUTH0_LOGIN_CLIENT_ID,
                    email: email,
                    connection: Settings.AUTH0_REALM
                },
                { isAuth: false, isAuth0Auth: false })
                .then(async response => {

                    if (response.status == "200") {
                        setEmail("");

                        Alert.alert("Alert", response.data,
                            [
                                { text: 'OK', onPress: () => shouldFetch(false) },
                            ],
                        );
                    } else {
                        Alert.alert("Alert", "Sorry, we weren't able to send a reset password link at this time.",
                            [
                                { text: 'OK', onPress: () => shouldFetch(false) },
                            ],
                        );
                    }
                });
        } catch (error) {

        }
    }

    return (
        <>
            <View style={styles.container} >
                <ImageBackground source={require('../../assets/header_bar.png')} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain', top: 0, justifyContent: 'center' }}>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 44 * window.width / 421,
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                style={{ width: 20 * ratio, height: 20 * ratio, resizeMode: 'contain', }}
                                source={require('../../assets/icon-back.png')}
                            />
                            <Text style={{ color: '#fff', fontSize: 20 * ratio, marginLeft: 10 }}>{'Back to Login'}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={styles.form}>

                    <Text style={{
                        color: "#1469AF",
                        fontSize: 16 * ratio,
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>An email will be sent to reset your password.</Text>

                    <Text style={{ color: "rgb(82, 99, 118)", marginBottom: 5, fontSize: 16 }} value={'Enter Email Address'} />
                    <TextInput
                        value={email}
                        onChangeText={value => setEmail(value)}
                        style={{
                            borderBottomColor: emailError ? 'red' : "rgb(158,168,188)",
                            borderBottomWidth: 2,
                            height: 50
                        }}
                    />

                    <Button label={"RESET PASSWORD"} onPress={() => handleOnSubmit()}
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
                        height: 40,
                        width: '100%',
                        color: "rgb(82, 99, 118)",
                        fontSize: 16,
                        alignItems: 'center',
                        textAlign: 'center',
                        marginTop: 5,
                        marginBottom: 5
                    }}
                    >{`(c) ${new Date().getFullYear()}. 60seconds.`}</Text>

                </View>

            </View >
            <FullScreenLoader isFetching={isFetching} shouldFetch={shouldFetch} />
        </>
    );
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    backgroundImage: {
        width: window.width,
        height: 89 * window.width / 414
    },
    form: {
        alignSelf: 'center',
        position: 'absolute',
        width: '90%',
        top: 142 * ratio
    },
});

export default withNavigation(ForgotPassword);