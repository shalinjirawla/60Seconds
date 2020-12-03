import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal, Dimensions, Image, StyleSheet, Switch, Slider } from 'react-native';
import SegmentedControlTabs from "react-native-segmented-control-tabs";
import Button from "./Button";

const window = Dimensions.get('window');
const ratio = window.width / 421;

const RehersalSettings = (props) => {

    const [fontSizeSelected, setFontSize] = useState(1);
    const [autoScrollSelected, setAutoScroll] = useState(1);
    const [scrollSpeed, setScrollSpeed] = useState(30);

    const submitChanges = () => {
        let font = 24;
        let autocueStatus = true;
        let autocueSpeedDelivery = 10.00;

        // setting fontSize
        if (fontSizeSelected === 0) {
            font = 18;
        } else if (fontSizeSelected === 1) {
            font = 24;
        } else {
            font = 30;
        }

        const deliverySettings = { ...props.deliverySettings }

        deliverySettings.font = font;
        deliverySettings.speed = autocueSpeedDelivery;
        deliverySettings.autocueStatus = autocueStatus

        console.log("settings in setting screen = ", deliverySettings)
        props.onClose(false);
        props.setDeliverySettings(deliverySettings)
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
        >
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22
            }}>
                <View style={{
                    margin: 20,
                    backgroundColor: "#fff",
                    borderRadius: 7,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    width: 388 * ratio,
                    height: 532 * ratio,
                }}>
                    { /** heading */}
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 23 * window.width / 421,
                        width: '100%',
                        justifyContent: 'center'
                    }}>
                        <Text style={{ color: '#1469AF', fontSize: 20 * ratio, alignSelf: 'center' }}>{'Options'}</Text>
                        <TouchableOpacity
                            style={{ position: 'absolute', right: 21 }}
                            onPress={() => props.onClose(false)}
                        >
                            <Image
                                style={{ width: 20 * ratio, height: 20 * ratio, resizeMode: 'contain', tintColor: "#000", }}
                                source={require('../../assets/icon-close.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    { /** controls */}
                    <View style={{
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',

                    }}>
                        { /** font size */}
                        <View>
                            <Text style={{ color: '#536278', fontSize: 15 * ratio, }}>Font Size</Text>
                            <SegmentedControlTabs
                                values={[
                                    <Text style={[{
                                        color: '#fff',
                                        fontSize: 18 * ratio
                                    }, fontSizeSelected !== 0 && { color: '#1469AF' }]}>Small</Text>,
                                    <Text style={[{
                                        color: '#fff',
                                        fontSize: 24 * ratio
                                    }, fontSizeSelected !== 1 && { color: '#1469AF' }]}>Medium</Text>,
                                    <Text style={[{
                                        color: '#fff',
                                        fontSize: 30 * ratio,
                                        alignSelf: 'center',
                                    },
                                    fontSizeSelected !== 2 && { color: '#1469AF' }]}>Large</Text>
                                ]}
                                handleOnChangeIndex={(value) => setFontSize(value)}
                                selectedIndexes={[fontSizeSelected]}
                                activeIndex={0}
                                tabsContainerStyle={{
                                    width: 346 * ratio,
                                    height: 53 * window.width / 421,
                                    borderTopLeftRadius: 7,
                                    borderBottomLeftRadius: 7,
                                    borderTopRightRadius: 7,
                                    borderBottomRightRadius: 7,
                                    marginTop: 4
                                }}
                                lastTabStyle={{
                                    borderTopRightRadius: 7,
                                    borderBottomRightRadius: 7
                                }}
                                selectedTabStyle={{
                                    backgroundColor: '#1469AF',
                                }}
                                tabStyle={{ borderWidth: 1, borderColor: '#89AECC', }}
                            />
                        </View>

                        { /** theme */}
                        <View>
                            <Text style={{ color: '#536278', fontSize: 15 * ratio, }}>Auto Scroll</Text>
                            <SegmentedControlTabs
                                values={[
                                    <Text style={[{
                                        color: '#fff',
                                        fontSize: 16 * ratio
                                    }, autoScrollSelected !== 0 && { color: '#1469AF' }]}>Off</Text>,
                                    <Text style={[{
                                        color: '#fff',
                                        fontSize: 16 * ratio
                                    }, autoScrollSelected !== 1 && { color: '#1469AF' }]}>On</Text>
                                ]}
                                handleOnChangeIndex={(value) => setAutoScroll(value)}
                                selectedIndexes={[autoScrollSelected]}
                                activeIndex={0}
                                tabsContainerStyle={{
                                    width: 346 * ratio,
                                    height: 53 * window.width / 421,
                                    borderTopLeftRadius: 7,
                                    borderBottomLeftRadius: 7,
                                    borderTopRightRadius: 7,
                                    borderBottomRightRadius: 7,
                                    marginTop: 4
                                }}
                                lastTabStyle={{
                                    borderTopRightRadius: 7,
                                    borderBottomRightRadius: 7
                                }}
                                selectedTabStyle={{
                                    backgroundColor: '#1469AF',
                                }}
                                tabStyle={{ borderWidth: 1, borderColor: '#89AECC', }}
                            />
                        </View>

                        { /** scroll speed */}
                        <View style={{ flexDirection: 'column', width: 346 * ratio, }}>
                            <Text style={{ color: '#536278', fontSize: 15 * ratio, }}>Scroll Speed</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={100}
                                    value={scrollSpeed}
                                    minimumTrackTintColor={'#1469AF'}
                                    maximumTrackTintColor={'#1469AF'}
                                    style={{ width: 346 * ratio }}
                                    thumbTintColor={'#1469AF'}
                                    onValueChange={(speed) => setScrollSpeed(speed)}
                                    trackStyle={{ height: 0 }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#1469AF', fontSize: 12 * ratio, }}>{'10'}</Text>
                                {(scrollSpeed >= 10 && scrollSpeed <= 90) &&
                                    <Text style={{ left: scrollSpeed * (346 * ratio - 45) / 100, position: 'absolute', textAlign: 'center', width: 45, color: '#1469AF', fontSize: 14 }}>
                                        {Math.floor(scrollSpeed).toFixed(2)}
                                    </Text>}
                                <Text style={{ color: '#1469AF', fontSize: 12 * ratio, }}>{'100'}</Text>
                            </View>
                        </View>

                        { /** save & close button */}
                        <Button label={"Save & Close"} onPress={submitChanges}
                            buttonStyle={{
                                backgroundColor: "transparent",
                                marginBottom: 12,
                                paddingVertical: 12,
                                borderWidth: StyleSheet.hairlineWidth,
                                borderColor: '#89AECC',
                                width: 212 * ratio,
                                height: 51 * ratio,
                                alignSelf: 'center'
                            }}
                            textStyle={{ color: '#1469AF', fontSize: 16 }}
                        />
                    </View>
                </View>
            </View>
        </Modal>

    );
}

export default RehersalSettings;
