import React, { useState, useEffect } from 'react';
import {
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';
import colors from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ItemSequenceProps } from './CrisisSequence';

interface CrisisSequenceProps {
    opts:{
        currentEvent: number,
        itens: ItemSequenceProps[],
    }
}

export default function Write() {
    const navigation = useNavigation();

    const route = useRoute();
    const { opts } = route.params as CrisisSequenceProps;

    function handleBack() {
        navigation.goBack();
    }

    function nextEvent(){
        const newOpts = {
            currentEvent: opts.currentEvent + 1,
            itens: opts.itens,
        };

        let page;

        if(newOpts.currentEvent === newOpts.itens.length){
            page = 'CrisisAlert';
        }else if(newOpts.itens[newOpts.currentEvent].itemName === 'respiracao'){
            page = 'BreathingExercises';
        }else{
            page = 'Write';
        }

        navigation.navigate(page, {opts: newOpts});
    }

    return (
        <SafeAreaView style={styles.constainer}>
            <View style={styles.wrapper} >
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        style={styles.notesInput}
                        placeholder="Digite seus pensamentos, o que estiver sentindo nesse momento..."
                    />

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
                        opts.currentEvent >= 0 && (
                            
                            <TouchableOpacity
                                style={styles.buttonNewTask}
                                activeOpacity={0.7}
                                onPress={() => nextEvent()}
                            >
                                <Text style={styles.buttonText}>
                                    AVANÇAR
                                </Text>
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
        position: 'relative',
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
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
        fontSize: 20,
        color: colors.white,
    },
    notesInput: {
        height: '80%',
        width: '100%',
        borderColor: colors.sky_blue,
        borderWidth: 1,
        padding: 10,
        marginTop: 20,
        borderRadius: 16,
        textAlignVertical: 'top',
        color: colors.heading,
        fontSize: 20,
    },
})