import React, { useEffect } from 'react'
import { View, Text, Modal, Image, Dimensions } from 'react-native'

const window = Dimensions.get('window');
const ratio = window.width / 421;

const MessageModal = ({ isModalVisible, message, setIsModalVisible }) => {

    useEffect(() => {
        setTimeout(() => {
            setIsModalVisible(false)
        }, 2000);
    }, [isModalVisible])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
                //Alert.alert("Modal has been closed.");
            }}
        >
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22
            }}>
                <View style={{
                    margin: 20,
                    backgroundColor: "rgba(20,94,153,0.9)",
                    borderRadius: 20,
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    width: 364 * ratio,
                    height: 90 * ratio,
                    justifyContent: 'center'
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ width: 46 * ratio, height: 46 * ratio, resizeMode: 'contain', }}
                            source={require('../../assets/green_tick.png')}
                        />
                        <Text style={{ color: '#fff', fontSize: 14 * ratio, marginLeft: 10 }}>{message}</Text>
                    </View>
                </View>
            </View>
        </Modal>

    )
}

export default MessageModal
