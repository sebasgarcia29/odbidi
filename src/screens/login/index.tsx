import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { styles } from './styles';

const LoginScreen: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);

  console.log({state})

  const welcomeMessage = useMemo(() => (
    <Text style={styles.text}>
      {state.isAuthenticated ? `Bienvenido, ${state.user}` : 'Por favor inicia sesión'}
    </Text>
  ), [state.isAuthenticated, state.user]);

  return (
    <View style={styles.container}>
      {welcomeMessage}
      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => dispatch({ type: 'LOGIN', payload: 'Sebastian' })}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => dispatch({ type: 'LOGOUT' })}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(LoginScreen);
