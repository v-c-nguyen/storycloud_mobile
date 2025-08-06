import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
    >
      <Stack.Screen name="(parent)" options={{ headerShown: false }}/>
      <Stack.Screen name="(kid)" options={{ headerShown: false }}/>
      <Stack.Screen name="index"/>
      <Stack.Screen name="verify"/>
      <Stack.Screen name="notice"/>
      <Stack.Screen name="signin"/>
      <Stack.Screen name="signup"/>
      <Stack.Screen name="feature"/>
      <Stack.Screen name="info"/>
      <Stack.Screen name="success"/>
    </Stack>
  );
}
