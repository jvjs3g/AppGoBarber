import React, { useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView }  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Logoimg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles'; 


const SignUp: React.FC = () => {

  const FormRef = useRef<FormHandles>(null);

  const navigation = useNavigation();
  return (
    <>
      <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS == 'ios' ? 'padding' : undefined} enabled>
        <ScrollView  keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex:1}}>
          <Container>
            <Image source={Logoimg}/>
                <View>
                <Title>Crie sua conta</Title>
                </View>
                <Form ref={FormRef} onSubmit={(data) => {
                  console.log(data);
                }}>
                  <Input name="name" icon="user" placeholder="Nome" />
                  <Input name="email" icon="mail" placeholder="E-mail" />
                  <Input name="password" icon="lock" placeholder="Senha" />

                  <Button onPress={() => {
                    FormRef.current?.submitForm();
                  }}>Entrar</Button>
              </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() =>  {navigation.goBack()}} >
        <Feather name="arrow-left" size={20} color="#fff"/>
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};


export default SignUp;