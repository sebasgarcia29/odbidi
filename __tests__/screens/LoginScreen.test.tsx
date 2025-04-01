import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../src/screens/Login';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

test('should navigate success in Login ✅', async () => {
  const mockNavigate = jest.fn();

  (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

  const { getByText, getByPlaceholderText } = render(
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>
  );

  const usernameInput = getByPlaceholderText('Username');
  const passwordInput = getByPlaceholderText('Password');

  const loginButton = getByText('Login');
  expect(loginButton).toBeTruthy();

  await act(async () => {
    fireEvent.changeText(usernameInput, 'Sebastian');
    fireEvent.changeText(passwordInput, 'Test1234');
    fireEvent.press(loginButton);
  });

  expect(mockNavigate).toHaveBeenCalledWith('Welcome');
});

test('should show error when username is not Sebastian ✅', async () => {
  const mockNavigate = jest.fn();
  const mockDispatch = jest.fn();

  (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
  jest.spyOn(React, 'useContext').mockReturnValue({ dispatch: mockDispatch });

  const { getByTestId } = render(
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>
  );

  const usernameInput = getByTestId('username-input');
  const passwordInput = getByTestId('password-input');
  const loginButton = getByTestId('login-button');

  fireEvent.changeText(usernameInput, 'Dilan');
  fireEvent.changeText(passwordInput, 'testPassword');
  fireEvent.press(loginButton);

  await waitFor(() => expect(getByTestId('username-error')).toBeTruthy());

  const errorMessage = getByTestId('username-error');
  expect(errorMessage).toHaveTextContent('Invalid user');

  expect(mockNavigate).not.toHaveBeenCalled();
});
