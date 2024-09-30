import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

interface BiometricResponse {
  success: boolean;
  publicKey?: string;
  errorMessage?: string;
}

interface CheckBiometricResponse {
  hasBiometric: boolean;
  isFaceId: boolean;
}

interface CreateSignatureResult {
  success: boolean;
  signature?: string;
  error?: string;
}

const rnBiometrics = new ReactNativeBiometrics();

export const isBiometricSensorAvailable =
  async (): Promise<CheckBiometricResponse> => {
    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();
      return {
        hasBiometric: available,
        isFaceId: biometryType === BiometryTypes.FaceID,
      };
    } catch (error) {
      return {
        hasBiometric: false,
        isFaceId: false,
      };
    }
  };

export const initiateBiometricSetup = async (): Promise<BiometricResponse> => {
  try {
    const {success, error} = await rnBiometrics.simplePrompt({
      promptMessage: 'Face ID authentication',
    });

    if (success) {
      const {publicKey} = await rnBiometrics.createKeys();
      return {
        success: true,
        errorMessage: undefined,
        publicKey,
      };
    }

    if (error) {
      return {
        success: false,
        errorMessage: error,
        publicKey: undefined,
      };
    }

    throw new Error();
  } catch (error) {
    return {
      success: false,
      errorMessage: 'Biometric Authentication Failed',
      publicKey: undefined,
    };
  }
};

export const initiateBiometricLogin =
  async (): Promise<CreateSignatureResult> => {
    try {
      const promptMessage = 'Face ID authentication';
      const payload = JSON.stringify({key: 'testkeymock'});
      const {success, signature, error} = await rnBiometrics.createSignature({
        promptMessage,
        payload,
      });
      return {success, signature, error};
    } catch (error) {
      console.error('Biometric Authentication Failed:', error);
      return {success: false, error: 'Biometric Authentication Failed'};
    }
  };
