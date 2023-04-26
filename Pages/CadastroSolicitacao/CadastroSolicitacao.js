import React, { useState } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    Switch,
    View,
    FlatList,
    Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import MyButton from '../../Components/MyButton/Index';
import LinkButton from '../../Components/LinkButton/Index';
import colors from '../../styles/colors';
import api from '../../ApiService/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const eye = 'eye';
const eyeOff = 'eye-off';



export default function NewUser() {
    const [txtNomeProjeto, setNomeProjeto] = useState('')
    const [txtDescricao, setDescricao] = useState('')

    const navigation = useNavigation();

    function validarCadastro() {

        let validacoes = [];
        let cadastroValido = true;

        if (txtNomeProjeto.trim() === '') {
            validacoes.push('Nome do projeto é obrigatório');
            cadastroValido = false;
        }

        if (txtDescricao.trim() === '') {
            validacoes.push('Descrição do projeto é obrigatória');
            cadastroValido = false;
        }
        let objValidacao = {
            cadastroValido: cadastroValido,
            validacoes: validacoes

        };
        return objValidacao;
    }

    async function CadastrarSolicitacao() {

        try{
            const advisor = JSON.parse(await AsyncStorage.getItem('@SistemaTCC:Advisor'));
            const user = JSON.parse(await AsyncStorage.getItem('@SistemaTCC:user'));
            let resultadoValidacao = validarCadastro();

            if (resultadoValidacao.cadastroValido) {

                let objNovoUsuario = {
                    id: null,
                    AlunoSolicitanteID: user.id,
                    ProfessorOrientadorID: advisor.id,
                    NomeProjeto: txtNomeProjeto,
                    Descricao: txtDescricao
                }
                const response = await api.post('/Solicitacoes',objNovoUsuario);
                alert('Solicitação criada!');
                navigation.navigate('TelaOrientadores');
                return;
            }
            else {
                resultadoValidacao.validacoes.forEach(item => {
                    alert(item);
                });
                return;
            }
        }catch(e){
            alert(e.message)
        }
    }

    function navigateToBack() {
        navigation.goBack();
    }


    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Faça sua Solicitação</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Nome do Projeto"
                onChangeText={text => setNomeProjeto(text)}
                maxLength={50}
                value={txtNomeProjeto}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Descrição do Projeto"
                onChangeText={text => setDescricao(text)}
                maxLength={11}
                value={txtDescricao}
            />
            <MyButton title='Salvar' onPress={() => CadastrarSolicitacao()} />

            <LinkButton title='Voltar'
                onPress={navigateToBack}
            />
        </View>

    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        color: 'black',
        fontSize: 28,
        marginBottom: 8
    },
    Picker: {
        margin: -8
    },
    textInput: {
        height: 40,
        borderColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        width: '70%',
        marginBottom: 16,
        paddingHorizontal: 8
    },
    textInputPassword: {
        height: 40,
        borderWidth: 0,
        width: '70%',
        marginBottom: 16,
        paddingHorizontal: 8
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
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    selectType: {
        alignItems: 'center',
        //borderColor: colors.gray,
        //borderRadius: 8,
        //borderWidth: 1,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        marginBottom: 16,
        width: '80%',
    },
    passwordContainer: {
        marginBottom: 16,
        height: 40,
        borderColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconEye: {
        paddingHorizontal: 8,
        color: 'black',
        marginTop: 6
    },
});