import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { MyStack } from './src/routes/Stack';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <MyStack />
      </SafeAreaView>
    </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
