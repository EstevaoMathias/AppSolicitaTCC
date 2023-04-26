
import MyButton  from '../../Components/MyButton/Index';
import LinkButton from '../../Components/LinkButton/Index';
import colors from '../../styles/colors';
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';


export default function Churrascometro() {
    const navigation = useNavigation();
//conceito de estado [ varivel guarda o valor, funcao que atualiza essa variavel] = valor padrao
    const [qtdeHomem,setHomem] = useState(0);
    const [qtdeMulher,setMulher] = useState(0);
    const [qtdeCrianca,setCrianca] = useState(0);
    const [resultado, setResultado] = useState('');   

    function navigateToBack() {
      navigation.goBack();
  }

    function calcularChurrasco(){
      const calculaHomem = (400 * qtdeHomem);
      const calculaMulher = (300 * qtdeMulher);
      const calculaCrianca = (200 * qtdeCrianca);
      const calculoCarne = (calculaHomem + calculaMulher + calculaCrianca)/1000;
      const carvao = Math.ceil(calculoCarne/6);
      setResultado('- Quantidade de carne:' + '\n' + 
                   '    ' + calculoCarne + '  KG' + '\n' +
                   '- Quantidade carvão:' + '\n' +
                   '    ' + carvao + ' Saco' + '\n' +
                   '- Quantidade para homens:' + '\n' + 
                   '    ' + calculaHomem + ' Gramas' + '\n' + 
                   '- Quantidade para mulheres:' + '\n' +
                   '    ' + calculaMulher + ' Gramas' + '\n' +
                   '- Quantidade para crianças:' + '\n' + 
                   '    ' + calculaCrianca  + ' Gramas');
    }


    return(
      <View style={styles.container}>
            <Text style={styles.textTitle}>Insira as informações do churrasco</Text>
                    <TextInput
                    style={styles.textInput}
                    placeholder='Quantidade homens'
                    onChangeText={(qtdeHomem) => setHomem(qtdeHomem)}
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Quantidade Mulheres'
                    onChangeText={(qtdeMulher) => setMulher(qtdeMulher)}
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Quantidade Crianças'
                    onChangeText={(qtdeCrianca) => setCrianca(qtdeCrianca)}
                    />
                          <MyButton title='Calcular' onPress={calcularChurrasco}
                          />
                          <LinkButton title='Voltar' onPress={navigateToBack}
                          />
                    <Text style={styles.textResult}>
                        {resultado}
                    </Text>
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