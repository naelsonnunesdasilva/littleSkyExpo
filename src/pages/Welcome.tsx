import React, { useEffect } from 'react';
import {
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    View
} from 'react-native';
import colors from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import exerciciosDeRespiracaoImg from '../assets/exercicios-de-respiracao-que-relaxam.jpg';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import * as Notification from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Welcome() {

    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('MainMenu')
    }

    async function initialConfig(){
        const data = await AsyncStorage.getItem(`@littlesky:initialConfig`);

        if(!data){
            await AsyncStorage.setItem(`@littlesky:initialConfig`, 'iniciado');

            const now = new Date();
            const times = 1;

            let nextTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0);
            let repeat_every = 'daily';
            
            if(repeat_every === 'week'){
                const interval =  Math.trunc(7 / times);
                nextTime.setDate(now.getDate() * interval);
            } 
            else{
                nextTime.setDate(nextTime.getDate() + 1);
            }

            let seconds = Math.abs(
                Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
            );

            await Notification.scheduleNotificationAsync({
                content: {
                    title: 'Heeei 😇',
                    body: `Quer falar um pouco sobre como está o dia?`,
                    sound: false,
                    priority: Notification.AndroidNotificationPriority.HIGH,
                    data: {
                        lembrete: 'diário',
                        page: 'Write',
                    },
                },
                trigger: {
                    seconds,
                    repeats: true,
                }
            });

            let untilMonday: number;

            if(now.getDay() === 0){
                untilMonday = 1;
            }else{
                untilMonday = now.getDay() - 8;
            }

            nextTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + untilMonday, 7, 0, 0);
            repeat_every = 'week';

            if(repeat_every === 'week'){
            } 
            else{
                nextTime.setDate(nextTime.getDate() + 1);
            }

            seconds = Math.abs(
                Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
            );

            await Notification.scheduleNotificationAsync({
                content: {
                    title: 'A semana começou!',
                    body: `Vamos comerçar mais uma semana com tudo... Pra cima!`,
                    sound: false,
                    priority: Notification.AndroidNotificationPriority.HIGH,
                    data: {
                        lembrete: 'diário',
                        page: 'Write',
                    },
                },
                trigger: {
                    seconds,
                    repeats: true,
                }
            });
        }else{
            handleStart();
        }
    }

    useEffect(() => {
        initialConfig();
    },[])

    return (
        <SafeAreaView style={styles.constainer}>
            <View style={styles.wrapper} >
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    sua ansiedade {'\n'}
                    de forma fácil
                </Text>

                <Image
                    source={exerciciosDeRespiracaoImg} style={styles.image}
                    resizeMode={'contain'}
                />

                <Text style={styles.subtitle}>
                    Sempre que precisar,{'\n'}
                    nós cuidaremos de você!
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Text>
                        <Feather name="chevron-right" style={styles.buttonIcon} />
                    </Text>
                </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
    },
    wrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.sky_blue_dark,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    button: {
        backgroundColor: colors.sky_blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    buttonIcon: {
        fontSize: 32,
        color: colors.white,
    },
    image: {
        height: Dimensions.get('window').width *0.7,
    }
})