import React, { useState } from 'react';
import { View, Text, Button, Image, } from 'react-native';

const BiscoitoSorte = () => {

  const [imageSource, setImageSource] = useState( require('../../assets/biscoitofechado.png'));
  const [mensagem, setMensagem] = useState('');
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);

  const initialImageSource = require('../../assets/biscoitofechado.png'); 
  const changedImageSource = require('../../assets/biscoitoAberto.png'); 

  const quebrarBiscoito = () => {
    const frasesSorte = [
      'Você é corno',
      'Você não é corno',
      'Talvez você seja corno',
      'Lubrifique seus chifres',
      'Não procure, pois corno acha',
    ];



    const indice = Math.floor(Math.random() * frasesSorte.length);
    setMensagem(frasesSorte[indice]);
    setBotaoDesabilitado(true);
    setImageSource(changedImageSource);
  };

  const reiniciarBiscoito = () => {
    setMensagem('');
    setBotaoDesabilitado(false);
    setImageSource(initialImageSource);
  };



  return (

    
    <View>
       <Image
        style={{alignSelf: 'center', width: 300, height: 300 }}
        source={imageSource}
      />
      <Text>{mensagem}</Text>
      <Button
        title="Quebrar Biscoito"
        onPress={quebrarBiscoito}
        disabled={botaoDesabilitado}
      />
      <Button
        title="Reiniciar Biscoito"
        onPress={reiniciarBiscoito}
        disabled={!botaoDesabilitado}
        
      />
    </View>

  );
};

export default BiscoitoSorte;