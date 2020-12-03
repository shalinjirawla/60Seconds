import React from "react";
import { Text, View, TouchableWithoutFeedback, Modal, Dimensions, Image, ScrollView, TouchableOpacity, } from 'react-native';
import Button from "../Button";

const window = Dimensions.get('window');
const ratio = window.width / 421;

const UnreadActivities = (props) => {

    const renderIconByStatus = (type) => {
        if (type === "script") {
            return require(`../../../assets/Approved_Activity_highlighted.png`);
        }
        else if (type === "feedback") {
            return require(`../../../assets/Comments_Activity_highlighted.png`);
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isVisible}
            onDismiss={() => console.log('on dismiss')}
        >
            <TouchableWithoutFeedback onPress={() => props.onClose(true)}>
                <View
                    style={{
                        flex: 1
                    }}>
                    <>
                        <View style={{ transform: [{ rotateZ: '45deg' }], width: 15, height: 15, backgroundColor: '#fff', marginTop: '22%', alignSelf: 'flex-end', marginRight: 40, elevation: 10, zIndex: 10 }}></View>
                        <View style={{
                            backgroundColor: "#fff",
                            borderRadius: 12,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0
                            },
                            shadowOpacity: 0.25,
                            elevation: 5,
                            width: 388 * ratio,
                            alignSelf: 'center',
                            marginTop: -7.5,
                        }}>
                            { /** modal heading */}
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 23 * window.width / 421,
                                width: '100%'
                            }}>
                                <Text style={{ color: '#1B3964', fontSize: 17, alignSelf: 'center', marginLeft: 20 }}>{`${props.notifications.length} New Activities`}</Text>
                            </View>

                            <View style={{ borderTopWidth: 1, marginTop: 20, borderColor: '#D1E4F5' }} />

                            { /** activity list */}
                            {
                                props.notifications.map((content, index) =>
                                    <TouchableOpacity key={index}>
                                        <View style={{
                                            flexDirection: 'column',
                                            // flex: 1,
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            marginLeft: 20,
                                            marginRight: 20
                                        }}>
                                            <View style={{ flexDirection: 'column', margin: 15, width: '100%' }}>
                                                <View style={{ flexDirection: 'row' }}>

                                                    <View style={{ flex: .6, flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image
                                                            style={{ width: 30, height: 30, resizeMode: 'contain' }}
                                                            source={renderIconByStatus(content.type)}
                                                        />
                                                        <Text
                                                            style={{ fontSize: 14, color: '#FD6F2A', marginLeft: 10 }}
                                                        >{content.title}</Text>
                                                    </View>

                                                    <View style={{ flex: .4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                        <Text
                                                            style={{ fontSize: 12, color: '#536278' }}
                                                        >{content.datetime}
                                                        </Text>
                                                    </View>

                                                </View>
                                                {
                                                    content.description !== null && content.description !== "" &&
                                                    <View style={{ flexDirection: 'row', marginLeft: 40 }}>
                                                        <Text
                                                            style={{ fontSize: 14, marginTop: 10, color: '#536278' }}
                                                        >{content.description}
                                                        </Text>
                                                    </View>
                                                }
                                                {
                                                    content.descriptionTwo !== null && content.descriptionTwo !== "" &&
                                                    <View style={{ flexDirection: 'row', marginLeft: 40 }}>
                                                        <Text
                                                            style={{ fontSize: 12, marginTop: 10, color: '#536278' }}
                                                        >{content.descriptionTwo}
                                                        </Text>
                                                    </View>
                                                }
                                            </View>

                                        </View>
                                        <View style={{ borderTopWidth: 1, marginTop: 20, marginBottom: 5 * ratio, borderColor: '#D1E4F5' }} />
                                    </TouchableOpacity>
                                )
                            }
                            <Button label={"View All"} onPress={() => {
                                props.onClose(true);
                                props.navigation.navigate("Activity");
                            }}
                                buttonStyle={{
                                    backgroundColor: "transparent",
                                    marginBottom: 5 * ratio,
                                    paddingVertical: 12,
                                    width: 212 * ratio,
                                    alignSelf: 'center'
                                }}
                                textStyle={{ color: '#1B3964', fontSize: 16, textDecorationLine: 'underline', }}
                            />
                        </View>
                    </>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default UnreadActivities;
