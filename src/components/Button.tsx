import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export interface ButtonProps {
  buttonLabel: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const Button: React.FC<ButtonProps> = props => {
  const {buttonLabel, disabled, onPress} = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.buttonContainer, disabled && styles.disabled]}>
      <View>
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 300,
    height: 50,
    backgroundColor: '#ff4f5a',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#b0b0b0',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Button;
