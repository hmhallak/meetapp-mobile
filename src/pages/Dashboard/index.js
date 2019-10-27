import React, { useEffect, useState, useMemo } from 'react';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, List, Day, DayText, Loading } from './styles';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [meetupsCount, setMeetupsCount] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date],
  );

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: { date, page: 1 },
      });

      setMeetups(response.data);
      setMeetupsCount(response.data.length);
    }

    if (isFocused) {
      loadMeetups();
    }
  }, [date, isFocused]); // eslint-disable-line

  async function loadMore() {
    setLoading(true);
    const response = await api.get('meetups', {
      params: { date, page: page + 1 },
    });

    setMeetups([...meetups, ...response.data]);
    setMeetupsCount(response.data.lenght);
    setPage(page + 1);
    setLoading(false);
  }

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

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Background>
      <Header />
      <Container>
        <Day>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={26} color="#fff" />
          </TouchableOpacity>
          <DayText>{dateFormatted}</DayText>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={26} color="#fff" />
          </TouchableOpacity>
        </Day>

        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup onSubscribe={() => handleSubscribe(item.id)} data={item} />
          )}
          onEndReached={meetupsCount >= 10 ? loadMore : null}
          onEndReachedThreshold={0.2}
        />
        {loading ? <Loading /> : null}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
