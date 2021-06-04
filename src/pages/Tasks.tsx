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
    CheckBox,
} from 'react-native';
import colors from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { RectButton, TouchableHighlight } from 'react-native-gesture-handler';
import fonts from '../styles/fonts';
import { useRoute, useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TasksProps {
    listId: number;
    id: number;
    name: string;
}

export default function Tasks() {
    const navigation = useNavigation();

    const [name, setName] = useState<string>();
    const [tasks, setTasks] = useState<TasksProps[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    const route = useRoute();
    const { listId } = route.params as TasksProps;

    async function fetchTasks() {
        const oldTasks: TasksProps[] = await loadTasks();

        setTasks(oldTasks);
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    async function loadTasks(): Promise<TasksProps[]> {
        try {
            const data = await AsyncStorage.getItem(`@littlesky:tasks-${listId}`);
            return data ? (JSON.parse(data) as TasksProps[]) : [];


        } catch (error) {
            throw new Error(error);
        }
    }


    function handleBack() {
        navigation.goBack();
    }

    async function handleNewTask() {
        if (!name) {
            return Alert.alert('Adicione um nome a sua lista de tarefas.')
        }

        try {
            const id: number = tasks.length ? Number(tasks[tasks.length - 1]['id']) + 1 : 1;
            let newTasks = tasks;
            newTasks?.push({
                id,
                name,
                listId,
            });

            await AsyncStorage.setItem(`@littlesky:tasks-${listId}`, JSON.stringify(newTasks));
            setTasks(newTasks);
            setShowModal(false);
        } catch (error) {
            Alert.alert('Não foi possivel salvar sua lista')
        }
    }

    async function handleRemove(taskId: number) {
        const newTasks = tasks.filter(tasks => tasks.id != taskId);

        setTasks(newTasks);
        await AsyncStorage.setItem(`@littlesky:tasks-${listId}`, JSON.stringify(newTasks));
    }

    function handleInputChange(value: string) {
        setName(value);
    }

    function editTasks(id: number, name: string){

    }

    return (
        <SafeAreaView style={styles.constainer}>
            {showModal && (<View style={styles.modal}>
                <TouchableOpacity
                    style={styles.modalBg}
                    onPress={() => setShowModal(false)}
                    activeOpacity={0.8}
                />
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTxt}>Nome da Tarefa</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder='Nova tarefa'
                            onChangeText={handleInputChange}
                        />
                        <Button
                            title='ADICIONAR'
                            onPress={handleNewTask}
                        />
                    </View>
                </View>
            </View>)}
            <View style={styles.wrapper} >
                <View style={styles.contentListTaks}>
                    <FlatList
                        data={tasks}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) => (
                            <View style={styles.itemListTasks} >
                                <TouchableHighlight
                                    style={styles.btnTask}
                                    onPress={() => editTasks(item.id, item.name)}
                                    underlayColor='#ddd'
                                >
                                    <Text style={styles.textListTasks}>- {item.name}</Text>
                                </TouchableHighlight>
                                <View>
                                    <RectButton
                                        style={styles.buttonRemove}
                                        onPress={() => handleRemove(item.id)}
                                    >
                                        <Feather name="trash" size={32} color={colors.red} />
                                    </RectButton>
                                    <RectButton
                                        style={styles.buttonRemove}
                                        onPress={() => handleRemove(item.id)}
                                    >
                                        <Feather name="trash" size={32} color={colors.red} />
                                    </RectButton>
                                </View>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                    />

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
                    <TouchableOpacity
                        style={styles.buttonNewTask}
                        activeOpacity={0.7}
                        onPress={() => setShowModal(true)}
                    >
                        <Text style={styles.buttonText}>
                            NOVA TAREFA
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
        fontSize: 32,
        color: colors.white,
    },
    contentListTaks: {
        width: '100%',
        padding: 20,
        height: '80%',
        marginTop: 5,
    },
    itemListTasks: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: colors.sky_blue,
        borderBottomWidth: 2,
        paddingVertical: 5,
    },
    btnTask:{
        width: 280,
        display: 'flex',
        paddingBottom: 10,
        backgroundColor: '#ccc',
    },
    textListTasks: {
        fontSize: 16,
        alignContent: 'flex-start',
        paddingTop: 5,
        color: colors.heading,
        fontFamily: fonts.text,
        letterSpacing: 0.7,
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

    },
})