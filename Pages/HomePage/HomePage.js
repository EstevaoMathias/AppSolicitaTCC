
import React, { useState } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import MyButton from '../../Components/MyButton/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinkButton from '../../Components/LinkButton/Index';
import colors from '../../styles/colors';

export default function Home() {

    const navigation = useNavigation()

    const Imagem = require('../../assets/Images/logo_uniaraxa.png');

    function navigateToNovoUsuario() {
        navigation.navigate('NovoUsuario')
    }

    function navigateToLogin() {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>

            <Image source={Imagem} style={styles.imagem} />

            <MyButton title='Entrar' onPress={navigateToLogin} />

            <LinkButton title='Cadastrar-se' onPress={navigateToNovoUsuario} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIn: {
        backgroundColor: colors.redButton,
        borderRadius: 8,
        height: 50,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextIn: {
        color: colors.black,
        fontSize: 18,
        fontWeight: 'bold'
    },
    imagem: {
        width: 250,
        height: 250,
        marginBottom: 100
    },
});