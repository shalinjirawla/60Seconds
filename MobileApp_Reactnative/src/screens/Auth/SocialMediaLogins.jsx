import React from "react";
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get('window');
const ratio = width / 421;
const buttonWidth = width / 3 - 20;

const SocialMediaLogins = (props) => {

    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.handleOnLogin && props.handleOnLogin('Azure-AD-Authentication')}>
                <View style={{ height: 60 * ratio, width: buttonWidth, justifyContent: 'center', backgroundColor: '#00ACED', borderRadius: 10 }}>
                    <Image
                        style={{ width: '30%', height: '30%', resizeMode: 'contain', alignSelf: 'center' }}
                        source={require('../../../assets/microsoft.png')}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.handleOnLogin && props.handleOnLogin('google-oauth2')}>
                <View style={{ height: 60 * ratio, width: buttonWidth, justifyContent: 'center', backgroundColor: '#fff', borderRadius: 10 }}>
                    <Image
                        style={{ width: '30%', height: '30%', resizeMode: 'contain', alignSelf: 'center' }}
                        source={require('../../../assets/google.png')}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.handleOnLogin && props.handleOnLogin('linkedin')}>
                <View style={{ height: 60 * ratio, width: buttonWidth, justifyContent: 'center', backgroundColor: '#0872A8', borderRadius: 10 }}>
                    <Image
                        style={{ width: '30%', height: '30%', resizeMode: 'contain', alignSelf: 'center' }}
                        source={require('../../../assets/linkedin.png')}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );

}

var styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        width: "100%",
        marginTop: 22,
        justifyContent: 'space-between',
        height: 60
    },
});

export default SocialMediaLogins;