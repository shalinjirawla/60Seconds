import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Alert, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Text from "../../components/Text";
import Switch from "../../components/Switch";
import SocialMediaLogins from "./SocialMediaLogins";
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import Settings from "../../config/Settings";
import { POST, AUTH_GET, GET, axiosInstance } from "../../api/Services";
import * as EmailValidator from 'email-validator';
import Storage from "../../api/Storage";
import FullScreenLoader from "../../components/FullScreenLoader";
import { authenticateAPI } from '../../store/actions/user';
import { connect } from 'react-redux'
import axios from 'axios';
import { getBUKeywords } from "../../store/actions/task";

const window = Dimensions.get('window');
const ratio = window.width / 421;

const Login = ({ navigation, authenticateAPI, user, error, getBUKeywords }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isFetching, shouldFetch] = useState(false);

    useEffect(() => {
        if (error === null && user)
            handleLoginSuccess(user);

    }, [user, error]);

    // email login via API
    const handleOnLogin = async () => {

        try {
            let foundErrors = false;
            setEmailError(false), setPasswordError(false);

            if (email === "") {
                setEmailError(true);
                foundErrors = true;
            }
            if (password === "") {
                setPasswordError(true);
                foundErrors = true;
            }
            if (!EmailValidator.validate(email)) {
                setEmailError(true);
                foundErrors = true;
            }

            if (foundErrors)
                return;

            shouldFetch(true);

            await axiosInstance.post(`${Settings.AUTH_URL}/oauth/token`,
                {
                    grant_type: Settings.AUTH0_GRANTTYPE,
                    client_id: Settings.AUTH0_LOGIN_CLIENT_ID,
                    username: email,
                    password: password,
                    realm: Settings.AUTH0_REALM,
                    audience: Settings.AUTH0_AUDIENCE,
                    scope: Settings.AUTH0_SCOPE
                },
                { isAuth: false, isAuth0Auth: false })
                .then(async response => {
                    if (response.status === 200) {
                        // store auth0 token in storage
                        await Storage.set('token', response.data);

                        await axiosInstance.get(`${Settings.AUTH_URL}/userinfo`,
                            { isAuth0Auth: true, isAuth: false })
                            .then(async res => {
                                await Storage.set('user', res.data);

                                // call 60 seconds login api
                                if (response.status === 200) {

                                    if (res.status === 200) {

                                        let requestUser = {
                                            "email": res.data.email,
                                            "auth0Id": res.data.sub,
                                            "auth0Token": response.data.access_token
                                        };

                                        authenticateAPI(requestUser);
                                    }

                                } else {
                                    console.log('Loginn error 2 ');

                                    Alert.alert("Alert", "Sorry, we weren't able to log you in.",
                                        [
                                            { text: 'OK', onPress: () => shouldFetch(false) },
                                        ],
                                    );
                                }
                            });
                    } else {
                        console.log('Loginn error 3 ');
                        Alert.alert("Alert", "Sorry, we weren't able to log you in.",
                            [
                                { text: 'OK', onPress: () => shouldFetch(false) },
                            ],
                        );
                    }
                });
        } catch (error) {
            console.log('Loginn error 1 ', error);
            Alert.alert("Alert", "Sorry, we weren't able to log you in.",
                [
                    { text: 'OK', onPress: () => shouldFetch(false) },
                ],
            );
            console.log('Loginn error 3 ', error)
        }
    }

    const handleLoginSuccess = async (data) => {
        if (data.message === "UserNotFound") {
            await Storage.remove('sixty_data');
            await Storage.remove('permissions');
            await Storage.remove('user');
            await Storage.remove('token');

            Alert.alert("Alert", "Sorry, you are not associated with any business unit. Please contact administrator.",
                [
                    { text: 'OK', onPress: () => shouldFetch(false) },
                ],
            );

        } else {
            await Storage.set('sixty_data', data.data);
            await Storage.set('permissions', data.data.permissions);

            getBUKeywords(1, 100000);

            shouldFetch(false);

            navigation.navigate("App");
        }

    }

    // using auth0 social logins
    const handleOnSocialLogin = async (connection) => {
        shouldFetch(true);
        // Retrieve the redirect URL, add this to the callback URL list
        // of your Auth0 application.
        const redirectUrl = AuthSession.getRedirectUrl();
        // Structure the auth parameters and URL
        const queryParams = toQueryString({
            client_id: Settings.AUTH0_SOCIALLOGIN_CLIENT_ID,
            redirect_uri: redirectUrl,
            response_type: 'id_token token',
            connection: connection,
            scope: Settings.AUTH0_SOCIALLOGIN_SCOPE,
            nonce: 'nonce', // ideally, this will be a random value
            audience: Settings.AUTH0_AUDIENCE
        });
        const authUrl = `${Settings.AUTH_URL}/authorize` + queryParams;
        // Perform the authentication
        const response = await AuthSession.startAsync({ authUrl });

        if (response.type === 'success') {

            await Storage.set('token', response.params);
            handleResponse(response.params);
        } else {
            shouldFetch(false);
        }
    };

    const handleResponse = async (response) => {

        if (response.error) {
            Alert('Authentication error', response.error_description || 'something went wrong');
            return;
        }

        // Retrieve the JWT token and decode it
        const jwtToken = response.id_token;
        const user = jwtDecode(jwtToken);

        try {
            await Storage.set('user', user);
            // navigation.navigate("App")
            let requestUser = {
                "email": user.email,
                "auth0Id": user.sub,
                "auth0Token": response.access_token
            };

            authenticateAPI(requestUser);

        } catch (error) {
            console.log('error ', error);
        }
    };

    return (
        <>
            <KeyboardAvoidingView behavior={"position"} enabled >
                <ScrollView>

                    <SocialMediaLogins handleOnLogin={handleOnSocialLogin} />

                    <View style={{ width: '100%' }}>
                        <View style={{
                            height: 1, alignSelf: 'stretch', backgroundColor: '#CCD9F6', marginTop: 25
                        }} />
                        <Text style={{ fontSize: 12, position: 'absolute', top: 18, textAlign: 'center', color: '#3068B3', fontWeight: 'bold', backgroundColor: '#EAF3FF', alignSelf: 'center', height: 15 }} value={'OR'} />
                    </View>

                    <View style={styles.loginForm}>

                        <Text style={{
                            color: "rgb(82, 99, 118)", marginBottom: 5, fontSize: 16,
                            height: 23 * ratio
                        }} value={'Email'} />
                        <TextInput
                            value={email}
                            onChangeText={value => setEmail(value)}
                            style={{
                                borderBottomColor: emailError ? 'red' : "rgb(158,168,188)",
                                borderBottomWidth: 2,
                                height: 49 * ratio
                            }}
                        />

                        <Text style={{
                            color: "rgb(82, 99, 118)", marginBottom: 5, fontSize: 16,
                            height: 23 * ratio
                        }} value={'Password'} />
                        <TextInput
                            value={password}
                            onChangeText={value => setPassword(value)}
                            style={{
                                borderBottomColor: passwordError ? "red" : "rgb(158,168,188)",
                                borderBottomWidth: 2,
                                height: 49 * ratio

                            }}
                            secureTextEntry={true}
                        />

                        <Switch
                            onValueChange={value => setRememberMe(value)}
                            value={rememberMe}
                            label={'Remember Me'}
                            style={{
                                transform: [{ scaleX: .8 }, { scaleY: .8 }]
                            }} />

                        <Button label={"LOG IN"} onPress={() => handleOnLogin()}
                            // <Button label={"LOG IN"} onPress={ () => navigation.navigate("Rehearse") }
                            buttonStyle={{
                                backgroundColor: "rgb(53,154,219)",
                                marginTop: 20 * ratio,
                                paddingVertical: 12,
                                borderWidth: StyleSheet.hairlineWidth,
                                borderColor: "rgba(255,255,255,0.7)",
                                height: 49 * ratio
                            }}
                            textStyle={{ color: '#fff', fontWeight: 'bold' }}
                        />

                        <Button label={"Forgot your password?"} onPress={() => navigation.navigate("ForgotPassword")}
                            buttonStyle={{
                                backgroundColor: "transparent",
                                marginTop: 20 * ratio,
                                paddingVertical: 12,
                                borderWidth: StyleSheet.hairlineWidth,
                                borderColor: 'rgb(93, 108,125)',
                                height: 50
                            }}
                            textStyle={{ color: 'rgb(93, 108,125)', textDecorationLine: 'underline' }}
                        />
                        <Text style={{
                            color: "rgb(82, 99, 118)",
                            fontSize: 16,
                            alignItems: 'center',
                            textAlign: 'center',
                            marginTop: 10,
                            height: 50

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
        flexDirection: 'column',
        width: "100%",
        marginTop: 22
    },
});

// export default withNavigation(Login);
const mapStateToProps = (state) => ({
    user: state.user.user,
    loading: state.user.userLoading,
    error: state.user.userStatus
})


export default withNavigation(connect(
    mapStateToProps,
    { authenticateAPI, getBUKeywords }
)(Login))

function toQueryString(params) {
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}