import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Dimensions } from 'react-native';
import Text from "./Text";
import SegmentedControlTabs from 'react-native-segmented-control-tabs';
import Accordion from 'react-native-collapsible/Accordion';
import { RenderTaskStatusIcon, RenderTaskStatusTextColor } from "../utils/TaskStatus";
import { TimeSinceThen } from "../utils/TimeSinceThen";

const window = Dimensions.get('window');
const ratio = window.width / 421;

const TaskCard = (props) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activeSections, setActiveSections] = useState([]);

    const handleSelectedIndex = index => {
        setSelectedIndex(index);

        if (index === 0) {
            props.navigation.navigate('Scenario');
        } else if (index === 1) {
            props.navigation.navigate('Script');
        } else if (index === 2) {
            props.navigation.navigate('Rehearse');
        } else if (index === 3) {
            props.navigation.navigate('VideoRehearse');
        }
    };


    const renderHeader = (section, _, isActive) => {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    backgroundColor: '#F1F7FF',
                    borderBottomWidth: 1,
                    borderBottomColor: '#D1E4F5'
                }}>
                <View style={{ flexDirection: 'row', margin: 20 }}>
                    <View style={{ flex: .9, flexDirection: 'row' }}>
                        <Image
                            style={{ width: 15, height: 15, resizeMode: 'contain', marginTop: 3 }}
                            source={require('../../assets/Pending_approval_Activity_2.png')}
                        />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{
                                fontSize: 16,
                                marginLeft: 8,
                                color: '#536278'
                            }}
                                value={section.title} />
                            {isActive && <Text style={{
                                fontSize: 16,
                                marginLeft: 8,
                                color: '#9FADC1'
                            }}
                                value={section.datetime} />}
                        </View>
                    </View>
                    <Image
                        style={{ width: 10, height: 10, resizeMode: 'contain', flex: .1, justifyContent: 'center', alignSelf: 'center' }}
                        source={isActive ? require('../../assets/Arrow-up.png') : require('../../assets/Arrow-down.png')}
                    />
                </View>
            </View>
        );
    };

    const renderContent = (section, _) => {
        return (
            section.content && section.content.map((content, index) => {
                return (
                    <View key={index} style={{ flexDirection: 'column', margin: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: .6, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 27 * ratio, height: 27 * ratio, resizeMode: 'contain' }}
                                    source={RenderTaskStatusIcon(content.action)}
                                />
                                <Text
                                    style={{ fontSize: 16, color: RenderTaskStatusTextColor(content.action), marginLeft: 5 }}
                                    value={content.title}
                                />
                            </View>
                            <Text
                                style={{ fontSize: 12, flex: .4, textAlign: 'right', color: RenderTaskStatusTextColor(content.action) }}
                                value={content.datetime}
                            />
                        </View>
                        {content.description !== null && content.description !== "" &&
                            <View style={{ flexDirection: 'row' }}>

                                <Text
                                    style={{ fontSize: 16, marginLeft: 30, marginTop: 10, color: '#536278' }}
                                    value={content.description}
                                />

                            </View>}

                    </View>
                );
            })

        );
    }

    const getPerformedActions = (actions) => {
        return actions && actions.map((performedAction) => {
            return { title: performedAction.message.mobileBottom_Message ? performedAction.message.mobileBottom_Message : "Loading...", action: performedAction.action, datetime: TimeSinceThen(performedAction.createdOn) }
        });
    }

    const setSections = sections => {
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };

    return (
        <View style={{ width: '100%', backgroundColor: '#fff', borderRadius: 12, marginBottom: 15 }}>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Task', {
                    taskDetails: props.data,
                    activeIndex: 2
                })}
                style={{
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20
                }}>
                <SegmentedControlTabs
                    values={[
                        <Image
                            style={{ width: '45%', height: '45%', resizeMode: 'contain' }}
                            source={require('../../assets/Scenario_active_icon.png')}
                        />,
                        <Image
                            style={{ width: '45%', height: '45%', resizeMode: 'contain' }}
                            source={require('../../assets/Script_active_icon.png')}
                        />,
                        <Image
                            style={{ width: '45%', height: '45%', resizeMode: 'contain' }}
                            source={require('../../assets/Audio_Rehearse_active_icon.png')}
                        />,
                        <Image
                            style={{ width: '30%', height: '30%', resizeMode: 'contain' }}
                            source={require('../../assets/Video_Rehearse_active_icon.png')}
                        />,
                    ]}
                    handleOnChangeIndex={handleSelectedIndex}
                    activeIndex={selectedIndex}
                    selectedIndexes={[0]}
                    selectedTabStyles={[{ backgroundColor: '#fff', borderBottomRightRadius: 20, borderTopRightRadius: 20 }]}
                    tabsContainerStyle={{
                        width: '100%',
                        height: 35,
                        backgroundColor: '#EAF3FF',
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        borderColor: '#EAF3FF',
                        borderWidth: 1.3
                    }}
                    activeTabStyle={{
                        borderBottomColor: "rgb(255,177,120)",
                        borderBottomWidth: 3,
                        borderColor: "rgb(213,228,241)",
                        zIndex: 1,
                    }}
                    firstTabStyle={{
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                    }}
                    lastTabStyle={{
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                    }}
                    tabStyle={{
                        borderColor: 'transparent'
                    }}
                />

                <Text style={{ color: '#668196', fontSize: 12, marginTop: 16, marginBottom: 6 }} value={props.data ? props.data.mobileTop_Message : 'Loading...'} />
                <Text style={{ color: '#1B3964', fontSize: 17, marginTop: 6 }} value={props.data ? props.data.taskTitle : 'Loading...'} />
            </TouchableOpacity>
            <Accordion
                containerStyle={{ marginTop: 10, width: '100%', backgroundColor: '#F1F7FF', }}
                activeSections={activeSections}
                sections={[
                    {
                        title: props.data ? props.data.mobileBottom_Message : 'Loading...',
                        content: getPerformedActions(props.data.performedActions),
                        datetime: TimeSinceThen(props.data.mobileBottom_DateTime)
                    }
                ]}
                touchableComponent={TouchableOpacity}
                expandMultiple={false}
                renderHeader={renderHeader}
                renderContent={renderContent}
                duration={400}
                onChange={setSections}
            />
        </View>

    );
}



export default TaskCard;