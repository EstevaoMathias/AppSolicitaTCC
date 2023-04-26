import { StyleSheet, View, Image, Text } from 'react-native';
import React, { useState } from 'react';
//import api from '../../ApiService/api';
import LinkButton from '../LinkButton/Index';
import colors from '../../styles/colors';

export default function Solicitacoes(Objeto) {
    const Imagem = require('../../assets/Images/teste.png');
    return (
        <View style={styles.container}>

            <View>
                <View style={styles.container2}>
                    <Text style={styles.title}>Id Aluno: {Objeto.AlunoSolicitanteID}</Text>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.subtitle}>Nome do Projeto: {Objeto.NomeProjeto}</Text>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.subtitle}>Descrição: {Objeto.Descricao}</Text>
                </View>
            </View>

            <View style={[styles.item]}>
                <LinkButton title='Orientar' />
            </View>

        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '97%',
        borderColor: 'black',
        backgroundColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container2: {
        alignItems: 'center',
        width: '81%',
        backgroundColor: 'gray',
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        padding: 5,
        alignItems: 'center',
        width: '45%'
    },
    imagem: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 12,
    }


});