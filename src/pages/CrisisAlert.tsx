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

export interface ListsOfSequencesProps {
    id: number;
    name: string;
    dateTimeNotification: Date | null,
}

export default function CrisisAlert() {
    const navigation = useNavigation();

    const [name, setName] = useState<string>();
    const [listsOfSequences, setListsOfSequences] = useState<ListsOfSequencesProps[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    async function fetchSequences() {
        const oldlistOfSequences: ListsOfSequencesProps[] = await loadSequences();

        setListsOfSequences(oldlistOfSequences);
    }

    useEffect(() => {
        fetchSequences();
    }, []);

    async function loadSequences(): Promise<ListsOfSequencesProps[]> {
        try {
            const data = await AsyncStorage.getItem('@littlesky:listsOfSequences');
            return data ? (JSON.parse(data) as ListsOfSequencesProps[]) : [];


        } catch (error) {
            throw new Error(error);
        }
    }

    function handleBack() {
        navigation.goBack();
    }

    async function handleNewSequence() {
        if (!name) {
            return Alert.alert('Adicione um nome à sequência.')
        }

        try {
            const id: number = listsOfSequences.length ? Number(listsOfSequences[listsOfSequences.length - 1]['id']) + 1 : 1;
            let newListOfSequences = listsOfSequences;
            newListOfSequences?.push({
                id,
                name,
                dateTimeNotification: null,
            });

            await AsyncStorage.setItem('@littlesky:listsOfSequences', JSON.stringify(newListOfSequences));
            setListsOfSequences(newListOfSequences);
            setShowModal(false);
            setName('');
        } catch (error) {
            Alert.alert('Não foi possivel salvar a nova sequência.')
        }
    }

    async function handleRemove(sequenceId: number) {
        const newListOfSequences = listsOfSequences.filter(listOfSequences => listOfSequences.id != sequenceId);

        setListsOfSequences(newListOfSequences);
        await AsyncStorage.setItem('@littlesky:listsOfSequences', JSON.stringify(newListOfSequences));
    }

    function handleInputChange(value: string) {
        setName(value);
    }

    function handleSequences(id: number){
        navigation.navigate('CrisisSequence', {seuqenceId: id});
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
                        <Text style={styles.modalTxt}>Nome</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder='Nova sequência'
                            onChangeText={handleInputChange}
                        />
                        <Button
                            title='ADICIONAR'
                            onPress={handleNewSequence}
                        />
                    </View>
                </View>
            </View>)}
            <View style={styles.wrapper} >
                <View style={styles.contentListTaks}>
                    <FlatList
                        data={listsOfSequences}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) => (
                            <View style={styles.itemListSequences} >
                                <TouchableHighlight
                                    style={styles.btnSequence}
                                    onPress={() => handleSequences(item.id)}
                                    underlayColor='#ddd'
                                >
                                    <Text style={styles.textListSequences}>- {item.name}</Text>
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
                            NOVA SEQUÊNCIA
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
    itemListSequences: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: colors.sky_blue,
        borderBottomWidth: 2,
        paddingVertical: 5,
    },
    btnSequence:{
        width: 280,
        display: 'flex',
        paddingBottom: 10,
    },
    textListSequences: {
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
        width: '80%',
    },
    buttonText: {
        fontSize: 28,
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