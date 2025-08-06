import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function DashboardLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
    >
      <Stack.Screen name="index"/>
      <Stack.Screen name="continue"/>
      <Stack.Screen name="featured"/>
      <Stack.Screen name="next"/>
      <Stack.Screen name="watched"/>
      <Stack.Screen name="pathway"/>
      <Stack.Screen name="free"/>
      <Stack.Screen name="focus"/>
    </Stack>
  );
}
