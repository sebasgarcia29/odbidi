import React, { useContext, useMemo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { PageName } from '../../routes/PageName';
import { NavigationProps } from '../../routes/Params';
import { styles } from './styles';

const WelcomeScreen = () => {

  const { navigate } = useNavigation<NavigationProps>()
  const { state, dispatch } = useContext(AuthContext);

  const onPressLogout = () => {
    navigate(PageName.Login)
    dispatch({ type: 'LOGOUT' })
  }

  const welcomeMessage = useMemo(() => (
    <Text style={styles.text}>
      {`Welcome, ${state.user}!`}
    </Text>
  ), [state.isAuthenticated, state.user]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {state.isAuthenticated && (
        welcomeMessage
      )}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={onPressLogout}
      >
        <Text style={styles.buttonText}>{'Logout'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WelcomeScreen
