import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
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

export default function Meetup({ data, onSubscribe }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  return (
    <Container past={data.past}>
      <Banner
        source={{
          uri: data.banner
            ? data.banner.url
            : `https://picsum.photos/seed/${data.user.name}/470/150`,
        }}
      />
      <Content>
        <Title>{data.title}</Title>
        <Info>
          <Icon name="event" size={20} color="#999" />
          <InfoText>{dateParsed}</InfoText>
        </Info>
        <Info>
          <Icon name="place" size={20} color="#999" />
          <InfoText>{data.location}</InfoText>
        </Info>

        <Info>
          <Icon name="person" size={20} color="#999" />
          <InfoText>Organizador: {data.user.name}</InfoText>
        </Info>
        {!data.past ? (
          <SubscribeButton onPress={onSubscribe}>
            Realizar inscrição
          </SubscribeButton>
        ) : null}
      </Content>
    </Container>
  );
}
