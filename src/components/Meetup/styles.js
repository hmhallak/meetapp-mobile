import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 8px;
  background: #fff;

  display: flex;
  flex-direction: column;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Banner = styled.Image`
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  width: 100%;
  height: 150px;
`;

export const Content = styled.View`
  display: flex;
  padding: 15px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
`;

export const InfoText = styled.Text`
  font-weight: bold;
  color: #999;
  margin-left: 5px;
`;

export const SubscribeButton = styled(Button)`
  margin-top: 8px;
`;
