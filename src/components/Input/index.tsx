import React, { useRef, useEffect  } from 'react'
import {  TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icon  } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReferences {
  value: string; 
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {

  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = ' ', fieldName, error } = useField(name); 
  const inputValueRef = useRef<InputValueReferences>({ value: defaultValue});

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value){
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value});
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      }
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <Icon name={icon} size={20} color="#333360"/>
      <TextInput
      ref={inputElementRef}
      keyboardAppearance="dark"
      placeholderTextColor="#666360"
      defaultValue={defaultValue}
      {...rest}
      onChangeText={(value) => {
        inputValueRef.current.value = value;
      }}
      />
    </Container>  
  );
};

export default Input;