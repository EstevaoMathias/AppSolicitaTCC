
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';


export default function Page1() {
    const navigation = useNavigation();
//conceito de estado [ varivel guarda o valor, funcao que atualiza essa variavel] = valor padrao
    const [idade,setIdade] = useState(0);
    const [resultado, setResultado] = useState('');

    function verificarIdade(){
      if(idade < 18)
      setResultado('Você é menor de idade!');
      else 
      setResultado('Você é maior de idade!');
    }


    return(
        <View style={styles.container}>
            <Text style={styles.title}>Verificação de Idade</Text>
            <View>
                    <TextInput
                    placeholder="Sua Idade"
                    keyboardType={'numeric'} 
                    onChangeText={(idade) => setIdade(idade)}
                    />
                    <TouchableOpacity style={styles.button} onPress={verificarIdade}>
                        <Text style={styles.buttonText}>Calcular</Text>
                    </TouchableOpacity>
                    <Text style={styles.textResult}>
                        {resultado}
                    </Text>
                    <TouchableOpacity style={styles.button}  onPress={()=>navigation.goBack()} > 
                        <Text style={styles.buttonText}>Voltar</Text> 
                    </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    title: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 50,
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
    input: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'stretch'
    },
    button: {
      marginTop: 10,
      height: 60,
      backgroundColor: 'green',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
      shadowOpacity: 20,
      shadowColor: '#ccc',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    textResult: {
      color: '#000',
      fontWeight: 'bold',
      textAlign : 'center'
    }
  });