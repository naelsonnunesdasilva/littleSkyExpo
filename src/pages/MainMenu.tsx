import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainMenu() {

    const navigation = useNavigation();

    async function handleCrisisAlert() {
        navigation.navigate('CrisisAlert');
    }

    async function handleListsOfTasks() {
        navigation.navigate('ListsOfTasks');
    }

    async function handleBreathingExercises() {
        navigation.navigate('BreathingExercises');
    }

    async function handleDistract() {
        navigation.navigate('Distract');
    }

    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <View style={styles.header}>
                            <Text style={styles.emoji}>
                                😃
                            </Text>

                            <Text style={styles.title}>
                                Escolha uma{'\n'}
                                ação abaixo.
                            </Text>
                        </View>

                        <View style={styles.footer}>
                            <Button
                                title='ALERTA DE CRISE'
                                onPress={handleCrisisAlert}
                            />
                        </View>

                        <View style={styles.footer}>
                            <Button
                                title='TAREFAS'
                                onPress={handleListsOfTasks}
                            />
                        </View>

                        <View style={styles.footer}>
                            <Button
                                title='EXERCÍCIOS DE RESPIRAÇÃO'
                                onPress={handleBreathingExercises}
                            />
                        </View>

                        <View style={styles.footer}>
                            <Button
                                title='DISTRAIR'
                                onPress={handleDistract}
                            />
                        </View>
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
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20,
    }
})