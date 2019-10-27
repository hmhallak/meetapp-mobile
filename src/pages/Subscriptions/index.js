import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { Alert, Text } from 'react-native';
import api from '~/services/api';

import { Container, List } from './styles';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('subscriptions');

      setSubscriptions(response.data);
    }

    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      const response = await api.delete(`subscriptions/${id}`);

      Alert.alert(
        'Inscrição cancelada',
        'Você cancelou sua inscrição no meetup.',
      );

      setSubscriptions(subscriptions.filter(s => s.id !== id));
    } catch (error) {
      Alert.alert(error.response.data.error);
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        {subscriptions.length > 0 ? (
          <List
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                subscription
                onCancel={() => handleCancel(item.id)}
                data={item.Meetup}
              />
            )}
          />
        ) : (
          <Text>Não há nenhuma inscrição.</Text>
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
