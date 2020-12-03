import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Text, Dimensions, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import Button from "../components/Button";

const window = Dimensions.get('window');
const ratio = window.width / 421;

const Confirmation = ({ navigation }) => {

    return (
        <View style={styles.container} >
            <ImageBackground source={require('../../assets/confirmation_background.png')} style={styles.backgroundImage} imageStyle={{ resizeMode: 'stretch' }}>
                <View style={styles.form}>

                    <Image
                        style={{
                            width: 69 * ratio,
                            height: 69 * ratio,
                            resizeMode: 'contain',
                            alignSelf: 'center'
                        }}
                        source={require('../../assets/approved_activity_icon.png')}
                    />

                    <Text style={{
                        color: "#FFFFFF",
                        fontSize: 28 * ratio,
                        alignItems: 'center',
                        textAlign: 'center',
                        marginTop: 30 * ratio
                    }}>Task Sent for Review</Text>

                    <Text style={{
                        color: "#FFFFFF",
                        fontSize: 18 * ratio,
                        alignItems: 'center',
                        textAlign: 'center',
                        marginTop: 15 * ratio
                    }}>You will be notified as soon as your Task is either Approved, or has been commented on by a recipient.</Text>


                    <Button label={"BACK TO TASKS"} onPress={() => navigation.navigate('Home', { refetch: true })}
                        buttonStyle={{
                            backgroundColor: "#FFFFFF",
                            marginTop: 39 * ratio,
                            marginBottom: 12,
                            paddingVertical: 12,
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: "rgba(255,255,255,0.7)",
                        }}
                        textStyle={{ color: '#1469AF' }}
                    />
                </View>
            </ImageBackground>
        </View >
    );
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    backgroundImage: {
        height: '100%',
        width: '100%'
    },
    form: {
        flexDirection: "column",
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'center',
        top: 144 * ratio
    },
});

export default withNavigation(Confirmation);