import { Canvas, Fill, LinearGradient } from '@shopify/react-native-skia';
import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  Easing,
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

// Vibrant color palette with complementary colors
const colors = {
  teal: '#06D6A0',
  purple: '#7209B7',
  pink: '#F72585',
  blue: '#4361EE',
  orange: '#FB8500',
  lime: '#32D74B',
  coral: '#FF6B6B',
  yellow: '#FFD60A',
  violet: '#BF5AF2',
  cyan: '#5AC8FA',
  mint: '#00F5FF',
  magenta: '#FF2D92',
};

const colorSpace = 'LAB';

export default function AnimatedGradient() {
  const { width, height } = useWindowDimensions();

  const progress = useSharedValue(0);

  const leftColor = useDerivedValue(() => {
    return interpolateColor(
      progress.value,
      [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
      [
        colors.teal,
        colors.purple,
        colors.pink,
        colors.blue,
        colors.orange,
        colors.lime,
        colors.teal,
      ],
      colorSpace,
    );
  });

  const rightColor = useDerivedValue(() => {
    return interpolateColor(
      progress.value,
      [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
      [
        colors.coral,
        colors.yellow,
        colors.violet,
        colors.cyan,
        colors.mint,
        colors.magenta,
        colors.coral,
      ],
      colorSpace,
    );
  });

  const centerColor = useDerivedValue(() => {
    return interpolateColor(
      progress.value,
      [0, 0.25, 0.5, 0.75, 1],
      [colors.blue, colors.lime, colors.pink, colors.orange, colors.blue],
      colorSpace,
    );
  });

  const gradientColors = useDerivedValue(() => {
    return [leftColor.value, centerColor.value, rightColor.value];
  }, []);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 7000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );

    // progress.value = withRepeat(
    //   withSpring(1, {
    //     mass: 20,
    //     damping: 1000,
    //   }),
    //   -1,
    //   true,
    // );
  }, [progress]);

  return (
    <Canvas style={{ flex: 1 }}>
      <Fill>
        <LinearGradient
          colors={gradientColors}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: width,
            y: height,
          }}
        />
      </Fill>
    </Canvas>
  );
}
