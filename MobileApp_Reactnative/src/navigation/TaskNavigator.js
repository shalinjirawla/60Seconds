import { createStackNavigator } from 'react-navigation-stack';
import ViewDelivery from "../screens/ViewDelivery";
import SelectRecipient from "../screens/SelectRecipient";
import TaskList from '../screens/TaskList';
import { Recording, AudioPlayback } from '../screens/Rehearse';
import { VideoRecorder, VideoRehearse } from "../screens/Delivery";
import Pending from '../screens/Pending';
import Confirmation from '../screens/Confirmation';
import Task from '../screens/Task';
import Rehearse from "../screens/Task/Rehearse";

const TaskNavigator = createStackNavigator({
    Task: {
        screen: Task,
        navigationOptions: {
            headerShown: false
        }
    },
    ViewDelivery: {
        screen: ViewDelivery,
        navigationOptions: {
            gestureEnabled: false
        },
    },
    SelectRecipient: {
        screen: SelectRecipient,
        navigationOptions: {
            gestureEnabled: false
        },
    },
    TaskList: {
        screen: TaskList,
        navigationOptions: {
            gestureEnabled: false
        },
    },
    Rehearse: {
        screen: Rehearse,
        navigationOptions: {
            gestureEnabled: true
        },
    },
    Recording: {
        screen: Recording,
        navigationOptions: {
            gestureEnabled: true
        },
    },
    AudioPlayback: {
        screen: AudioPlayback,
        navigationOptions: {
            gestureEnabled: true
        },
    },
    VideoRehearse: {
        screen: VideoRehearse,
        navigationOptions: {
            gestureEnabled: true
        },
    },
    VideoRecorder: {
        screen: VideoRecorder,
        navigationOptions: {
            headerShown: false
        },
    },
    Confirmation: {
        screen: Confirmation,
        navigationOptions: {
            gestureEnabled: true
        },
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Task',
});

export default TaskNavigator;