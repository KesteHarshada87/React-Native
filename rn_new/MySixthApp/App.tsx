
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import { COLORS, SPACING } from './theme';

export default function App() {
  const [screen, setScreen] = useState('Profile');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar
          backgroundColor={COLORS.white}
          barStyle="dark-content"
        />

        <View style={styles.tabs}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setScreen('Profile')}
            activeOpacity={0.5}
          >
            <Text
              style={[
                styles.tabText,
                screen === 'Profile' && styles.activeText,
              ]}
            >
              Profile
            </Text>
            {screen === 'Profile' && <View style={styles.line} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setScreen('Settings')}
            activeOpacity={0.5}
          >
            <Text
              style={[
                styles.tabText,
                screen === 'Settings' && styles.activeText,
              ]}
            >
              Settings
            </Text>
            {screen === 'Settings' && <View style={styles.line} />}
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {screen === 'Profile' ? (
            <ProfileScreen />
          ) : (
            <SettingsScreen />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    elevation: 3,
    zIndex: 1,
  },
  tab: {
    flex: 1,
    minHeight: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
  activeText: {
    color: COLORS.primary,
  },
  line: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '55%',
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
  },
});
