import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import LoginIllustration from '../../assets/image/login_illustration.jpg';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {TRANSACTION_HISTORY_LIST} from '../../routes/route';
import {checkUser} from '../../service/userService';
import {userStore} from '../../store';

const LoginPage = () => {
  const navigation = useNavigation();
  const {userName, password} = userStore(state => state.user);
  const [invalidCredentials, setInvalidCredentials] = React.useState(false);

  const schema = yup.object({
    userName: yup.string().required('User Name cannot be blank'),
    password: yup.string().required('Password cannot be blank'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      userName: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      mockUserName: userName,
      mockPassword: password,
    };
    if (checkUser(payload)) {
      navigation.navigate(TRANSACTION_HISTORY_LIST);
    } else {
      setInvalidCredentials(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={LoginIllustration} style={styles.imageContainer} />
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>
        Login to see your transaction histories
      </Text>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Username"
              placeholder="Insert user name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorText={errors?.userName?.message}
            />
          )}
          name="userName"
          rules={{required: true}}
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Password"
              placeholder="Insert password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isPassword
              errorText={errors?.password?.message}
            />
          )}
          name="password"
          rules={{required: true}}
        />
        {invalidCredentials && (
          <Text style={styles.errorText}>Invalid username or password</Text>
        )}
      </View>

      <Button buttonLabel="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#395963',
  },
  subtitle: {
    fontSize: 16,
    color: '#688691',
  },
  errorText: {
    fontSize: 10,
    color: '#688691',
  },
  imageContainer: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    padding: 10,
  },
});

export default LoginPage;
