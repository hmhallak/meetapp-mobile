import styled from 'styled-components/native';

import { ActivityIndicator } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const Day = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const DayText = styled.Text`
  font-size: 24;
  color: #fff;
  align-self: center;
  font-weight: bold;
  margin: 0 10px;
`;

export const Loading = styled(ActivityIndicator)`
  margin-bottom: 15px;
`;
