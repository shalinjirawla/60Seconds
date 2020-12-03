import Auth from "../screens/Auth";
import Loading from "../screens/Loading";
import ForgotPassword from "../screens/ForgotPassword";
import { createStackNavigator } from 'react-navigation-stack';

const AuthNavigator = createStackNavigator({
    Loading: {
        screen: Loading,
        navigationOptions: {
            gestureEnabled: false
        },
    },
    Login: {
        screen: Auth,
        navigationOptions: {
            gestureEnabled: false
        },
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            gestureEnabled: true
        },
    },
}, {
    headerMode: 'none',
    initialRouteName: 'Loading',
});

export default AuthNavigator;