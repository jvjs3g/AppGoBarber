import React from 'react';
import { render } from 'react-native-testing-library';

import SignIn from '../../pages/SignIn';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => {
      return {
        navigate: jest.fn(),
      };
    },
  };
});

describe('SignIn Page', () => {
  it('should be able to render email/password inputs', () => {
    const { getByPlaceholder } = render(<SignIn />);

    const emailField = getByPlaceholder('Email');
    const passwordField = getByPlaceholder('Senha');

    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();
  });
});