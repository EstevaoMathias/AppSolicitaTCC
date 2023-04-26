
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';

import React, {useState} from 'react';


export default function Componente1() {
//conceito de estado [ varivel guarda o valor, funcao que atualiza essa variavel] = valor padrao
    const [peso,setPeso] = useState(0);
    const [resultado, setResultado] = useState('');
    //function alerta(){
    //   setResultado('Sua idade é ' + idade);
    //}

    function verificarImc(){
      if(peso < 18.5)
      setResultado('Abaixo do peso normal');
      else if (peso >= 18.5 && peso <= 24.9)
      setResultado('Peso normal'); 
      else if (peso >= 25 && peso <= 29.9)
      setResultado('Excesso de peso');
      else if (peso >= 30 && peso <= 34.9)
      setResultado('Obesidade classe I');
      else if (peso >= 35 && peso <= 39.9)
      setResultado('Obesidade classe II');
      else 
      setResultado('Obesidade classe III');
    }


    return(
        <View>
            <Text>Calculo IMC</Text>
            <View>
                    <TextInput
                    placeholder="Seu peso"
                    keyboardType={'numeric'} 
                    onChangeText={(peso) => setPeso(peso)}
                    />
                    <TouchableOpacity onPress={verificarImc}>
                        <Text>Calcular</Text>
                    </TouchableOpacity>
                    <Text>
                        {resultado}
                    </Text>
            </View>
        </View>
    );
}