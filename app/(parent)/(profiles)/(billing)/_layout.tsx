import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
    >
      <Stack.Screen name="index"/>
      <Stack.Screen name="PaymentMethod"/>
      <Stack.Screen name="new_method"/>
    </Stack>
  );
}
