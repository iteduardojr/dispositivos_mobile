import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const BiscoitoSorte = () => {
  const [mensagem, setMensagem] = useState('');
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);

  const quebrarBiscoito = () => {
    const frasesSorte = [
      'A vida trará coisas boas se tiver paciência.',
      'Demonstre amor e alegria em todas as oportunidades.',
      'O sucesso está no seu futuro.',
      'Acredite nos seus instintos.',
      'A vida está esperando por você para aproveitá-la.',
    ];

    const indice = Math.floor(Math.random() * frasesSorte.length);
    setMensagem(frasesSorte[indice]);
    setBotaoDesabilitado(true);
  };

  const reiniciarBiscoito = () => {
    setMensagem('');
    setBotaoDesabilitado(false);
  };

  return (
    <View>
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