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
import { RectButton, TouchableHighlight } from 'react-native-gesture-handler';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export interface ListsOfTasksProps {
    id: number;
    name: string;
    dateTimeNotification: Date | null,
}

export default function CrisisSequence() {
    const navigation = useNavigation();

    const [name, setName] = useState<string>();
    const [listsOfTasks, setListsOfTasks] = useState<ListsOfTasksProps[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState('java');

    async function fetchTasks() {
        const oldlistOfTasks: ListsOfTasksProps[] = await loadTasks();

        setListsOfTasks(oldlistOfTasks);
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    async function loadTasks(): Promise<ListsOfTasksProps[]> {
        try {
            const data = await AsyncStorage.getItem('@littlesky:listsOftasks');
            return data ? (JSON.parse(data) as ListsOfTasksProps[]) : [];


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
            const id: number = listsOfTasks.length ? Number(listsOfTasks[listsOfTasks.length - 1]['id']) + 1 : 1;
            let newListOfTasks = listsOfTasks;
            newListOfTasks?.push({
                id,
                name,
                dateTimeNotification: null,
            });

            await AsyncStorage.setItem('@littlesky:listsOftasks', JSON.stringify(newListOfTasks));
            setListsOfTasks(newListOfTasks);
            setShowModal(false);
            setName('');
        } catch (error) {
            Alert.alert('Não foi possivel salvar sua lista')
        }
    }

    async function handleRemove(taskId: number) {
        const newListOfTasks = listsOfTasks.filter(listOfTasks => listOfTasks.id != taskId);

        setListsOfTasks(newListOfTasks);
        await AsyncStorage.setItem('@littlesky:listsOftasks', JSON.stringify(newListOfTasks));
    }

    function handleInputChange(value: string) {
        setName(value);
    }

    function handleTasks(id: number) {
        navigation.navigate('Tasks', { listId: id });
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
                        <Text style={styles.modalTxt}>Nome da Lista</Text>
                        <Picker
                            style={styles.selectInput}
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedLanguage(itemValue)
                            }>
                            <Picker.Item label="Exercicios de respiração" value="respiracao" />
                            <Picker.Item label="Escrever" value="escrever" />
                        </Picker>
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
                        data={listsOfTasks}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) => (
                            <View style={styles.itemListTasks} >
                                <TouchableHighlight
                                    style={styles.btnTask}
                                    onPress={() => handleTasks(item.id)}
                                    underlayColor='#ddd'
                                >
                                    <Text style={styles.textListTasks}>- {item.name}</Text>
                                </TouchableHighlight>
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
                        style={styles.buttonNewList}
                        activeOpacity={0.7}
                        onPress={() => setShowModal(true)}
                    >
                        <Text style={styles.buttonText}>
                            NOVO ITEM
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonNewList}
                        activeOpacity={0.7}
                        onPress={() => setShowModal(true)}
                    >
                        <Text style={styles.buttonText}>
                            INICIAR
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
    btnTask: {
        width: 280,
        display: 'flex',
        paddingBottom: 10,
    },
    textListTasks: {
        fontSize: 16,
        alignContent: 'flex-start',
        paddingTop: 20,
        color: colors.heading,
        fontFamily: fonts.text,
        letterSpacing: 1,
    },
    buttonRemove: {
        paddingTop: 15,
        alignContent: 'flex-end',
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
        width: '40%',
    },
    buttonText: {
        fontSize: 20,
        color: colors.white,
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
    selectInput: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 20,
        marginVertical: 20,
        paddingVertical: 10,
    },
})