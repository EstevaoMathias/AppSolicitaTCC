
import LinkButton from '../../Components/LinkButton/Index';
import colors from '../../styles/colors';
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import PessoaComp from '../../Components/PessoaComponent/Pessoa';
import api from '../../ApiService/api';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function MostrarProfessores() {
  const [ProfessoresList, setProfessoresList] = useState([]);
  const Imagem = require('../../assets/Images/teste.png');

  useEffect(() => {
    ObterProfessores();
  },
    []

  );
  async function ObterProfessores() {
    //alert('Fazendo requisição');
    const response = await api.get('/Pessoa?TipoPessoaID=2');
    setProfessoresList(response.data);
  }

  const navigation = useNavigation();

  function navigateToBack() {
    navigation.goBack();
  }

  function SelecionarProfessor(pessoa){
    navigation.navigate('CadastroSolicitacao');
    AsyncStorage.setItem('@SistemaTCC:Advisor', JSON.stringify(pessoa));
  }

  return (
    <View style={styles.container}>

      <Text style={styles.textTitle}>Orientadores Disponíveis</Text>
      <TextInput style={styles.textInput} placeholder='Nome do Professor'
      />



      
        <FlatList
          data={ProfessoresList}
          renderItem={({ item }) => (
            <PessoaComp Imagem={Imagem} Nome={item.Nome} Email={item.Email} callback={() => SelecionarProfessor(item)}/>
            //componente do item da lista
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.itemJokeCSS}
          keyExtractor={item => item.id}
        />



      <LinkButton title='Voltar' onPress={navigateToBack}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  textTitle: {
    borderColor: colors.black,
    fontSize: 28,
    marginBottom: 8
  },
  inputContainer: {

    marginTop: 30,
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff',
    height: '80%'

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
  buttonIn: {
    borderRadius: 8,
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextIn: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  textResult: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 18
  }
});