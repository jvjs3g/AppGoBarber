import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Image, KeyboardAvoidingView, Platform, View, ScrollView }  from 'react-native';
import Logoimg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles'; 


const SignIn: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS == 'ios' ? 'padding' : undefined} enabled>
        <ScrollView  keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex:1}}>
          <Container>
            <Image source={Logoimg}/>
                <View>
                <Title>Faça seu logon</Title>
                </View>
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <Button onPress={() => {
                console.log('ok')
              }}>Entrar</Button>
              <ForgotPassword onPress={() => { }}>
                <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
              </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() =>  {navigation.navigate('SignUp')}} >
        <Feather name="log-in" size={20} color="#ff9000"/>
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};


export default SignIn;