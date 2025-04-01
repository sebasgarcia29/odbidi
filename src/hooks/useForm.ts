import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavigationProps } from '../routes/Params';
import { PageName } from '../routes/PageName';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const useLoginForm = () => {
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

  return { control, handleSubmit, errors, onSubmit };
};
