import React, { useRef, useCallback } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert }  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';

import getValidationErros from '../../utils/getValidationErros';

import Logoimg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles'; 


interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {

  const FormRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const  handlerSignUp = useCallback( async (data: SignUpFormData ) => {
    try{
      FormRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6,'No mínimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly:false,
      });

      await api.post('/users',data);

      Alert.alert(
        'Cadastro realizado como sucesso!',
        'Você já pode fazer login na aplicação.',
      );
      navigation.goBack();

    }catch(err){
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        FormRef.current?.setErrors(errors);

        return;
      }

        Alert.alert('Erro no cadastro',
        'Ocorreu um erro ao fazer cadastro, tente novamente.',
       );
    }
  }, [navigation]); 

  return (
    <>
      <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS == 'ios' ? 'padding' : undefined} enabled>
        <ScrollView  keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex:1}}>
          <Container>
            <Image source={Logoimg}/>
                <View>
                <Title>Crie sua conta</Title>
                </View>
                <Form ref={FormRef} onSubmit={handlerSignUp}>
                  <Input autoCapitalize="words"                  
                  name="name" icon="user"
                  placeholder="Nome"
                  returnKeyType="next"
                  onSubmitEditing={() =>{
                    emailInputRef.current?.focus();
                  }}
                  />

                  <Input ref={emailInputRef}
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  name="email" icon="mail"
                  placeholder="E-mail"
                  returnKeyType="next"
                  onSubmitEditing={() =>{
                    passwordInputRef.current?.focus();
                  }}
                  />

                  <Input ref={passwordInputRef}
                  name="password" icon="lock"
                  secureTextEntry                  
                  placeholder="Senha"
                  returnKeyType="send"
                  onSubmitEditing={() => FormRef.current?.submitForm()} />

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