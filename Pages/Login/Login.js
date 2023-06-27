
import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Image
} from 'react-native';
import api from '../../services/api';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import MyButton from '../../Components/MyButton/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinkButton from '../../Components/LinkButton/Index';
import colors from '../../styles/colors';

const eye = 'eye';
const eyeOff = 'eye-off';

export default function Login() {

  const [flShowPass, setShowPass] = useState(true)
  const [iconPass, setIconPass] = useState(eyeOff)
  const [txtLogin, setLogin] = useState('TESTEALUNO1')
  const [txtSenha, setSenha] = useState('123')
  const navigation = useNavigation()
  const [flLoading, setLoading] = useState(false)

  const Imagem = require('../../assets/Images/logo_uniaraxa.png');

  function handleChangeIcon() {
    let icone = iconPass == eye ? eyeOff : eye;
    let flShowpassAux = !flShowPass;
    setShowPass(flShowpassAux);
    setIconPass(icone);
  }

  function TrocarNome() {
    txtLogin === 'HUMBERTO' ? setLogin('ESTEVAO') : setLogin('HUMBERTO');
  }

  async function navigateToAlunosOuProfessores() {
    let loginTxt = txtLogin;
    let senhaTxt = txtSenha;

    if (txtLogin === '') {
      alert('Campo usuário é obrigatório!');
    }
    else if (txtSenha === '') {
      alert('Campo senha é obrigatório!');
    }

    const response = await api.post("/login/post", { nome: loginTxt, senha: senhaTxt });
    const people = await api.post(`/login/getPeople?id=${response.data.result.pessoaID}`)

    if (response.data.length < 1) {
      alert('Usuario e/ou senha invalido!');
    }
    else {
      AsyncStorage.setItem('@SistemaTCC:user', response.data.result.pessoaID);
      AsyncStorage.setItem('@SistemaTCC:userName', String(people.data.result.nome));
      if (people.data.result.tipoPessoaID === 5) {
        navigation.navigate('TelaOrientadores')
      }
      else {
        navigation.navigate('TelaTCC')
      }
    }
  }

  function navigateToBack() {
    navigation.navigate('HomePage')
  }

  return (
    <View style={styles.container}>

      <Image source={Imagem} style={styles.imagem} />

      <TextInput
        style={styles.textInput}
        placeholder='Login'
        onChangeText={text => setLogin(text)}
        value={txtLogin}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.textInputPassword}
          placeholder="Senha"
          onChangeText={text => setSenha(text)}
          value={txtSenha}
          secureTextEntry={flShowPass}
        />
        <Feather
          style={styles.iconEye}
          name={iconPass}
          size={28}
          color={colors.redButton}
          onPress={handleChangeIcon}
        />

      </View>
      <MyButton title='Entrar' onPress={navigateToAlunosOuProfessores}

      />
      <MyButton title='Trocar' onPress={TrocarNome} />

      <MyButton title='Sair' onPress={navigateToBack} />

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
  textInput: {
    height: 40,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderRadius: 8,
    borderWidth: 1,
    width: '70%',
    marginBottom: 16,
    paddingHorizontal: 8
  },
  textInputPassword: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    height: 40,
    borderWidth: 0,
    marginLeft: 6,
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
    color: colors.black,
    fontSize: 22,
    fontWeight: 'bold'
  },
  passwordContainer: {
    marginBottom: 35,
    backgroundColor: colors.white,
    borderColor: colors.black,
    height: 42,
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconEye: {
    color: colors.black,
    paddingHorizontal: 8,
    marginTop: 6
  },
  imagem: {
    width: 250,
    height: 250,
    marginBottom: 100
  },
});