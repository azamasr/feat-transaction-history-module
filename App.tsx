import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';

import Routes from './src/routes/route';

export const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Routes />
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
