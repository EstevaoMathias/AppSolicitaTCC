
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

  const [search, setSearch] = useState('');
  const [idAluno, setIDAluno] = useState('');
  const [profList, setProfList] = useState([]);

  const [ProfessoresList, setProfessoresList] = useState([]);
  const Imagem = require('../../assets/Images/teste.png');

  useEffect(() => {
    ObterProfessores();
  },
    []

  );

  const noResultsComponent = (
    <View >
      <Text style={{ fontStyle: 'italic', fontSize: 22, color: 'white', marginBottom: 20}}>Nenhum resultado encontrado!</Text>
    </View>
  );


  async function ObterProfessores() {
    const response = await api.get('/Pessoa?TipoPessoaID=2');
    const id = await AsyncStorage.getItem('@SistemaTCC:Advisor') || '';
    setProfList(response.data);
  }

  /*async function ObterProfessores() {
    const response = await api.get('/Pessoa?TipoPessoaID=2');
    setProfessoresList(response.data);
  }
  */

  const filteredData = profList.filter(
    (item) =>
    item.Nome.toLowerCase().includes(search.toLowerCase())
    //select * from data where nome like '%%'
  );
  
  const renderItem = ({ item }) => (
    <PessoaComp Imagem={Imagem} Nome={item.Nome} Email={item.Email} callback={() => SelecionarProfessor(item)} />
  );

  const navigation = useNavigation();

  function navigateToBack() {
    navigation.goBack();
  }

  function SelecionarProfessor(pessoa) {
    navigation.navigate('CadastroSolicitacao');
    AsyncStorage.setItem('@SistemaTCC:Advisor', JSON.stringify(pessoa));
  }

  return (
    <View style={styles.container}>

      <Text style={styles.textTitle}>Orientadores Disponíveis</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Nome do Professor'
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
    
    {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />}
        />
      ) : (
        noResultsComponent
      )}

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
    marginTop: 15,
    marginBottom: 30,
    color: 'white',
    fontSize: 40
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
  item: {
    padding: 5
  },
  textInput: {
    height: 40,
    borderColor: colors.black,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    width: '70%',
    marginBottom: 35,
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