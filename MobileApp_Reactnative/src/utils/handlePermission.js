import React, { useEffect, useState } from 'react'
import Storage from '../api/Storage'
import { ActivityIndicator, View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native'

export const handlePermission = (permission, Component) => {
    const [permissions, setPermissions] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            let allPermissions = await Storage.get('permissions')
            setLoading(false)
            setPermissions(allPermissions);
        })()

    }, [permissions, loading])

    return loading ?
        <ActivityIndicator size="small" /> :
        permissions && permissions.findIndex(p => p.permissionName === permission) > -1 ? Component : <View />

}

export const readOnlyPermission = (permission) => {
    const [permissions, setPermissions] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            let allPermissions = await Storage.get('permissions')
            setLoading(false)
            setPermissions(allPermissions);
        })()

    }, [permissions, loading])

    return loading ?
        false :
        permissions && permissions.findIndex(p => p.permissionName === permission) > -1
}

export const showUnauthMessage = (permission, handleAction) => {
    const [showModal, setShowModal] = useState(true)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            let allPermissions = await Storage.get('permissions')
            setLoading(false)
            setShowModal(allPermissions.findIndex(p => p.permissionName === permission) > -1 ? false : true)
        })()
    }, [permission, showModal])

    const handleBackButton = () => {
        setShowModal(false)
        setLoading(false)
        typeof handleAction === 'function' && handleAction()
    }
    return (
        <Modal
            animationType="slide"
            //transparent={true}
            visible={showModal}
            onRequestClose={() => {
            }}
        >
            <View style={styles.centeredView}>
                {
                    loading ?
                        <ActivityIndicator size="small" /> :
                        <>
                            <Text style={styles.modalText}>You dont have permission to view this page</Text>
                            <TouchableOpacity onPress={handleBackButton}>
                                <Text style={styles.buttonText}>Back</Text>
                            </TouchableOpacity>
                        </>
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#0b5fa1",
        alignItems: "center",
        padding: 20,
    },
    modalText: {
        color: '#ffff',
        fontSize: 24,
        textAlign: 'center',
    },
    buttonText: {
        marginTop: 15,
        color: '#ffff',
        textDecorationLine: 'underline'
    }


});