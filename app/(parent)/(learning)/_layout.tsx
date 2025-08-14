import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="(library)" />
      <Stack.Screen name="(focus)"  />
      <Stack.Screen name="(pathway)"  />
      <Stack.Screen name="index"  />
    </Stack>
  );
}
