import { Stack } from 'expo-router';

export default function Layout() {

  return (
    <Stack initialRouteName='index'>
        <Stack.Screen name='[user]'/>
        <Stack.Screen name='index' options={{
            headerTitle: 'Home'
        }}/>
    </Stack>
  );
}