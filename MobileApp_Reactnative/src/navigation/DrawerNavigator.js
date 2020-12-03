import { Dimensions } from 'react-native';
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Gallery from "../screens/Gallery";
import Activity from "../screens/Activity";
import Pending from "../screens/Pending";
import { createDrawerNavigator } from "react-navigation";
import CustomDrawerNavigator from "./CustomDrawerNavigator";

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            navigationOptions: {
                title: "Home",
                drawerLabel: "HOME",
                drawerIcon: require('../../assets/Home_menu.png'),
                drawerIconSelected: require('../../assets/Home_menu_active.png'),
            },
            screen: Home
        },
        Gallery: {
            navigationOptions: {
                title: "Gallery",
                drawerLabel: "GALLERY",
                drawerIcon: require('../../assets/Gallery_menu.png'),
                drawerIconSelected: require('../../assets/Gallery_menu_active.png')
            },
            screen: Gallery
        },
        Activity: {
            navigationOptions: {
                gestureEnabled: false,
                title: "Activity",
                drawerLabel: "ACTIVITY",
                drawerIcon: require('../../assets/Activty_menu.png'),
                drawerIconSelected: require('../../assets/Activty_menu_active.png')
            },
            screen: Activity
        },
        Profile: {
            navigationOptions: {
                title: "Profile",
                drawerLabel: "PROFILE",
                drawerIcon: require('../../assets/Profile_menu.png'),
                drawerIconSelected: require('../../assets/Profile_menu_active.png')
            },
            screen: Profile,
            drawerIcon: null
        },
        // Pending: {
        //     navigationOptions: {
        //         title: "Pending",
        //         drawerLabel: "PENDING",
        //         drawerIcon: require('../../assets/Activty_menu.png'),
        //         drawerIconSelected: require('../../assets/Activty_menu_active.png')
        //     },
        //     screen: Pending
        // }
    },
    {
        contentComponent: CustomDrawerNavigator,
        drawerWidth: Dimensions.get('window').width,
        hideStatusBar: true,
        initialRouteName: 'Home'
    }
);

export default DrawerNavigator;