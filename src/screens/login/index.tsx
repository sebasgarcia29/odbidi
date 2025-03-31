import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { PageName } from '../../routes/PageName';
import { NavigationProps } from '../../routes/Params';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { styles } from './styles';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginScreen: React.FC = () => {
  const { navigate } = useNavigation<NavigationProps>();
  const { dispatch } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = (data: { username: string; password: string }) => {
    if (data.username !== 'Sebastian') {
      setError('username', { type: 'manual', message: 'Invalid user' });
      return;
    }
    dispatch({ type: 'LOGIN', payload: data.username });
    navigate(PageName.Welcome);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={onChange}
              value={value}
              testID="username-input"
            />
            {errors.username && <Text style={styles.errorText} testID="username-error">{errors.username.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              testID="password-input"
            />
            {errors.password && <Text testID="password-error" style={styles.errorText}>{errors.password.message}</Text>}
          </>
        )}
      />

      <TouchableOpacity
        testID="login-button"
        style={[styles.button, styles.loginButton]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(LoginScreen);
