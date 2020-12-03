import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Text, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import SegmentedControlTabs from 'react-native-segmented-control-tabs';
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

const window = Dimensions.get('window');
const ratio = window.width / 421;

const Auth = ({ navigation }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleSelectedIndex = (index) => {
        // temp disabled sign up form
        // setSelectedIndex(index);
    };

    return (
        <View style={styles.container} >
            <ImageBackground source={require('../../assets/auth-background.png')} style={styles.backgroundImage} imageStyle={{ resizeMode: 'stretch' }}>
                <View style={styles.form}>

                    <SegmentedControlTabs
                        values={[
                            <Text style={[selectedIndex === 0 ? { color: '#1B3964', fontWeight: 'bold' } : { color: '#89AECC' }]}>LOG IN</Text>,
                            <Text style={[selectedIndex === 1 ? { color: '#1B3964', fontWeight: 'bold' } : { color: '#89AECC' }]}>SIGN UP</Text>
                        ]}
                        handleOnChangeIndex={handleSelectedIndex}
                        activeIndex={selectedIndex}
                        tabsContainerStyle={{
                            width: '80%',
                            height: 50 * ratio,
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 20,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                            alignSelf: 'center',
                        }}
                        activeTabStyle={{
                            borderBottomColor: "rgb(255,177,120)",
                            borderBottomWidth: 3,
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 20,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                            borderColor: "rgb(213,228,241)",
                            borderWidth: .6,
                        }}
                        lastTabStyle={{
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                        }}
                    />

                    {selectedIndex === 0 && <Login navigation={navigation} />}
                    {selectedIndex === 1 && <Signup navigation={navigation} />}

                </View>
            </ImageBackground>
        </View >
    );
}

// 828 × 1792
var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        height: '100%',
        width: '100%'
    },
    form: {
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'center',
        top: 142 * ratio
    },
});

export default withNavigation(Auth);