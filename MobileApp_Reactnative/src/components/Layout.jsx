import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Image } from 'react-native';
import { Dimensions } from 'react-native';
import Text from "./Text";
import UnreadActivities from "../components/Home/UnreadActivities";
import { handlePermission } from '../utils/handlePermission'
import { TASK_CREATE } from '../constants/permissions'

const window = Dimensions.get('window');
const ratio = window.width / 421;

const Layout = (props) => {

    const [isUnreadActivitiesVisible, showUnreadActivities] = useState(false);
    const [notifications, setNotifications] = useState([
        { title: 'Script Approved', description: null, descriptionTwo: 'Manager, John Appleseed', type: 'script', datetime: '2h ago' },
        { title: 'Manager’s Feedback', description: 'You might consider using better sales teminology', descriptionTwo: 'Manager, John Appleseed', type: 'feedback', datetime: '27 Feb - 10.26 am' }
    ]);

    return (
        <>
            <View style={styles.container} >
                <ImageBackground source={require('../../assets/header_bg.png')} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain', flex: 1, top: 0, height: '100%' }}>

                    <View style={{
                        marginLeft: 20,
                        marginRight: 20
                    }}>
                        {/* Logo and notification */}
                        <View style={{
                            width: '100%',
                            // position: 'absolute',
                            // top: '28%',
                            marginTop: 48 * ratio,
                            // left: 0,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Image
                                    style={{ height: 56, width: 56, resizeMode: 'contain', }}
                                    source={require('../../assets/logo.png')}
                                />
                                <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 19, color: '#FFFFFF', fontWeight: 'bold' }} value={`60 Seconds`} />
                                    <Text style={{ fontSize: 14, color: '#FFFFFF', fontWeight: '300', lineHeight: 19, }} value={`Perform Better`} />
                                </View>
                            </View>

                            {notifications.length !== 0 &&
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center',
                                        width: 56
                                    }}
                                    onPress={() => showUnreadActivities(true)}
                                >
                                    <ImageBackground
                                        style={{ width: 40, height: 40 }}
                                        imageStyle={{ resizeMode: 'contain' }}
                                        source={require('../../assets/Activity_icon.png')}
                                    >
                                        <Text style={{ fontSize: 14, color: '#FD6F2A', fontWeight: 'bold', alignSelf: 'center', marginTop: 2 }} value={notifications.length} />
                                    </ImageBackground>
                                </TouchableOpacity>
                            }

                            {notifications.length === 0 &&
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center',
                                        width: 56
                                    }}
                                    onPress={() => null}
                                >
                                    <ImageBackground
                                        style={{ width: 35, height: 35 }}
                                        imageStyle={{ resizeMode: 'contain' }}
                                        source={require('../../assets/Activity_icon_zero.png')}
                                    >
                                    </ImageBackground>
                                </TouchableOpacity>
                            }

                        </View>

                        {/* Heading */}
                        <View style={{ marginTop: 30 * ratio, flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                            {
                                props.goBack &&
                                <TouchableOpacity onPress={() => props.navigation.goBack()} >
                                    <Image
                                        style={{ width: 20 * ratio, height: 20 * ratio, resizeMode: 'contain', }}
                                        source={require('../../assets/icon-back.png')}
                                    />
                                </TouchableOpacity>
                            }
                            <Text style={{ fontSize: 22, color: '#FFFFFF', marginLeft: 5 }} value={`${props.title}${props.notificationCount ? ` (${props.notificationCount})` : ''}`} />
                        </View>

                        {/* Create new task icon*/}
                        {
                            props.actionButtonScreen && props.actionButtonScreen !== "" &&

                            <TouchableOpacity
                                onPress={() => {
                                    typeof props.actionButton === 'function' && props.actionButton()
                                    props.navigation.navigate(props.actionButtonScreen)
                                }
                                }
                                style={{
                                    borderWidth: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 56,
                                    position: 'absolute',
                                    // top: '70%',
                                    right: 0,
                                    marginTop: 122 * ratio,
                                    height: 56,
                                    borderRadius: 100,
                                    alignSelf: 'center'
                                }}
                            >

                                <Image
                                    style={{ width: '120%', height: '120%', resizeMode: 'contain' }}
                                    source={require('../../assets/Create_New_Button.png')}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                </ImageBackground>

                {/*/ render children */}
                {props.children}

                <TouchableOpacity
                    style={{
                        width: 63,
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        height: 63,
                        borderRadius: 100,
                    }}
                    onPress={props.navigation.toggleDrawer}
                >
                    <Image
                        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        source={require('../../assets/Main_Menu_icon-Menu.png')}
                    />
                </TouchableOpacity>
            </View>
            {isUnreadActivitiesVisible && <UnreadActivities navigation={props.navigation} isVisible={isUnreadActivitiesVisible} onClose={() => showUnreadActivities(false)} notifications={notifications} />}
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
        height: 398 * window.width / 828
    },
});

export default Layout;