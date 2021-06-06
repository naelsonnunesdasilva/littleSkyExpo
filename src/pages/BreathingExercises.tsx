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


export default function BreathingExercises() {

    const navigation = useNavigation();
    const defaulTime: number = 60;

    const [time, setTime] = useState<number>(defaulTime);
    const [activeCountdown, setActiveCountdown] = useState<boolean>(true);
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

    function countdown(timeNow: number) {
        if (!timeNow) {
            setTime(defaulTime);
            setActiveCountdown(false);
            return;
        }

        setActiveSentence(sentences[0]);

        timeNow -= 1;
        setTime(timeNow);
        setTimeout(() => countdown(timeNow), 1000);
    }

    useEffect(() => {
        if (activeCountdown) {
            setTimeout(() => countdown(time), 1000);
        }
    }, [activeCountdown]);

    return (
        <SafeAreaView style={styles.constainer}>
            <View style={styles.wrapper} >
                <View style={styles.contentBreathing}>
                    <Text style={styles.title}>Procure se acalmar e respirar de forma tranquila por mais:{'\n'} </Text>
                    <Text style={styles.subtitle}>{time} segundos</Text>

                    <LottieView
                        source={breathingAnimation}
                        autoPlay
                        loop
                        style={styles.animation}
                    />
                    <Text style={styles.sentence}>{activeSentence}</Text>
                    <Text></Text>
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
        alignItems: 'center',
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
        marginTop: 0,
    },
    animation: {

    },
    sentence: {

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