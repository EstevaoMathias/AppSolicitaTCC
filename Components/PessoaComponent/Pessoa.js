import { StyleSheet, View, Image, Text } from 'react-native';
import React, { useState } from 'react';
import LinkButton from '../LinkButton/Index';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/core';



export default function Pessoa(Objeto) {
    const Imagem = require('../../assets/Images/logo_uniaraxa.png');

    const navigation = useNavigation();



    return (
        <View style={styles.container}>

            <View style={[styles.item, { flex: 0.25 }]} >
                <Image source={Imagem} style={styles.imagem} />
            </View>

            <View style={[styles.item, { flex: 0.60 }]} >
                <View>
                    <Text style={styles.title}>{Objeto.Nome}</Text>
                </View>

                <View>
                    <Text style={styles.subTitle}>{Objeto.Email}</Text>
                </View>
            </View>

            <View style={[styles.item, { flex: 0.15 }]} >
                <LinkButton title='+' onPress={() => Objeto.callback()} />
            </View>

        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '81%',
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    circuloImagem: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center'

    },
    item: {
        padding: 5
    },
    imagem: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black
    },
    subTitle: {
        fontSize: 15,
        color: colors.black


    }

});