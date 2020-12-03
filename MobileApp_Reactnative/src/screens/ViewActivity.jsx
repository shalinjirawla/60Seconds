import React from "react";
import { TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Dimensions } from 'react-native';
import TaskCard from "../components/TaskCard";
import Layout from "../components/Layout";

const window = Dimensions.get('window');

const ViewActivity = ({ navigation }) => {

    return (
        <Layout title={'Back to Activity'} navigation={navigation} goBack>

            <ScrollView contentContainerStyle={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: '5%'
            }}>
                <TaskCard key={0} navigation={navigation} data={null} />

            </ScrollView>

            <TouchableOpacity
                style={{
                    width: 63,
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    height: 63,
                    borderRadius: 100,
                }}
                onPress={navigation.toggleDrawer}
            >
                <Image
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                    source={require('../../assets/Main_Menu_icon-Menu.png')}
                />
            </TouchableOpacity>

        </Layout>
    );
}

ViewActivity.navigationOptions = () => {
    return {
        title: 'ViewActivity'
    };
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E1EEFE',
    },
    backgroundImage: {
        width: window.width,
        height: 398 * window.width / 828
    },
});

export default ViewActivity;