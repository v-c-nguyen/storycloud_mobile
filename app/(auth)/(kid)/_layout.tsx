import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
    >
      <Stack.Screen name="index"/>
      <Stack.Screen name="signin"/>
      <Stack.Screen name="signup"/>
      <Stack.Screen name="chosing"/>
      <Stack.Screen name="success"/>
    </Stack>
  );
}
