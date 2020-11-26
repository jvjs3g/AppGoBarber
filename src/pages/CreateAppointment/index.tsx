import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

import { Container, Header, BackButton, HeaderTitle, UserAvatar, ProvidersListContainer, ProvidersList , ProviderContainer, ProviderAvatar, ProviderName} from './style';

interface RouteParams {
  providerId: string;
}

export interface Providers {
  id:string;
  name:string;
  avatar_url:string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth(); 
  const route = useRoute();
  const { goBack } = useNavigation();
  const { providerId } = route.params as RouteParams;

  const [providers,setProviders] = useState<Providers[]>([]);
  
  const [selectedProvider,setSelectedProvider] = useState(providerId);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  },[]);



  const navigateBack = useCallback(() => {
    goBack();
  },[goBack]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591"/>
        </BackButton>
        <HeaderTitle>
        Cabeleireiros
        </HeaderTitle>
        <UserAvatar source={{ uri: user.avatar_url }}/>
      </Header>

      <ProvidersListContainer> 
      <ProvidersList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={providers}
        keyExtractor={(provider) => provider.id}
        renderItem={({ item: provider }) => (
         <ProviderContainer selected={provider.id == selectedProvider}>
           <ProviderAvatar source={{ uri: provider.avatar_url}}/>
           <ProviderName>{provider.name}</ProviderName>
         </ProviderContainer>
        )}
        />
      </ProvidersListContainer>
    </Container>
  );
};

export default CreateAppointment;