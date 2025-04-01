import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../../src/context/AuthContext';
import { useLoginForm } from '../../src/hooks/useForm';
import { PageName } from '../../src/routes/PageName';
import { ReactNode } from 'react';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('useLoginForm Hook', () => {
  let mockDispatch: jest.Mock;
  let wrapper: React.FC<{ children: ReactNode }>;

  beforeEach(() => {
    mockDispatch = jest.fn();
    wrapper = ({ children }) => (
      <AuthContext.Provider value={{ state: {
        isAuthenticated: false,
        user: null
      }, dispatch: mockDispatch }}>
        <NavigationContainer>{children}</NavigationContainer>
      </AuthContext.Provider>
    );
  });

  it('should initialize with empty fields and no errors', () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper });

    expect(result.current.control).toBeDefined();
    expect(result.current.errors).toEqual({});
  });

  it('should set an error when username is not Sebastian', async () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper });

    await act(async () => {
      result.current.onSubmit({ username: 'JohnDoe', password: 'password123' });
    });

    expect(result.current.errors.username).toBeDefined();
    expect(result.current.errors.username?.message).toBe('Invalid user');
  });

  it('should dispatch login and navigate on valid credentials', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: mockNavigate });

    const { result } = renderHook(() => useLoginForm(), { wrapper });

    await act(async () => {
      result.current.onSubmit({ username: 'Sebastian', password: 'password123' });
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGIN', payload: 'Sebastian' });
    expect(mockNavigate).toHaveBeenCalledWith(PageName.Welcome);
  });
});
