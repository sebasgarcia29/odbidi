import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import { useLoginForm } from '../../hooks/useForm';
import { styles } from './styles';

const LoginScreen: React.FC = () => {
  const { control, handleSubmit, errors, onSubmit } = useLoginForm();
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
