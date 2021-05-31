import React, { useState, useEffect } from 'react';
import {
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    View,
    Alert,
    FlatList,
} from 'react-native';
import colors from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tasks() {
    const navigation = useNavigation();

    const [name, setName] = useState<string>();
    const [listsOfTasks, setListsOfTasks] = useState<any[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    function fetchTasks() {
        // To do - buscar listas de tarefas salvas em storage 
        const testlistOfTasks: any[] = [];

        setListsOfTasks(testlistOfTasks);
    }

    useEffect(() => {
        fetchTasks();
    }, []);


    function handleMenu() {
        navigation.navigate('MainMenu')
    }

    async function handleNewTask() {
        if (!name) {
            return Alert.alert('Adicione um nome a sua lista de tarefas.')
        }

        try {
            const id:number = listsOfTasks.length ? Number(listsOfTasks[listsOfTasks.length - 1]['id']) + 1 : 1;
            let newListOfTasks = listsOfTasks;
            newListOfTasks?.push({
                id,
                name, 
            });

            setListsOfTasks(newListOfTasks);
            setShowModal(false);
            //TO DO - Salvar as listas em storage 
            // await AsyncStorage.setItem('@littlesky:listsOftasks', name);
            // navigation.navigate('Confirmation', {
            //     title: 'Prontinho',
            //     subtitle: 'Agora vamos começar a cuidar das suas plantinhas',
            //     buttonTitle: 'Começar',
            //     icon: 'smile',
            //     nextScreen: 'PlantSelect',
            // });
        } catch (error) {
            Alert.alert('Não foi possivel salvar sua lista')
        }
    }

    function handleRemove(taskId: number) {
        const newListOfTasks = listsOfTasks.filter(listOfTasks => listOfTasks.id != taskId);

        setListsOfTasks(newListOfTasks);
    }

    function handleInputChange(value: string) {
        setName(value);
    }

    return (
        <SafeAreaView style={styles.constainer}>
            {showModal && (<View style={styles.modal}>
                <View style={styles.modalBg}></View>
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTxt}>Nome da Lista</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder='Nova lista'
                            onChangeText={handleInputChange}
                        />
                        <Button
                            title='ADICIONAR'
                            onPress={handleNewTask}
                        />
                    </View>
                </View>
            </View> )}
            <View style={styles.wrapper} >
                <View style={styles.contentListTaks}>
                    <FlatList
                        data={listsOfTasks}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.itemListTasks} >
                        <Text style={styles.textListTasks}>{item.name}</Text>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={() => handleRemove(item.id)}
                        >
                            <Feather name="trash" size={32} color={colors.red} />
                        </RectButton>
                    </View>
                        )}
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                    />

                </View>


                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => setShowModal(true)}
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
    modalBox: {
        width: '80%',
        backgroundColor: colors.white,
        padding: 20,
    },
    modalTxt: {
        fontSize: 16,
    },
    modalInput: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 5, padding: 10,
        marginBottom: 15,
        paddingVertical: 10,
    },
    modalBtn: {

    }
})