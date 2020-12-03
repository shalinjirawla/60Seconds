import React from "react";
import { Text, View, Modal, Dimensions, ActivityIndicator } from 'react-native';

const window = Dimensions.get('window');
const ratio = window.width / 421;

const FullScreenLoader = ({ isFetching }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isFetching}
        >
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <View style={{
                    flexDirection: 'column',
                    backgroundColor: "rgba(0,0,0,0.6)",
                    width: window.width,
                    height: window.height,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ color: '#fff', fontSize: 20 * ratio, alignSelf: 'center' }}>{'Loading...'}</Text>
                </View>
            </View>
        </Modal>
    );
}

export default FullScreenLoader;
