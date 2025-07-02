import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { PressableScale } from 'pressto';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface Demo {
  title: string;
  route: string;
  icon: IconName;
}

interface DemoCategory {
  category: string;
  icon: IconName;
  items: Demo[];
}

const demos: DemoCategory[] = [
  {
    category: 'Easing',
    icon: 'flash',
    items: [
      {
        title: 'Fluid Tab Interaction',
        route: '/fluid-tab-interaction',
        icon: 'water',
      },
      { title: 'Clerk Toast', route: '/clerk-toast', icon: 'notifications' },
    ],
  },
  {
    category: 'Layout Animations',
    icon: 'move',
    items: [
      {
        title: 'Checkbox Interactions',
        route: '/checkbox-interactions',
        icon: 'checkmark-circle',
      },
      {
        title: 'Everybody Can Cook',
        route: '/everybody-can-cook',
        icon: 'restaurant',
      },
      { title: 'Composable Text', route: '/composable-text', icon: 'text' },
    ],
  },
  {
    category: 'Gestures',
    icon: 'hand-left',
    items: [
      { title: 'Magnets Timing', route: '/magnets-timing', icon: 'magnet' },
      { title: 'Magnets Spring', route: '/magnets-spring', icon: 'magnet' },
    ],
  },
  {
    category: 'Skia',
    icon: 'brush',
    items: [
      { title: 'Sudoku', route: '/sudoku', icon: 'grid' },
      {
        title: 'Animated Gradient',
        route: '/animated-gradient',
        icon: 'color-palette',
      },
      {
        title: 'Animated Radial Gradient',
        route: '/animated-radial-gradient',
        icon: 'aperture',
      },
      { title: 'Prequel Slider', route: '/prequel-slider', icon: 'options' },
      { title: 'Atlas Button', route: '/atlas-button', icon: 'grid' },
      { title: 'Atlas', route: '/atlas', icon: 'map' },
      { title: 'Grid Visualizer', route: '/grid-visualizer', icon: 'grid' },
    ],
  },
];

interface AnimatedCardProps {
  demo: Demo;
  onPress: () => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ demo, onPress }) => {
  return (
    <View style={styles.card}>
      <PressableScale onPress={onPress} style={styles.presstoContainer}>
        <BlurView intensity={20} tint="dark" style={styles.cardBlur}>
          <View style={styles.cardContent}>
            <Ionicons
              name={demo.icon}
              size={24}
              color="#fff"
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>{demo.title}</Text>
          </View>
        </BlurView>
      </PressableScale>
    </View>
  );
};

export default function Page() {
  const insets = useSafeAreaInsets();
  const headerHeight = insets.top + 44; // Safe area + standard header height

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#0a0a0a', '#000000']}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: headerHeight + 20 },
        ]}
        showsVerticalScrollIndicator={false}>
        {demos.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <Ionicons
                name={category.icon}
                size={20}
                color="#fff"
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryTitle}>{category.category}</Text>
            </View>

            <View style={styles.grid}>
              {category.items.map((demo, demoIndex) => {
                return (
                  <AnimatedCard
                    key={demoIndex}
                    demo={demo}
                    onPress={() => router.push(demo.route)}
                  />
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  categoryContainer: {
    marginBottom: 32,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryIcon: {
    marginRight: 8,
    opacity: 0.7,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
  grid: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: '50%',
    padding: 8,
  },
  presstoContainer: {
    width: '100%',
  },
  cardBlur: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardIcon: {
    marginBottom: 12,
    opacity: 0.8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    height: 40,
  },
});
