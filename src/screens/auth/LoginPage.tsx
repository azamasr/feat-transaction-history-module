import React, {useEffect} from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import LoginIllustration from '../../assets/image/login_illustration.jpg';
import BiometricIcon from '../../assets/icon/biometricIcon.png';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {TRANSACTION_HISTORY_LIST} from '../../routes/route';
import {checkUser} from '../../service/userService';
import {userStore} from '../../store';
import {
  initiateBiometricLogin,
  initiateBiometricSetup,
  isBiometricSensorAvailable,
} from '../../utility/biometrics';

const LoginPage = () => {
  const navigation = useNavigation();
  const {userName, password} = userStore(state => state.user);
  const [invalidCredentials, setInvalidCredentials] = React.useState(false);

  const [isBiometricAvailable, setIsBiometricAvailable] = React.useState(false);
  const [isBiometricSetup, setIsBiometricSetup] = React.useState(false);
  useEffect(() => {
    isBiometricSensorAvailable().then(response => {
      setIsBiometricAvailable(response.hasBiometric);
    });
  }, []);

  const schema = yup.object({
    userName: yup.string().required('User Name cannot be blank'),
    password: yup.string().required('Password cannot be blank'),
  });

  const {
    control,
    watch,
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

  const watchAllFields = watch();

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

  const handleBiometricLogin = async () => {
    try {
      const response = await initiateBiometricLogin();
      if (response.success) {
        navigation.navigate(TRANSACTION_HISTORY_LIST);
      }
    } catch (error) {
      throw new Error('Biometric Authentication Failed');
    }
  };

  const handleBiometricSetup = async () => {
    try {
      const response = await initiateBiometricSetup();
      if (response.success) {
        setIsBiometricSetup(true);
      }
    } catch (error) {
      throw new Error('Biometric Authentication Failed');
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

      <Button
        disabled={
          (errors && Object.keys(errors)?.length > 0) ||
          Object.values(watchAllFields).some(value => value === '')
        }
        buttonLabel="Login"
        onPress={handleSubmit(onSubmit)}
      />
      {isBiometricAvailable && isBiometricSetup ? (
        <TouchableOpacity
          onPress={handleBiometricLogin}
          style={styles.biometricContainer}>
          <Text style={styles.biometricLoginText}>Login with Biometric</Text>
          <Image source={BiometricIcon} style={styles.biometricIcon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleBiometricSetup}
          style={styles.biometricContainer}>
          <Text style={styles.biometricLoginText}>Setup Biometric</Text>
          <Text style={styles.biometricLoginText}>to login with Biometric</Text>
          <Image source={BiometricIcon} style={styles.biometricIcon} />
        </TouchableOpacity>
      )}
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
  biometricContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  biometricLoginText: {
    fontSize: 12,
    color: '#688691',
    paddingRight: 5,
  },
  biometricIcon: {
    width: 20,
    height: 20,
  },
});

export default LoginPage;
