
import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import api from '../../ApiService/api';
import MyButton from '../../Components/MyButton/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinkButton from '../../Components/LinkButton/Index';

import colors from '../../styles/colors';

//import AsyncStorage from '@react-native-async-storage/async-storage';

const eye = 'eye';
const eyeOff = 'eye-off';

export default function Login() {

  const [flShowPass, setShowPass] = useState(true)
  const [iconPass, setIconPass] = useState(eyeOff)
  const [txtLogin, setLogin] = useState('HUMBERTO')
  const [txtSenha, setSenha] = useState('1234')
  const navigation = useNavigation()
  const [flLoading, setLoading] = useState(false)
  //const [UsuarioValido, setUsuarioValido] = useState([])



  function handleChangeIcon() {
    let icone = iconPass == eye ? eyeOff : eye;
    let flShowpassAux = !flShowPass;
    setShowPass(flShowpassAux);
    setIconPass(icone);
  }

  function TrocarNome(){
    txtLogin === 'HUMBERTO' ? setLogin('ESTEVAO') : setLogin('HUMBERTO');
  }

  async function navigateToAlunosOuProfessores() {

    if (txtLogin.trim() === '') {
      alert('Campo login é obrigatório');
      return;
    }

    if (txtSenha.trim() === '') {
      alert('Campo senha é obrigatório');
      return;
    }

    let resposta = 0;

    await api.get(`/Pessoa?Nome=${txtLogin}&Senha=${txtSenha}`).then(async (response) => {
      resposta = response.data.length;
      if (resposta == 0) {
        alert('Usuario e/ou senha inválido!');
        return;
      } else {
      
        if (response.data[0].TipoPessoaID == 1) {
          await AsyncStorage.setItem('@SistemaTCC:user', JSON.stringify(response.data[0]));
          navigation.navigate('TelaOrientadores');
          return;
        }

        if (response.data[0].TipoPessoaID == 2) {
          navigation.navigate('TelaTCC');
          return;
        }

        else {
          alert('Não está achando o tipo');
        }
        return;
      }
    }).catch(err => alert(err));

  }


  function navigateToNovoUsuario() {
    navigation.navigate('NovoUsuario')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Faça seu login ou seu cadastro</Text>
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

      <LinkButton title='Cadastrar-se'
        onPress={navigateToNovoUsuario}
      />
      <MyButton title='Trocar' onPress={TrocarNome}/>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    borderColor: colors.black,
    fontSize: 28,
    marginBottom: 8
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
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold'
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
    color: colors.black,
    paddingHorizontal: 8,
    marginTop: 6
  },
});