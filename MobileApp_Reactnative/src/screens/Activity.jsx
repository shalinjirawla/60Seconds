import React from "react";
import { TouchableOpacity, StyleSheet, ScrollView, Image, View } from 'react-native';
import Text from "../components/Text";
import Button from "../components/Button";

import { Dimensions } from 'react-native';
import Layout from "../components/Layout";

const window = Dimensions.get('window');
const ratio = window.width / 421;

const DATA = [
    { title: 'Script Approved', description: null, descriptionTwo: 'Manager, John Appleseed', type: 'script', datetime: '2h ago', read: false },
    { title: 'Manager’s Feedback', description: 'You might consider using better sales teminology', descriptionTwo: 'Manager, John Appleseed', type: 'feedback', datetime: '27 Feb - 10.26 am', read: false },
    { title: 'Manager’s Feedback', description: 'You might consider using better sales teminology', descriptionTwo: 'Manager, John Appleseed', type: 'feedback', datetime: '27 Feb - 10.26 am', read: true },
    { title: 'Manager’s Feedback', description: 'You might consider using better sales teminology', descriptionTwo: 'Manager, John Appleseed', type: 'feedback', datetime: '27 Feb - 10.26 am', read: true },
    { title: 'Manager’s Feedback', description: 'You might consider using better sales teminology', descriptionTwo: 'Manager, John Appleseed', type: 'feedback', datetime: '27 Feb - 10.26 am', read: true },
    { title: 'Manager’s Feedback', description: 'You might consider using better sales teminology', descriptionTwo: 'Manager, John Appleseed', type: 'feedback', datetime: '27 Feb - 10.26 am', read: true }
];

const Activity = ({ navigation }) => {

    const renderIconByStatus = (type, read) => {
        if (type === "script" && read === false) {
            return require(`../../assets/Approved_Activity_highlighted.png`);
        }
        else if (type === "script" && read === true) {
            return require(`../../assets/Approved_Activity_read.png`);
        }
        else if (type === "feedback" && read === false) {
            return require(`../../assets/Comments_Activity_highlighted.png`);
        }
        else if (type === "feedback" && read === true) {
            return require(`../../assets/Comments_Activity_read.png`);
        }
    }

    return (
        <Layout title={'Activity'} navigation={navigation} >
            <View style={{ flex: 1, marginTop: 33 * ratio, marginBottom: 33 * ratio }}>
                <ScrollView
                    stickyHeaderIndices={[0]}
                    contentContainerStyle={{
                        marginLeft: 20,
                        marginRight: 20,
                        backgroundColor: '#fff',
                        borderRadius: 12,
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        paddingTop: 10 * ratio,
                        paddingBottom: 10 * ratio,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: '#D1E4F5',
                        borderRadius: 12
                    }}>
                        <Text style={{ color: '#1B3964', fontSize: 17, marginLeft: 20 }} value={`${DATA.filter(activity => activity.read === false).length} New Activities`} />
                    </View>

                    {
                        DATA.map((content, index) =>
                            <TouchableOpacity key={index} style={{ backgroundColor: content.read ? '#F1F7FF' : '#fff' }} onPress={() => navigation.navigate("ViewActivity")}>
                                <View style={{
                                    flexDirection: 'column',
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
                                                    source={renderIconByStatus(content.type, content.read)}
                                                />
                                                <Text
                                                    style={{ fontSize: 14, color: content.read ? '#536278' : '#FD6F2A', marginLeft: 10 }}
                                                    value={content.title} />
                                            </View>

                                            <View style={{ flex: .4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                <Text
                                                    style={{ fontSize: 12, color: '#536278' }}
                                                    value={content.datetime} />
                                            </View>

                                        </View>
                                        {
                                            content.description !== null && content.description !== "" &&
                                            <View style={{ flexDirection: 'row', marginLeft: 40 }}>
                                                <Text
                                                    style={{ fontSize: 14, marginTop: 10, color: '#536278' }}
                                                    value={content.description} />
                                            </View>
                                        }
                                        {
                                            content.descriptionTwo !== null && content.descriptionTwo !== "" &&
                                            <View style={{ flexDirection: 'row', marginLeft: 40 }}>
                                                <Text
                                                    style={{ fontSize: 12, marginTop: 10, color: '#536278' }}
                                                    value={content.descriptionTwo} />
                                            </View>
                                        }
                                    </View>

                                </View>
                                <View style={{ borderTopWidth: 1, borderColor: '#D1E4F5' }} />
                            </TouchableOpacity>
                        )
                    }
                    <View style={{ borderTopWidth: 1, borderColor: '#D1E4F5' }} />
                    <Button label={"View More"} onPress={() => null}
                        buttonStyle={{
                            backgroundColor: "transparent",
                            marginBottom: 5 * ratio,
                            paddingVertical: 12,
                            width: 212 * ratio,
                            alignSelf: 'center'
                        }}
                        textStyle={{ color: '#1B3964', fontSize: 16, textDecorationLine: 'underline', }}
                    />
                </ScrollView>
            </View>

        </Layout>
    );
}

Activity.navigationOptions = () => {
    return {
        title: 'Activity'
    };
};

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

export default Activity;