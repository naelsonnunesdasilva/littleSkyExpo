import React, { useEffect, useState } from 'react';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    View
} from 'react-native';
import colors from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import fonts from '../styles/fonts';
import LottieView from 'lottie-react-native';
import breathingAnimation from '../assets/breathing.json';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BreathingExercises() {

    const navigation = useNavigation();
    let countdownTimeOut: any;
    let sentenceTime: any;

    const [defaulTime, setDefaultTime] = useState<number>(60);
    const [time, setTime] = useState<number>(0);
    const [activeCountdown, setActiveCountdown] = useState<boolean>(false);
    const [activeSentence, setActiveSentence] = useState<string>('');

    function handleBack() {
        navigation.goBack();
    }

    const sentences: string[] = [
        'Diga sem pressa 5 coisas que esta vendo no momento',
        'Se imagine em um lugar que te trás paz',
        'Diga sem pressa 3 coisas que te fazem feliz',
        'Esta tudo bem, continue respirando, tudo irá se acalmar com o tempo',
        'Esta tudo bem, descanse um pouco agora e se imagine em um lugar que te trás paz',
    ];

    async function startCountdown() {
        const dataDefaulTime = await AsyncStorage.getItem(`@littlesky:defaultTime`);
        if (dataDefaulTime) {
            setDefaultTime(parseInt(dataDefaulTime));
        }

        setTime(dataDefaulTime ? Number(dataDefaulTime) : 60);

        const index: number = Math.floor(Math.random() * sentences.length);

        clearTimeout(sentenceTime);
        setActiveSentence('');
        sentenceTime = setTimeout(() => {
            setActiveSentence(`"${sentences[index]}"`);
        }, 6000);

        setActiveCountdown(true);
    }

    async function newDefaultTime(newTime: number) {
        setDefaultTime(newTime);
        await AsyncStorage.setItem(`@littlesky:defaultTime`, `${newTime}`);

    }

    async function stopCountdown() {
        setActiveCountdown(false);
        setActiveSentence('');
    }

    useEffect(() => {
        clearTimeout(sentenceTime);
        if (activeCountdown && time > 0) {
            countdownTimeOut = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (activeCountdown && !time) {
            stopCountdown();
        }
    }, [activeCountdown, time]);

    useEffect(() => {
        startCountdown();
    }, []);

    return (
        <SafeAreaView style={styles.constainer}>
            <View style={styles.wrapper} >
                <View style={styles.contentBreathing}>
                    {
                        activeCountdown ?
                            (
                                <View>
                                    <View>
                                        <Text style={styles.title}>Procure se acalmar e respirar de forma tranquila por mais:{'\n'} </Text>
                                        <Text style={styles.subtitle}>{time} segundos</Text>
                                    </View>

                                    <View style={styles.breathe}>
                                        <LottieView
                                            source={breathingAnimation}
                                            autoPlay
                                            loop
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.sentence}>{activeSentence}</Text>
                                    </View>
                                </View>
                            )
                            :
                            (
                                <View>
                                    <View>
                                        <Text style={styles.title}></Text>
                                        <Text style={styles.subtitle}>Tempo do cronometro: </Text>
                                    </View>

                                    <View style={styles.setCountdownTime}>
                                        <TouchableOpacity
                                            style={styles.btnMoreTime}
                                            activeOpacity={0.7}
                                            onPress={() => newDefaultTime(defaulTime + 1)}
                                        >
                                            <Text style={styles.buttonText}>+</Text>
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={styles.textTime}>{defaulTime}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.btnLessTime}
                                            activeOpacity={0.7}
                                            onPress={() => newDefaultTime(defaulTime - 1)}
                                        >
                                            <Text style={styles.buttonText}>-</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                    }
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
                    {
                        activeCountdown ?
                            (
                                <TouchableOpacity
                                    style={styles.btnStartAndStop}
                                    activeOpacity={0.7}
                                    onPress={() => stopCountdown()}
                                >
                                    <Text style={styles.buttonText}>Parar</Text>
                                </TouchableOpacity>
                            )
                            :
                            (
                                <TouchableOpacity
                                    style={styles.btnStartAndStop}
                                    activeOpacity={0.7}
                                    onPress={() => startCountdown()}
                                >
                                    <Text style={styles.buttonText}>Iniciar</Text>
                                </TouchableOpacity>
                            )
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    contentBreathing: {
        width: '100%',
        padding: 20,
        height: '80%',
        display: 'flex',
        marginTop: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.sky_blue_dark,
        fontFamily: fonts.heading,
        lineHeight: 34,
        marginTop: 15,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 26,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
        marginTop: -20,
    },
    breathe: {
        width: '100%',
        height: 380,
        marginTop: -80,
    },
    setCountdownTime: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    btnMoreTime: {
        backgroundColor: colors.sky_blue,
        color: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    textTime: {
        fontSize: 30,
        color: colors.heading,
        marginHorizontal: 25,
    },
    btnLessTime: {
        backgroundColor: colors.sky_blue,
        color: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    sentence: {
        fontSize: 20,
        color: colors.heading,
        fontFamily: fonts.text,
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
    btnStartAndStop: {
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