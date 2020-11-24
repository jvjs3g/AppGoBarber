import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

import { Container, Header, HeaderTitle, UserName, UserAvatar, ProfileButton, ProvidersList } from './styles';


export interface Providers {
  id:string;
  name:string;
  avatar_url:string;
}


const Dashboard: React.FC = () => {
  const [providers,setProviders] = useState<Provider[]>([]);
  
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  },[])

  const navigateToProfile = useCallback(() => {
    //navigate('Profile')
    signOut();
  }, [signOut]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem Vindo,{"\n"}
          <UserName>
            {user.name}
          </UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
         <UserAvatar source={{uri:user.avatar_url}}/>
        </ProfileButton>
      </Header>
      <ProvidersList
      data={providers}
      keyExtractor={provider => provider.id}
      renderItem={({item }) => (
        <UserName>
            {item.name}
          </UserName>
      )}
      />
    </Container>
  );
};

export default Dashboard;