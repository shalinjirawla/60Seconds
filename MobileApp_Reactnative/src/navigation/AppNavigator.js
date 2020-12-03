import { createStackNavigator } from 'react-navigation-stack';
import DrawerNavigator from "./DrawerNavigator";
import ViewDeliveryPitch from "../screens/ViewDeliveryPitch";
import ViewActivity from "../screens/ViewActivity";

const AppNavigator = createStackNavigator({
    Drawer: DrawerNavigator,
    ViewDeliveryPitch: {
        screen: ViewDeliveryPitch,
        navigationOptions: {
            gestureEnabled: false
        },
    },
    ViewActivity: {
        screen: ViewActivity,
        navigationOptions: {
            gestureEnabled: false
        },
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Drawer',
});

export default AppNavigator;