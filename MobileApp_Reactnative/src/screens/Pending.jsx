import React, { useState } from "react";
import { Text, View, TouchableOpacity, AsyncStorage, Dimensions } from 'react-native';
import { AuthSession } from "expo";
import Settings from "../config/Settings";
import DeliverySettings from "../components/DeliverySettings";
import RehersalSettings from "../components/RehersalSettings";

const Pending = ({ navigation }) => {

    const [isVisibleDeliverySettings, setDeliverySettingsVisibility] = useState(false);
    const [isVisibleRehersalSettings, setRehersalSettingsVisibility] = useState(false);

    const handleOnLogOut = async () => {

        const auth0ClientId = Settings.AUTH0_CLIENT_ID;
        const auth0Domain = Settings.AUTH_URL;
        const redirectUrl = AuthSession.getRedirectUrl();
        // Structure the auth parameters and URL
        const queryParams = toQueryString({
            client_id: auth0ClientId,
            returnTo: redirectUrl
        });
        const authUrl = `${auth0Domain}/v2/logout` + queryParams;
        const response = await AuthSession.startAsync({ authUrl });

        if (response.type === 'success') {
            await AsyncStorage.removeItem('user').then(data => {
                if (data === null)
                    navigation.navigate("Auth");
            }).catch(error => {
            });
        }
    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>

                <TouchableOpacity onPress={navigation.toggleDrawer}>
                    <Text>Open Drawer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOnLogOut}>
                    <Text>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDeliverySettingsVisibility(true)}>
                    <Text>Delivery Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRehersalSettingsVisibility(true)}>
                    <Text>Rehersal Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Rehearse")}>
                    <Text>Rehearse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Recording")}>
                    <Text>Recording</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Audio")}>
                    <Text>Audio</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("VideoRehearse")}>
                    <Text>Video Rehearse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ViewDelivery")}>
                    <Text>View Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Confirmation")}>
                    <Text>Confirmation</Text>
                </TouchableOpacity>
            </View>
            {isVisibleDeliverySettings && <DeliverySettings onClose={(visible) => setDeliverySettingsVisibility(visible)} isVisible={isVisibleDeliverySettings} />}
            {isVisibleRehersalSettings && <RehersalSettings onClose={(visible) => setRehersalSettingsVisibility(visible)} isVisible={isVisibleRehersalSettings} />}
        </>
    );
}

Pending.navigationOptions = () => {
    return {
        title: 'Pending Work',
        headerRight: null
    };
};

export default Pending;

function toQueryString(params) {
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}