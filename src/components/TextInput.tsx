import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  Image,
} from 'react-native';

import hidePassword from '../assets/icon/closedEye.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

export interface TextInputProps extends RNTextInputProps {
  labelStyle?: StyleProp<ViewStyle>;
  onClear?: () => void;
  label?: string;
  errorText?: string;
  isPassword?: boolean;
}

const TextInput: React.FC<TextInputProps> = props => {
  const {label, labelStyle, errorText, isPassword} = props;
  const [isHiddenPassword, setIsHiddenPassword] = React.useState(true);
  return (
    <>
    <View style={styles.container}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.inputContainer}>
        <RNTextInput
          style={styles.textInput}
          placeholderTextColor={'#b0b0b0'}
          secureTextEntry={isPassword && isHiddenPassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsHiddenPassword(!isHiddenPassword)}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Image source={hidePassword} style={styles.iconContainer} />
          </TouchableOpacity>
        )}
      </View>
    </View>
    {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 55,
    borderWidth: 1,
    borderColor: '#ff735c',
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
  },
  label: {
    fontSize: 10,
    color: '#688691',
  },
  errorText: {
    fontSize: 10,
    color: '#688691',
  },
  textInput: {
    flex: 1,
  },
  inputContainer: {
    paddingTop: 5,
    flexDirection: 'row',
  },
  iconContainer: {
    width: 15,
    height: 15,
  },
});

export default TextInput;
