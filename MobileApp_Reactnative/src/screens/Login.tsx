import React from "react";
import { Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
class Login extends React.Component {


    // static navigationOptions = {

    //     headerTitle: 'Login',
    //     headerLeft: null,

    //     headerTitleStyle: {
    //         flex: 1,
    //         color: '#fff',
    //         textAlign: 'center',
    //         alignSelf: 'center',
    //         fontWeight: 'normal',
    //     },

    //     headerStyle: {
    //         backgroundColor: '#b5259e',
    //     },
    // }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                <Text>Login</Text>
            </View >
        );
    }
}


export default withNavigation(Login);