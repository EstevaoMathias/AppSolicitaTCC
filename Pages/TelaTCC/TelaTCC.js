
import LinkButton from '../../Components/LinkButton/Index';
import colors from '../../styles/colors';
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import PessoaComp from '../../Components/SolicitacoesComp/Solicitacoes';
import api from '../../ApiService/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MostrarAlunos() {

  const [SolicitacoesList, setSolicitacoesList] = useState([]);
  const Imagem = require('../../assets/Images/teste.png');

  useEffect(() => {
    ObterSolicitacoes();
  },
    []

  );
  async function ObterSolicitacoes() {
    const advisor = JSON.parse(await AsyncStorage.getItem('@SistemaTCC:Advisor'));
    const response = await api.get(`/Solicitacoes?ProfessorOrientadorID=${advisor.id}`);
    setSolicitacoesList(response.data);

  }

  const navigation = useNavigation();

  function navigateToBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>

      <Text style={styles.textTitle}>Solicitações Pendentes</Text>

      <FlatList
        data={SolicitacoesList}
        renderItem={({ item }) => (
          <PessoaComp
            AlunoSolicitanteID={item.AlunoSolicitanteID}
            NomeProjeto={item.NomeProjeto}
            Descricao={item.Descricao}
          />
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
    backgroundColor: 'blue'
  },
  textTitle: {
    color: colors.white,
    fontSize: 40,
    marginTop: 15,
    marginBottom: 30,
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