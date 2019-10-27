import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';

import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <Image
        source={logo}
        style={{ width: 23, height: 24, marginBottom: 10 }}
      />
    </Container>
  );
}
