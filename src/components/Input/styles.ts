import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';


export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 10px;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: sans-serif;
`;

export const Icon = styled(Feather)`
  margin-right: 16px; 
`;