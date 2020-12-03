
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import TaskNavigator from './TaskNavigator';

const RootNavigator = createStackNavigator({
    Auth: AuthNavigator,
    App: AppNavigator,
    Task: TaskNavigator
}, {
    headerMode: 'none',
    initialRouteName: 'Auth',
});

export default createAppContainer(RootNavigator);