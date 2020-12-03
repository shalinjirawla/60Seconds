import React, { useState, useContext, useEffect } from "react";
import { Text, View, TouchableOpacity, Modal, Dimensions, Image, StyleSheet, Switch, Slider } from 'react-native';
import SegmentedControlTabs from "react-native-segmented-control-tabs";
import Button from "./Button";
const window = Dimensions.get('window');
const ratio = window.width / 421;

const DeliverySettings = (props) => {

    const [fontSizeSelected, setFontSize] = useState(1);
    const [themeSelected, setTheme] = useState(2);
    const [backgroundSelected, setBackground] = useState(2);
    const [isAutocueActive, setAutocue] = useState(true);
    const [autocueSpeed, setAutocueSpeed] = useState(10);

    const submitChanges = async () => {

        let font = 24;
        let theme = 'blue';
        let bgColor = 'plain';
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

        // setting theme
        if (themeSelected === 0) {
            theme = 'balck';
        } else if (themeSelected === 1) {
            theme = 'white';
        } else if (themeSelected === 2) {
            theme = 'blue';
        } else {
            theme = 'orange';
        }

        if (backgroundSelected === 0) {
            bgColor = 'emma';
        } else if (backgroundSelected === 1) {
            bgColor = 'tony';
        } else {
            bgColor = 'plain';
        }

        autocueStatus = isAutocueActive;
        autocueSpeedDelivery = autocueSpeed;

        const deliverySettings = { ...props.deliverySettings }
        console.log("deliverySettings", deliverySettings)

        deliverySettings.font = font;
        deliverySettings.theme = theme;
        deliverySettings.background = bgColor;
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
                    height: 649 * ratio,
                }}>
                    { /** heading */}
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 23 * window.width / 421,
                        width: '100%',
                        justifyContent: 'center'
                    }}>
                        <Text style={{ color: '#1469AF', fontSize: 20 * ratio, alignSelf: 'center' }}>{'Delivery Settings'}</Text>
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
                            <Text style={{ color: '#536278', fontSize: 15 * ratio, }}>Theme</Text>
                            <SegmentedControlTabs
                                values={[
                                    <Text style={[{
                                        color: '#fff',
                                        fontSize: 16 * ratio
                                    }, themeSelected !== 0 && { color: '#1469AF' }]}>Black</Text>,
                                    <Text style={[{
                                        color: '#fff',
                                        fontSize: 16 * ratio
                                    }, themeSelected !== 1 && { color: '#1469AF' }]}>White</Text>,
                                    <Text style={[{
                                        color: '#fff',
                                        fontSize: 16 * ratio
                                    }, themeSelected !== 2 && { color: '#1469AF' }]}>Blue</Text>,
                                    <Text style={[{
                                        color: '#fff',
                                        fontSize: 16 * ratio
                                    }, themeSelected !== 3 && { color: '#1469AF' }]}>Orange</Text>,
                                ]}
                                handleOnChangeIndex={(value) => setTheme(value)}
                                selectedIndexes={[themeSelected]}
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
                        { /** background */}
                        <View>
                            <Text style={{ color: '#536278', fontSize: 15 * ratio, }}>Background</Text>
                            <SegmentedControlTabs
                                values={[
                                    <Text style={[{
                                        color: '#fff',
                                        fontSize: 16 * ratio
                                    }, backgroundSelected !== 0 && { color: '#1469AF' }]}>Emma</Text>,
                                    <Text style={[{
                                        color: '#fff',
                                        fontSize: 16 * ratio
                                    }, backgroundSelected !== 1 && { color: '#1469AF' }]}>Tony</Text>,
                                    <Text style={[{
                                        color: '#fff',
                                        fontSize: 16 * ratio
                                    }, backgroundSelected !== 2 && { color: '#1469AF' }]}>Plain</Text>,
                                ]}
                                handleOnChangeIndex={(value) => setBackground(value)}
                                selectedIndexes={[backgroundSelected]}
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

                        {/** autocue */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 348 * ratio, }}>
                            <Text style={{ color: '#536278', fontSize: 15 * ratio, }}>Autocue</Text>
                            <Switch
                                onValueChange={() => setAutocue(!isAutocueActive)}
                                value={isAutocueActive}
                                label={'Autocue'}
                                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                        </View>

                        { /** autocue speed */}
                        <View style={{ flexDirection: 'column', width: 346 * ratio, }}>
                            <Text style={{ color: '#536278', fontSize: 15 * ratio, }}>Autocue Speed</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={100}
                                    value={autocueSpeed}
                                    minimumTrackTintColor={'#1469AF'}
                                    maximumTrackTintColor={'#1469AF'}
                                    style={{ width: 346 * ratio }}
                                    thumbTintColor={'#1469AF'}
                                    onValueChange={(speed) => setAutocueSpeed(speed)}
                                    trackStyle={{ height: 0 }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#1469AF', fontSize: 12 * ratio, }}>{'Slow'}</Text>
                                {(autocueSpeed >= 10 && autocueSpeed <= 90) &&
                                    <Text style={{ left: autocueSpeed * (346 * ratio - 45) / 100, position: 'absolute', textAlign: 'center', width: 45, color: '#1469AF', fontSize: 14 }}>
                                        {Math.floor(autocueSpeed).toFixed(2)}
                                    </Text>}
                                <Text style={{ color: '#1469AF', fontSize: 12 * ratio, }}>{'Fast'}</Text>
                            </View>
                        </View>
                        { /** save changes button */}
                        <Button label={"Save Changes"} onPress={() => submitChanges()}
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

export default DeliverySettings;
