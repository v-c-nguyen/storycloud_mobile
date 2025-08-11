import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function KidLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
    >
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }}/>
      <Stack.Screen name="(explore)" options={{ headerShown: false }}/>
      <Stack.Screen name="(listen)" options={{ headerShown: false }}/>
      <Stack.Screen name="(favourites)" options={{ headerShown: false }}/>
    </Stack>
  );
}
