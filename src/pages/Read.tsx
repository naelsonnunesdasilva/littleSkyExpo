import React, { useState, useEffect } from 'react';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    View,
    Linking,
    Image,
    Alert,
    ScrollView,
} from 'react-native';
import colors from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';

export interface ListsOfTasksProps {
    id: number;
    name: string;
    dateTimeNotification: Date | null,
}

export default function Read() {
    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }

    async function openLink(url: string) {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Não é possível abri a url: ${url}`);
        }
    }

    return (
        <SafeAreaView style={styles.constainer}>
            <View style={styles.wrapper} >
                <ScrollView style={styles.contentListTaks}>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openLink('https://www.mppi.mp.br/internet/wp-content/uploads/2020/08/1-Ebook-MPPI_Guia-pratico-para-controlar-a-ansiedade-1.pdf')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'https://editorialpaco.com.br/wp-content/uploads/2019/07/c8c74d9bca132ddb5e608bb5b212b386.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>Guia para controlar a ansiedade</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openLink('https://www.vatican.va/news_services/liturgy/saints/ns_lit_doc_20020616_padre-pio_po.html')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'https://editorialpaco.com.br/wp-content/uploads/2019/07/c8c74d9bca132ddb5e608bb5b212b386.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>PADRE PIO DE PIETRELCINA</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openLink('https://sacrificiovivoesanto.wordpress.com/2012/12/20/o-banquete-do-cordeiro/')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'https://editorialpaco.com.br/wp-content/uploads/2019/07/c8c74d9bca132ddb5e608bb5b212b386.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>O banquete do Cordeiro…</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openLink('https://www.refletirpararefletir.com.br/mensagens-catolicas')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'https://editorialpaco.com.br/wp-content/uploads/2019/07/c8c74d9bca132ddb5e608bb5b212b386.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>Mensagens católicas</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openLink('https://www.vaticannews.va/pt/papa/news/2021-04/papa-francisco-mensagem-pascoa-2021-urbi-et-orbi.html')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'https://editorialpaco.com.br/wp-content/uploads/2019/07/c8c74d9bca132ddb5e608bb5b212b386.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>A mensagem Urbi et Orbi do Papa Francisco</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openLink('https://marista.org.br/wp-content/uploads/2020/04/Ano_Mariano_Subsidio_11-Maria-na-vis%C3%A3o-do-Papa-Francisco.pdf')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'https://editorialpaco.com.br/wp-content/uploads/2019/07/c8c74d9bca132ddb5e608bb5b212b386.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>Maria na visão do papa francisco</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openLink('https://www.padrereginaldomanzotti.org.br/artigo/a-morte-nao-e-nada-santo-agostinho/')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'https://editorialpaco.com.br/wp-content/uploads/2019/07/c8c74d9bca132ddb5e608bb5b212b386.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>A morte não é nada (Santo Agostinho)</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openLink('http://www2.uefs.br/filosofia-bv/pdfs/agostinho_03.pdf')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'https://editorialpaco.com.br/wp-content/uploads/2019/07/c8c74d9bca132ddb5e608bb5b212b386.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>O Livre-Arbítrio</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.itemListTasks} >
                        <TouchableHighlight
                            style={styles.btnTask}
                            onPress={() => openLink('https://blog.cancaonova.com/amigosdoceu/files/2012/09/Hist%C3%B3ria-de-uma-Alma-auto-biografia-de-santa-teresinha-do-menino-Jesus.pdf?file=2012/09/Hist%C3%B3ria-de-uma-Alma-auto-biografia-de-santa-teresinha-do-menino-Jesus.pdf')}
                            underlayColor='#ddd'
                        >
                            <View style={styles.videoRow}>
                                <Image
                                    style={styles.thumb}
                                    source={{
                                        uri: 'https://editorialpaco.com.br/wp-content/uploads/2019/07/c8c74d9bca132ddb5e608bb5b212b386.jpg',
                                    }}
                                />
                                <Text style={styles.textListTasks}>HISTÓRIA DE UMA ALMA</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                </ScrollView>

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
        marginLeft: 5,
    },
    videoRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    thumb: {
        width: 30,
        height: 30,
        marginHorizontal: 5,
        marginTop: 15
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
        fontSize: 32,
        color: colors.white,
    },
})