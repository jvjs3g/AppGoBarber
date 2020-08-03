import React, { useRef, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert }  from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import getValidationErros from '../../utils/getValidationErros';

import * as Yup from 'yup'; 

import Logoimg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles'; 


interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const  handlerSignIn = useCallback( async (data: SignInFormData ) => {
    try{
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly:false,
      });
      

    }catch(err){

      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais.',

      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS == 'ios' ? 'padding' : undefined} enabled>
        <ScrollView  keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex:1}}>
          <Container>
            <Image source={Logoimg}/>
                <View>
                <Title>Faça seu logon</Title>
                </View>
              <Form ref={formRef} onSubmit={handlerSignIn}>
              <Input name="email"
              icon="mail"
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
              />

              <Input name="password"
              ref={passwordInputRef}
              icon="lock"
              placeholder="Senha"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
              />

              <Button onPress={() => {
                formRef.current?.submitForm();
              }}>Entrar</Button>
              </Form>
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