import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => router.push('/magnets-spring')}>
          <Text>Magnets Spring</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/magnets-timing')}>
          <Text>Magnets Timing</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/robot-face')}>
          <Text>Robot Face</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
});
