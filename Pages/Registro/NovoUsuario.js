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

const eye = 'eye';
const eyeOff = 'eye-off';



export default function NewUser() {

    const [flShowPass, setShowPass] = useState(true);
    const [iconPass, setIconPass] = useState(eyeOff);
    const [txtNome, setNome] = useState('TESTEPROFESSOR')
    const [txtDocument, setDocument] = useState('22222222222')
    const [txtEmail, setEmail] = useState('testeprofessor@gmail.com')
    const [txtSenha, setSenha] = useState('1234')
    const [txtSenhaConfirm, setSenhaConfirm] = useState('1234')
    const navigation = useNavigation()
    const [txtTipo, setTipo] = useState(1)
    const [flLoading, setLoading] = React.useState(false)
    const [lstErrors, setListErrors] = useState([]);
    const [userType, setUserType] = useState(1);
    const toggleSwitch = () => setEhProfessor(previousState => !previousState);
    const [ehProfessor, setEhProfessor] = useState(false);


    function handleChangeIcon() {
        let icone = iconPass == eye ? eyeOff : eye;
        let flShowPassAux = !flShowPass;
        setShowPass(flShowPassAux);
        setIconPass(icone);
    }

    function handleChangeIconConfirm() {
        let icone = iconPass == eye ? eyeOff : eye;
        let flShowPassAux = !flShowPass;
        setShowPass(flShowPassAux);
        setIconPass(icone);
    }

    function selectType() {
        let type = userType == 2 ? 1 : 2;
        setEhProfessor(previousState => !previousState);
        setUserType(type);
    }


    function validarCadastro() {

        let validacoes = [];
        let cadastroValido = true;

        if (txtNome.trim() === '') {
            validacoes.push('Campo nome é obrigatório');
            cadastroValido = false;
        }

        if (txtDocument.trim() === '') {
            validacoes.push('Campo CPF é obrigatório');
            cadastroValido = false;
        }

        if (txtEmail.trim() === '') {
            validacoes.push('Campo e-mail é obrigatório');
            cadastroValido = false;
        }

        if (txtSenha.trim() === '') {
            validacoes.push('Campo senha é obrigatório');
            cadastroValido = false;
        }

        if (txtSenhaConfirm.trim() === '') {
            validacoes.push('Repita a senha no segundo campo');
            cadastroValido = false;
        }

        if (txtSenha.trim() != txtSenhaConfirm) {
            validacoes.push('Repita a mesma senha duas vezes');
            cadastroValido = false;
        }

        let objValidacao = {
            cadastroValido: cadastroValido,
            validacoes: validacoes

        };
        return objValidacao;
    }

    async function cadastrarPessoa() {
        try{
            let resultadoValidacao = validarCadastro();

            if (resultadoValidacao.cadastroValido) {
                ehProfessor ? setTipo(1) : setTipo(2);
                let objNovoUsuario = {
                    id: null,
                    Nome: txtNome,
                    Documento: txtDocument,
                    Email: txtEmail,
                    Senha: txtSenha,
                    TipoPessoaID: txtTipo
                }
                const response = await api.post('/Pessoa',objNovoUsuario);
                alert('Usuário Criado!');
                navigation.navigate('NovoUsuario');
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
            <Text style={styles.textTitle}>Preencha seus dados!</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Nome"
                onChangeText={text => setNome(text)}
                maxLength={50}
                value={txtNome}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Cpf"
                onChangeText={text => setDocument(text)}
                maxLength={11}
                value={txtDocument}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                maxLength={50}
                value={txtEmail}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.textInputPassword}
                    placeholder="Senha"
                    onChangeText={text => setSenha(text)}
                    value={txtSenha}
                    secureTextEntry={flShowPass}
                    maxLength={11}
                />
                <Feather
                    style={styles.iconEye}
                    name={iconPass}
                    size={28}
                    color={colors.redButton}
                    onPress={handleChangeIcon}
                />
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.textInputPassword}
                    placeholder="Confirmar Senha"
                    onChangeText={text => setSenhaConfirm(text)}
                    value={txtSenhaConfirm}
                    secureTextEntry={flShowPass}
                    maxLength={11}
                />
                <Feather
                    style={styles.iconEye}
                    name={iconPass}
                    size={28}
                    color={colors.redButton}
                    onPress={handleChangeIconConfirm}
                />
            </View>
            <View style={[styles.selectType, { marginBottom: 35 }]}>
                <View style={{ flex: 0.3, alignItems: 'center' }}>
                    <Text>Aluno</Text>
                </View>
                <Switch
                    trackColor={{ false: colors.blue_light, true: colors.green_light }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={selectType}
                    value={ehProfessor}
                />
                <View style={{ flex: 0.3, alignItems: 'center' }}>
                    <Text>Professor</Text>
                </View>
            </View>

            <FlatList

                data={lstErrors}
                keyExtractor={error => error}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Text>{item}</Text>

                )}
            />
            <MyButton title='Salvar' onPress={() => cadastrarPessoa()} />

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