import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import { getBUKeywords } from "../store/actions/task";
import { getProfileAPI } from "../store/actions/profile";

import { connect } from 'react-redux'
import Storage from "../api/Storage";

const Loading = ({ navigation, keywords, loading, failed, getBUKeywords, getProfileAPI }) => {

    useEffect(() => {
        fetchKeywords();
        getProfileAPI()
    }, []);

    useEffect(() => {

        if (!loading)
            saveKeywords(), redirectToScreen();
    }, [loading]);

    // get keywords
    fetchKeywords = async () => {
        const token = await AsyncStorage.getItem('token') || null;
        if (JSON.parse(token))
            getBUKeywords(1, 100000);
        else
            redirectToScreen()
    }

    saveKeywords = async () => {
        await Storage.set("keywords", JSON.stringify(keywords));
    }

    redirectToScreen = async () => {
        const token = await AsyncStorage.getItem('token');
        if (JSON.parse(token)) {
            navigation
                .dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'App',
                            params: {},
                        }),
                    ],
                }));
        }
        else {
            navigation.navigate("Login");
        }
    }

    return (
        <ImageBackground source={require('../../assets/splash.png')} style={styles.backgroundImage} imageStyle={{ resizeMode: 'cover' }} />
    );
}

var styles = StyleSheet.create({
    backgroundImage: {
        height: '100%'
    }
});

const mapStateToProps = (state) => ({
    keywords: state.task.keywords,
    loading: state.task.keywordsLoading,
    failed: state.task.keywordsFailed
})

export default connect(mapStateToProps, { getBUKeywords, getProfileAPI })(Loading);