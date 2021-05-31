import React, { useState } from 'react';
import {
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    View,
    Alert
} from 'react-native';
import colors from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tasks() {
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    function handleMenu() {
        navigation.navigate('MainMenu')
    }

    async function handleNewTask() {
        if (!name) {
            return Alert.alert('Me diz como chamar você 😢')
        }

        try {
            await AsyncStorage.setItem('@littlesky:tasks', name);
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect',
            });
        } catch (error) {
            Alert.alert('Não foi possivel salvar seu nome')
        }
    }

    function handleRemove() {
        //todo remover
    }

    function handleInputChange(value: string){
        setName(value);
    }

    return (
        <SafeAreaView style={styles.constainer}>
            <View style={styles.modal}>
                <View style={styles.modalBg}></View>
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTxt}>Nome da Lista</Text>
                        <TextInput
                                style={styles.modalInput}
                                placeholder='Nova lista'
                                onChangeText={handleInputChange}
                            />
                        <Button title='ADICIONAR' />
                    </View>
                </View>
            </View>
            <View style={styles.wrapper} >
                <View style={styles.contentListTaks}>
                    <View style={styles.itemListTasks} >
                        <Text style={styles.textListTasks}>Lista 1</Text>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" size={32} color={colors.red} />
                        </RectButton>
                    </View>
                    <View style={styles.itemListTasks} >
                        <Text style={styles.textListTasks}>Lista 2</Text>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" size={32} color={colors.red} />
                        </RectButton>
                    </View>
                    <View style={styles.itemListTasks} >
                        <Text style={styles.textListTasks}>Lista 3</Text>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" size={32} color={colors.red} />
                        </RectButton>
                    </View>
                    <View style={styles.itemListTasks} >
                        <Text style={styles.textListTasks}>Lista 4</Text>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" size={32} color={colors.red} />
                        </RectButton>
                    </View>
                </View>


                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleNewTask}
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
        position: 'relative',
    },
    wrapper: {
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
    contentListTaks: {
        width: '100%',
        padding: 20,
        height: '80%',
    },
    itemListTasks: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: colors.sky_blue,
        borderBottomWidth: 2,
        paddingVertical: 20,
    },
    textListTasks: {
        fontSize: 16,
        alignContent: 'flex-start',
        paddingTop: 5,
    },
    buttonRemove: {
        alignContent: 'flex-end',
    },
    modal: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2,
    },
    modalBg: {
        position: 'absolute',
        backgroundColor: colors.backgroundBg,
        opacity: 0.8,
        width: '100%',
        height: '100%',
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBox:{
        width: '80%',
        backgroundColor: colors.white,
        padding: 20,
    },
    modalTxt: {
        fontSize: 16,
    },
    modalInput:{
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 5,padding: 10,
        marginBottom: 15,
        paddingVertical: 10,
    },
    modalBtn:{

    }
})