import React from 'react';
import { Image }  from 'react-native';
import { Container, Title } from './styles'; 
import Logoimg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={Logoimg}/>
        <Title>Faça seu logon</Title>
    </Container>
  );
};


export default SignIn;