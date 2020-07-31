import React from 'react';
import { Image }  from 'react-native';
import Logoimg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles'; 


const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={Logoimg}/>
        <Title>Faça seu logon</Title>
        <Input name="email" icon="mail" placeholder="E-mail" />
        <Input name="password" icon="lock" placeholder="Senha" />

        <Button onPress={() => {
          console.log('ok')
        }}>Entrar</Button>
    </Container>
  );
};


export default SignIn;