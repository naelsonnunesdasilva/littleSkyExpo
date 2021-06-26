import React, { useState, useEffect } from 'react';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    View,
    Linking,
    Image,
    Alert,
    ScrollView,
} from 'react-native';
import colors from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';

export interface ListsOfTasksProps {
    id: number;
    name: string;
    dateTimeNotification: Date | null,
}

export default function Videos() {
    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }

    async function openVideo(url: string) {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Não é possível abri a url: ${url}`);
        }
    }

    return (
        <SafeAreaView style={styles.constainer}>
            <View style={styles.wrapper} >
                <ScrollView style={styles.contentListTaks}>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openVideo('https://www.youtube.com/watch?v=qLzpi094HfA')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'http://i3.ytimg.com/vi/qLzpi094HfA/hqdefault.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>Como me relacionar com o meu anjo da guarda?</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openVideo('https://www.youtube.com/watch?v=4mCba38KQCg')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'http://i3.ytimg.com/vi/4mCba38KQCg/hqdefault.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>Sentinela</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openVideo('https://www.youtube.com/watch?v=aWYGUPDse-g')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'http://i3.ytimg.com/vi/aWYGUPDse-g/hqdefault.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>Doenças Espirituais: o que são e como combatê-las?</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openVideo('https://www.youtube.com/watch?v=CCVQxCsWGno')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'http://i3.ytimg.com/vi/CCVQxCsWGno/hqdefault.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>Incendeia minha alma</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openVideo('https://www.youtube.com/watch?v=2SAiG4wfG8s')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'http://i3.ytimg.com/vi/2SAiG4wfG8s/hqdefault.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>HOLY ROSARY: JOYFUL MYSTERIES (Monday and Saturday)</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openVideo('https://www.youtube.com/watch?v=bJwY_7o6Z_0')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'http://i3.ytimg.com/vi/bJwY_7o6Z_0/hqdefault.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>HOLY ROSARY - SORROWFUL MYSTERIES (Tuesday and Friday)</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openVideo('https://www.youtube.com/watch?v=8OJQ4ykLUB0')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'http://i3.ytimg.com/vi/4mCba38KQCg/hqdefault.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>THE HOLY ROSARY : GLORIOUS MYSTERIES (Sunday and Wednesday)</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openVideo('https://www.youtube.com/watch?v=8KtJ7pEHseY')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'http://i3.ytimg.com/vi/8KtJ7pEHseY/hqdefault.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>THE HOLY ROSARY : LUMINOUS MYSTERIES</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openVideo('https://www.youtube.com/watch?v=qeHcKB9zzjc')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'http://i3.ytimg.com/vi/qeHcKB9zzjc/hqdefault.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>Morrer para viver | Série A Imitação de Cristo - #100</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openVideo('https://www.youtube.com/watch?v=hvFc7OFtGFo')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'http://i3.ytimg.com/vi/hvFc7OFtGFo/hqdefault.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>Como combater as distrações durante a oração</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openVideo('https://www.youtube.com/watch?v=WkD7ipcjSjk')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'http://i3.ytimg.com/vi/WkD7ipcjSjk/hqdefault.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>A Rainha das virtudes | Série Itinerário da castidade - #01</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openVideo('https://www.youtube.com/watch?v=lrCyfTqeok8')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'http://i3.ytimg.com/vi/lrCyfTqeok8/hqdefault.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>Sou teu anjo +anjo da guarda - Anjos de Resgate</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openVideo('https://www.youtube.com/watch?v=WgYTRg7bvaU')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'http://i3.ytimg.com/vi/WgYTRg7bvaU/hqdefault.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>A impressionante história de Nossa Senhora de Lourdes</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                </ScrollView>

                <View style={styles.footerBtns}>
                    <TouchableOpacity
                        style={styles.buttonBack}
                        activeOpacity={0.7}
                        onPress={() => handleBack()}
                    >
                        <Text style={styles.buttonText}>
                            <Feather name="chevron-left" style={styles.buttonIcon} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        position: 'relative',
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },

    contentListTaks: {
        width: '100%',
        padding: 20,
        height: '80%',
        marginTop: 5,
    },
    itemListTasks: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: colors.sky_blue,
        borderBottomWidth: 2,
        paddingVertical: 5,
    },
    btnTask: {
        width: 280,
        display: 'flex',
        paddingBottom: 10,
    },
    textListTasks: {
        fontSize: 16,
        alignContent: 'flex-start',
        paddingTop: 20,
        color: colors.heading,
        fontFamily: fonts.text,
        letterSpacing: 1,
        marginLeft: 5,
    },
    videoRow:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    thumb: {
        width: 30,
        height: 30,
        marginHorizontal: 5,
        marginTop: 15
    },
    footerBtns: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonBack: {
        backgroundColor: colors.sky_blue,
        color: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 10,
        height: 56,
        width: '18%',
    },
    buttonIcon: {
        fontSize: 32,
        color: colors.white,
    },
    buttonNewList: {
        backgroundColor: colors.sky_blue,
        color: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 10,
        height: 56,
        width: '80%',
    },
    buttonText: {
        fontSize: 32,
        color: colors.white,
    },
})