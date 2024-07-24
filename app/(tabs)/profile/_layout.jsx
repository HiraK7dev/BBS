import { Stack, useLocalSearchParams } from 'expo-router';

export default function Layout() {

  return (
    <Stack initialRouteName='index'>
      <Stack.Screen name='About' options={{
            headerTitle: 'About'
        }}/>
        <Stack.Screen name='Update' options={{
            headerTitle: 'Update'
        }}/>
        <Stack.Screen name='index' options={{
            headerTitle: 'Profile'
        }}/>
    </Stack>
  );
}