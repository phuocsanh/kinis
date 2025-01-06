/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useReactQueryDevTools} from '@dev-plugins/react-query';
import {StatusBar} from 'expo-status-bar';
import {queryClient} from 'queries';
import {QueryClientProvider} from '@tanstack/react-query';
import useNotificationListener from 'hooks/useNotificationListener';
import {useFCMToken} from 'hooks/useFCMToken';
import {RootNavigation} from 'navigation';
import {PortalHost, PortalProvider} from '@gorhom/portal';
import {CustomToast} from 'components/common/CustomToast';
function App(): React.JSX.Element {
  useReactQueryDevTools(queryClient);
  useNotificationListener();
  useFCMToken();
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{flex: 1}}>
          <PortalProvider>
            <StatusBar />
            <RootNavigation />
            <PortalHost name="root" />
          </PortalProvider>
          <CustomToast />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
