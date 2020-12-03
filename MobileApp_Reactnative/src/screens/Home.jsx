import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import * as Sentry from 'sentry-expo';
import TaskCard from "../components/TaskCard";
import Layout from "../components/Layout";
import { getAllTasksAPI, clearTasks } from '../store/actions/task';
import Text from "../components/Text";
import Storage from "../api/Storage";

const window = Dimensions.get('window');

const Home = ({ navigation, getAllTasksAPI, tasks, loading, clearTasks }) => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10000);

    useEffect(() => {
        fetchGetAllTasks();
    }, []);

    useEffect(() => {
        const { params } = navigation.state;
        if (params && params.refetch)
            fetchGetAllTasks();
    }, [navigation.state])

    const fetchGetAllTasks = async () => {
        const { accessToken } = await Storage.get('sixty_data');
        getAllTasksAPI(page, pageSize, accessToken);
        // Sentry.captureException(new Error('Sentry Works!'))
    }

    return (
        <Layout
            title={'Task List'}
            notificationCount={tasks && tasks.length !== 0 ? tasks.length : null}
            navigation={navigation}
            actionButtonScreen={'Task'}
            actionButton={clearTasks}
        >

            <ScrollView contentContainerStyle={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: '5%'
            }}>
                {loading && <ActivityIndicator size="large" color="#40A5FF" />}

                {tasks && tasks.length === 0 && !loading && <Text style={{ color: '#1B3964', fontSize: 17, marginLeft: 20, alignSelf: 'center', height: 40 }} value={`No results found.`} />}

                {tasks && tasks.map((task, index) => <TaskCard key={index} navigation={navigation} data={task} />)}

            </ScrollView>

        </Layout>
    );
}

Home.navigationOptions = () => {
    return {
        title: 'Task List',
        headerRight: null
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

const mapStateToProps = (state) => ({
    tasks: state.task.tasks,
    loading: state.task.getTasksLoading,
    error: state.task.getTasksError
})



export default connect(mapStateToProps, { getAllTasksAPI, clearTasks })(Home);