import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  Content,
  Info,
  Title,
  InfoText,
  SubscribeButton,
} from './styles';

export default function Meetup() {
  return (
    <Container>
      <Banner source={{ uri: 'https://picsum.photos/seed/picsum/470/150' }} />
      <Content>
        <Title>Meetup de React Native</Title>
        <Info>
          <Icon name="event" size={20} color="#999" />
          <InfoText>24 de Novembro, às 20h</InfoText>
        </Info>
        <Info>
          <Icon name="place" size={20} color="#999" />
          <InfoText>Cuiabá, MT</InfoText>
        </Info>

        <Info>
          <Icon name="person" size={20} color="#999" />
          <InfoText>Organizador: Hussein Hallak</InfoText>
        </Info>

        <SubscribeButton>Realizar inscrição</SubscribeButton>
      </Content>
    </Container>
  );
}
