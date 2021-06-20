import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
const saintsSentences = require('../services/saintsSentences.json');

export interface SaintsSentencesProps {
    sentence: string;
    author: string,
}

export default function MainMenu() {
    const [sentence, setSentece] = useState<SaintsSentencesProps>({ sentence: '', author: '' });

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

    async function randomSentence() {
        const index: number = Math.floor(Math.random() * saintsSentences.sentences.length);

        setSentece(saintsSentences.sentences[index]);
    }

    useEffect(() => {
        randomSentence();
    }, []);

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

                    <View style={styles.itemMenu}>
                        <Button
                            title='ALERTA DE CRISE'
                            onPress={handleCrisisAlert}
                        />
                    </View>

                    <View style={styles.itemMenu}>
                        <Button
                            title='TAREFAS'
                            onPress={handleListsOfTasks}
                        />
                    </View>

                    <View style={styles.itemMenu}>
                        <Button
                            title='EXERCÍCIOS DE RESPIRAÇÃO'
                            onPress={handleBreathingExercises}
                        />
                    </View>

                    <View style={styles.itemMenu}>
                        <Button
                            title='DISTRAIR'
                            onPress={handleDistract}
                        />
                    </View>
                </View>
                <View style={styles.sentenceContent}>
                    <Text style={styles.sentence}>"{sentence.sentence}" - {sentence.author}</Text>
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
    sentenceContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    sentence: {
        width: '90%',
        marginTop: -20,
        marginBottom: 30,
        textAlign: 'center',
        fontSize: 19,
        color: colors.heading,
        fontFamily: fonts.text,
    }
})