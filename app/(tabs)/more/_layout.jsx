import { Stack, useLocalSearchParams } from 'expo-router';

export default function Layout() {

  return (
    <Stack initialRouteName='index'>
        <Stack.Screen name='Add' options={{
            headerTitle: 'Add Member'
        }}/>
        <Stack.Screen name='index' options={{
            headerTitle: 'More'
        }}/>
    </Stack>
  );
}