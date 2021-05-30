import React from 'react';
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

export default function Tasks() {

    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('MainMenu')
    }

    return (
        <SafeAreaView style={styles.constainer}>
            <View style={styles.wrapper} >
                <View style={styles.contentlistTaks}>

                </View>
                

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Text style={styles.buttonText}>
                        NOVA LISTA
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
    contentlistTaks: {
        height: '80%',
    }
})