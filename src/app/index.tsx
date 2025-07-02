import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => router.push('/fluid-tab-interaction')}>
          <Text>Fluid Tab Interaction</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/clerk-toast')}>
          <Text>Clerk Toast</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/checkbox-interactions')}>
          <Text>Checkbox Interactions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/everybody-can-cook')}>
          <Text>Everybody Can Cook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/magnets-spring')}>
          <Text>Magnets Spring</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/magnets-timing')}>
          <Text>Magnets Timing</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/composable-text')}>
          <Text>Composable Text</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/animated-radial-gradient')}>
          <Text>Animated Radial Gradient</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/prequel-slider')}>
          <Text>Prequel Slider</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/sudoku')}>
          <Text>Sudoku</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/robot-face')}>
          <Text>Robot Face</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/animated-gradient')}>
          <Text>Animated Gradient</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/atlas-button')}>
          <Text>Atlas Button</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/atlas')}>
          <Text>Atlas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/grid-visualizer')}>
          <Text>Grid Visualizer</Text>
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
