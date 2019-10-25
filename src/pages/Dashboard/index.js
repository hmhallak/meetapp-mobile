import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import { Container, List } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      setMeetups(response.data);
    }

    loadMeetups();
  }, []);

  async function handleSubscribe(id) {
    try {
      const response = await api.post(`meetups/${id}/subscriptions`);
      Alert.alert(
        'Inscrição realizada',
        'Você se inscreveu com sucesso no meetup',
      );
    } catch (error) {
      Alert.alert(error.response.data.error);
    }
  }

  return (
    <Background>
      <Container>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup onSubscribe={() => handleSubscribe(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
