import React from 'react';
import { SafeAreaView } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import LoginScreen from './src/screens/login/index';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <LoginScreen />
      </SafeAreaView>
    </AuthProvider>
  );
}

export default App;
