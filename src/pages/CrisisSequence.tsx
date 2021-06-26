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
import { useRoute, useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export interface ItemSequenceProps {
    sequenceId: number;
    id: number;
    itemName: string;
}

export default function CrisisSequence() {
    const navigation = useNavigation();

    const [itemNameSelected, setItemNameSelected] = useState<string>('');
    const [itens, setItens] = useState<ItemSequenceProps[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<any>({});

    const route = useRoute();
    const { sequenceId } = route.params as ItemSequenceProps;

    async function fetchItens() {
        const oldTasks: ItemSequenceProps[] = await loadItens();
        setItens(oldTasks);
    }

    useEffect(() => {
        fetchItens();
    }, []);

    async function loadItens(): Promise<ItemSequenceProps[]> {
        try {
            const data = await AsyncStorage.getItem(`@littlesky:sequence-${sequenceId}`);
            return data ? (JSON.parse(data) as ItemSequenceProps[]) : [];

        } catch (error) {
            throw new Error(error);
        }
    }

    function handleBack() {
        navigation.goBack();
    }

    async function handleNewItem() {
        try {
            let newTasks = itens;
            if(!selectedTask.id){
                const id: number = itens.length ? Number(itens[itens.length - 1]['id']) + 1 : 1;
                newTasks?.push({
                    id,
                    itemName: itemNameSelected,
                    sequenceId: sequenceId,
                });
            } else {
                newTasks = newTasks?.map(task => {
                    if(task.id === selectedTask.id){
                        task = {
                            id: selectedTask.id,
                            itemName: itemNameSelected,
                            sequenceId: sequenceId,
                        };
                    }

                    return task;
                });
            }

            await AsyncStorage.setItem(`@littlesky:sequence-${sequenceId}`, JSON.stringify(newTasks));
            setItens(newTasks);
            setShowModal(false);
            setItemNameSelected('');
            setSelectedTask({} as any)
        } catch (error) {
            Alert.alert('Não foi possivel salvar sua sequência', error);
            console.log(error);
        }
    }

    async function handleRemove(taskId: number) {
        const newTasks = itens.filter(task => task.id != taskId);

        setItens(newTasks);
        await AsyncStorage.setItem(`@littlesky:sequence-${sequenceId}`, JSON.stringify(newTasks));
    }

    function editItem(item: ItemSequenceProps) {
        setItemNameSelected(item.itemName);
        setSelectedTask(item);
        setShowModal(true);
    }

    function newItem(){
        setShowModal(true);
        setItemNameSelected('respiracao');
    }

    function startSequence(){
        const opts = {
            currentEvent: 0,
            itens
        };

        let page;

        if(itens[0].itemName === 'respiracao'){
            page = 'BreathingExercises';
        }else{
            page = 'Write';
        }

        navigation.navigate(page, {opts});
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
                        <Text style={styles.modalTxt}>Escolha o item:</Text>
                        <Picker
                            style={styles.selectInput}
                            selectedValue={itemNameSelected}
                            onValueChange={(itemValue, itemIndex) =>
                                setItemNameSelected(itemValue)
                            }>
                            <Picker.Item label="Exercicios de respiração" value="respiracao" />
                            <Picker.Item label="Escrever" value="escrever" />
                        </Picker>
                        <Button
                            title='ADICIONAR'
                            onPress={handleNewItem}
                        />
                    </View>
                </View>
            </View>)}
            <View style={styles.wrapper} >
                <View style={styles.contentListTaks}>
                    <FlatList
                        data={itens}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) => (
                            <View style={styles.itemListItens} >
                                <View style={styles.itemListItenssLeft} >
                                    <TouchableHighlight
                                        style={styles.btnTask}
                                        onPress={() => editItem(item)}
                                        underlayColor='#ddd'
                                    >
                                        <Text style={styles.textListTasks}>{item.itemName}</Text>
                                    </TouchableHighlight>

                                </View>
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
                        style={styles.buttonNewTask}
                        activeOpacity={0.7}
                        onPress={() => newItem()}
                    >
                        <Text style={styles.buttonText}>
                            NOVO ITEM
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonNewTask}
                        activeOpacity={0.7}
                        onPress={() => startSequence()}
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
        width: '40%',
    },
    buttonText: {
        fontSize: 20,
        color: colors.white,
    },
    contentListTaks: {
        width: '100%',
        padding: 20,
        height: '80%',
        marginTop: 5,
    },
    itemListItens: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: colors.sky_blue,
        borderBottomWidth: 2,
        paddingVertical: 5,
    },
    itemListItenssLeft:{
        display: 'flex',
        flexDirection: 'row',
    },
    completed:{
        fontSize: 5,
    },
    btnTask: {
        width: 200,
        display: 'flex',
        paddingBottom: 10,
        marginLeft: 5,
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