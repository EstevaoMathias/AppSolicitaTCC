
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';


export default function Imc() {
    const navigation = useNavigation();
//conceito de estado [ varivel guarda o valor, funcao que atualiza essa variavel] = valor padrao
    const [altura,setAltura] = useState(0);
    const [peso,setPeso] = useState(0);
    const [resultado, setResultado] = useState('');
    //function alerta(){
    //   setResultado('Sua idade é ' + idade);
    //}

   function verificarImc(){
    const calculo = peso * (altura*altura);
      if(calculo < 18.5)
      setResultado('Abaixo do peso normal');
      else if (calculo >= 18.5 && calculo <= 24.9)
      setResultado('Peso normal'); 
      else if (calculo >= 25 && calculo <= 29.9)
      setResultado('Excesso de peso');
      else if (calculo >= 30 && calculo <= 34.9)
      setResultado('Obesidade classe I');
      else if (calculo >= 35 && calculo <= 39.9)
      setResultado('Obesidade classe II');
      else 
      setResultado('Obesidade classe III');
      
    } 


    return(
        <View style={styles.container}>
            <Text style={styles.title}>Calculo IMC</Text>
            <View>
                    <TextInput
                    placeholder="Seu peso"             
                    keyboardType={'numeric'} 
                    onChangeText={(peso) => setPeso(peso)}
                    />
                    <TextInput
                    placeholder="Sua altura"             
                    keyboardType={'numeric'} 
                    onChangeText={(altura) => setAltura(altura)}
                    />
                    <TouchableOpacity style={styles.button} onPress={verificarImc}>
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