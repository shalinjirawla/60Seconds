import React, { useState } from 'react'
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, StyleSheet, } from 'react-native'

import Button from "../components/Button";
import FullScreenLoader from "../components/FullScreenLoader";

const window = Dimensions.get('window');
const ratio = window.width / 421;

const ShareUser = ({ usersToShare, submit, loading }) => {

    const [selectedRecipients, setSelectedRecipients] = useState([]);

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={index}
                style={[{
                    // width: 366 * ratio,
                    // height: 91 * ratio,
                    width: '100%',
                    alignSelf: 'center',
                    backgroundColor: '#fff',
                    marginBottom: 12 * ratio,
                    borderRadius: 6,
                    padding: 6,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }, item.selected ? {
                    borderWidth: 1.5,
                    borderColor: '#1469AF'
                } : {}]}
                onPress={() => {
                    let usersToShareNew = usersToShare;
                    usersToShareNew[index].selected = !usersToShareNew[index].selected;
                    setSelectedRecipients([...usersToShareNew]);
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 17,
                        width: '80%'
                    }}>
                    <Image
                        style={{ width: 50 * ratio, height: 50 * ratio, resizeMode: 'contain' }}
                        source={item.pictureUrl ? item.pictureUrl : require('../../assets/Profile_menu_active.png')}
                    />
                    <View style={{ flexDirection: 'column', marginLeft: 17 }}>
                        <Text style={{ fontSize: 18 * ratio, color: '#1B3964' }} numberOfLines={1}>{item.name}</Text>
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
                            style={{ width: 30 * ratio, height: 30 * ratio, resizeMode: 'contain', marginRight: 0, }}
                            source={require('../../assets/selected-tick.png')}
                        />
                        :
                        <Image
                            style={{ width: 30 * ratio, height: 30 * ratio, resizeMode: 'contain', marginRight: 0, }}
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
                onPress={() => submit(selectedRecipients)}
                buttonStyle={{
                    backgroundColor: selectedRecipients.some(recipient => recipient.selected) ? "rgb(53,154,219)" : "#ccc",
                    marginTop: 10,
                    marginBottom: 10,
                    paddingVertical: 12,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: "rgba(255,255,255,0.7)",

                }}
                textStyle={{ color: '#fff', fontWeight: 'bold' }}
                buttonProps={{ disabled: selectedRecipients.some(recipient => recipient.selected) ? false : true }}
            />
        );
    }

    return (
        <View style={{ marginTop: 10, marginBottom: 15 }}>
            <FlatList
                renderItem={renderItem}
                data={usersToShare}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => 'key' + index}
                ListFooterComponent={renderListFooter}
            />
            <FullScreenLoader isFetching={loading} />
        </View>
    )
}

export default ShareUser
