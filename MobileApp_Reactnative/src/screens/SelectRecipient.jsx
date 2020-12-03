import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions, StyleSheet, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'

import Button from "../components/Button";
import FullScreenLoader from "../components/FullScreenLoader";
import { getRecipientsAPI, postTaskAPI } from '../store/actions/task'

const window = Dimensions.get('window');
const ratio = window.width / 421;

const SelectRecipient = ({ navigation, loading, recipients, getRecipientsAPI, scenario, script, postTaskAPI }) => {

    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [isFetching, shouldFetch] = useState(false);

    useEffect(() => {
        getRecipientsAPI()
    }, [])

    const onSubmit = () => {
        shouldFetch(true);
        let scriptContents = [];
        let taskAssignments = []
        Object.keys(script).forEach(scriptId => scriptContents.push({
            scriptFieldId: Number.parseInt(scriptId),
            scriptFieldvalue: script[scriptId]
        }))
        selectedRecipients.filter(s => s.selected).forEach(assignment => taskAssignments.push({
            assignedTo: assignment.id
        }))
        scenario.scenarioKeywords = [{
            "keywordId": 1,
            "name": "string"
        }]
        let task = {
            title: scenario.scenarioTitle,
            scenario: scenario,
            scriptContents: scriptContents,
            taskAssignments: taskAssignments
        }
        postTaskAPI(task, () => shouldFetch(false), navigation.navigate("Confirmation"))
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={index}
                style={[{
                    width: 366 * ratio,
                    height: 91 * ratio,
                    alignSelf: 'center',
                    backgroundColor: '#fff',
                    marginBottom: 17 * ratio,
                    borderRadius: 6,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }, item.selected ? {
                    borderWidth: 1.5,
                    borderColor: '#1469AF'
                } : {}]}
                onPress={() => {
                    let recipientsNew = recipients;
                    recipientsNew[index].selected = !recipientsNew[index].selected;
                    setSelectedRecipients([...recipientsNew]);
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 17,
                        width: '60%'
                    }}>
                    <Image
                        style={{ width: 71 * ratio, height: 71 * ratio, resizeMode: 'contain' }}
                        source={item.pictureUrl ? item.pictureUrl : require('../../assets/Profile_menu_active.png')}
                    />
                    <View style={{ flexDirection: 'column', marginLeft: 17 }}>
                        <Text style={{ fontSize: 18 * ratio, color: '#1B3964' }} numberOfLines={1}>{`${item.firstName} ${item.lastName}`}</Text>
                        <Text style={{ fontSize: 14, color: '#536278' }}>{item.role}</Text>
                    </View>

                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 17
                }}>
                    {item.selected ?
                        <Image
                            style={{ width: 37 * ratio, height: 37 * ratio, resizeMode: 'contain', marginRight: 0, }}
                            source={require('../../assets/selected-tick.png')}
                        />
                        :
                        <Image
                            style={{ width: 37 * ratio, height: 37 * ratio, resizeMode: 'contain', marginRight: 0, }}
                            source={require('../../assets/un-selected-tick.png')}
                        />
                    }
                </View>
            </TouchableOpacity >)
    }

    const renderListFooter = () => {
        return (
            <Button
                label={"SUBMIT"}
                onPress={onSubmit}
                buttonStyle={{
                    backgroundColor: selectedRecipients.some(recipient => recipient.selected) ? "rgb(53,154,219)" : "#ccc",
                    marginTop: 20,
                    marginBottom: 12,
                    paddingVertical: 12,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: "rgba(255,255,255,0.7)"
                }}
                textStyle={{ color: '#fff', fontWeight: 'bold' }}
                buttonProps={{ disabled: selectedRecipients.some(recipient => recipient.selected) ? false : true }}
            />
        );
    }

    return (
        <>
            <View style={styles.container} >
                <ImageBackground source={require('../../assets/header_bar2.png')} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain', top: 0, justifyContent: 'center', }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 43 * ratio,
                        width: 366 * ratio,
                        alignSelf: 'center'
                    }}>
                        <Text style={{ color: '#fff', fontSize: 21 * ratio }}>{'Select recipient'}</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                                <Text style={{ color: '#fff', fontSize: 15 * ratio }}>{'CANCEL'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{}} onPress={() => selectedRecipients.some(recipient => recipient.selected) ? onSubmit : null}>
                                <Text style={{ color: '#fff', fontSize: 15 * ratio, fontWeight: '900' }}>{'SUBMIT'}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ImageBackground>

                {loading && <ActivityIndicator size="large" color="#40A5FF" style={{ marginTop: 10 * ratio }} />}

                {recipients && recipients.length === 0 && <Text style={{ color: '#1B3964', fontSize: 17, alignSelf: 'center', height: 40, marginTop: 10 * ratio }}>{`No results found.`}</Text>}

                {
                    recipients && recipients.length > 0 &&
                    <FlatList
                        renderItem={renderItem}
                        ListFooterComponent={renderListFooter}
                        data={recipients}
                        style={{
                            position: 'absolute',
                            top: 89 * ratio,
                            width: '100%',
                            height: window.height - 89 * ratio
                        }}
                        contentContainerStyle={{ alignSelf: 'center' }}
                        keyExtractor={(item, index) => 'key' + index}
                    />
                }
            </View >
            <FullScreenLoader isFetching={loading} />
        </>
    );
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E1EEFE',
    },
    backgroundImage: {
        width: window.width,
        height: 253 * window.width / 598
    }
});

const mapStateToProps = (state) => ({
    loading: state.task.getRecipientsLoading,
    recipients: state.task.recipients,
    error: state.task.getRecipientsError,
    scenario: state.task.scenario,
    script: state.task.script
})

export default connect(mapStateToProps, { getRecipientsAPI, postTaskAPI })(SelectRecipient);