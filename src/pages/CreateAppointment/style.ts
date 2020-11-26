import { FlatList } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { Providers } from '../Dashboard';

interface ProviderContainerProps {
  selected: boolean;
}


export const Container = styled.View`
  flex:1;
`;

export const Header = styled.View`
  padding:24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background:#28262E;

  flex-direction:row;
  justify-content:space-between;
  align-items:center;
`;
export const BackButton = styled.TouchableOpacity`

`;
export const HeaderTitle = styled.Text`
  color:#f5ede8;
  font-family: sans-serif;
  font-size:20px;
  margin-left:16px;
`;
export const UserAvatar = styled.Image`
  width:56px;
  height:56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const ProvidersListContainer = styled.View`
  height:112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Providers>)`
  padding:32px 24px;
`;

export const ProviderContainer = styled.View`
  background:#3e3b47;
  flex-direction:row;
  align-items:center;
  padding: 8px 12px;
  border-radius:10px;
`;
export const ProviderAvatar = styled.Image`
  width:32px;
  height:32px;
  border-radius:16px;
`;
export const ProviderName = styled.Text`
  margin-left:8px;
  font-family:sans-serif;
  font-size:16px;
  color:#f4ede8;
`;
