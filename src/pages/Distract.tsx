import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
const saintsSentences = require('../services/saintsSentences.json');

export interface SaintsSentencesProps {
    sentence: string;
    author: string,
}

export default function Distract() {

    const navigation = useNavigation();

    async function handleVideos() {
        navigation.navigate('Videos');
    }

    async function handleRead() {
        navigation.navigate('Read');
    }

    function handleBack() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.form}>
                    <View style={styles.header}>
                        <Text style={styles.emoji}>
                            🎲
                        </Text>

                        <Text style={styles.title}>
                            Escolha uma{'\n'}
                            categoria.
                        </Text>
                    </View>

                    <View style={styles.itemMenu}>
                        <Button
                            title='VÍDEOS'
                            onPress={handleVideos}
                        />
                    </View>

                    <View style={styles.itemMenu}>
                        <Button
                            title='LER'
                            onPress={handleRead}
                        />
                    </View>
                </View>

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
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32,
        marginTop: 20,
    },
    itemMenu: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 15,
    },
    footerBtns: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginBottom: 10,
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
    buttonNewTask: {
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