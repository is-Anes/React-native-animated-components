import {
  Blur,
  Canvas,
  Fill,
  Group,
  SweepGradient,
} from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import {
  Easing,
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

// Vibrant aurora-inspired cold color palette
const colors = {
  // Electric blues
  electricBlue: '#0080FF',
  brightBlue: '#00BFFF',
  neonBlue: '#1E90FF',
  skyBlue: '#87CEEB',

  // Vibrant cyans and teals
  electricCyan: '#00FFFF',
  brightTeal: '#00CED1',
  neonTeal: '#40E0D0',
  turquoise: '#48D1CC',

  // Luminous greens
  auroraGreen: '#00FF7F',
  electricGreen: '#00FF00',
  brightSeaGreen: '#20B2AA',
  neonMint: '#00FA9A',

  // Vivid purples and violets
  electricPurple: '#8A2BE2',
  brightViolet: '#9370DB',
  neonPurple: '#DA70D6',
  electricIndigo: '#6A5ACD',

  // Bright cool grays and silvers
  electricSilver: '#C0C0C0',
  brightGray: '#B0C4DE',
  luminousGray: '#D3D3D3',
  deepAurora: '#4169E1',
};

const colorSpace = 'LAB';

export default function AnimatedGradient() {
  const { width, height } = useWindowDimensions();

  const progress = useSharedValue(0);
  const centerProgress = useSharedValue(0);
  const randomSeed1 = useSharedValue(Math.random() * 100);
  const randomSeed2 = useSharedValue(Math.random() * 100);
  const randomSeed3 = useSharedValue(Math.random() * 100);

  // Animated center with randomness
  const c = useDerivedValue(() => {
    const time = centerProgress.value;

    // Multiple sine waves with different frequencies for organic movement
    const xOffset =
      Math.sin(time * 2 * Math.PI + randomSeed1.value) * (width * 0.2) +
      Math.sin(time * 3.7 * Math.PI + randomSeed2.value) * (width * 0.1) +
      Math.sin(time * 1.3 * Math.PI + randomSeed3.value) * (width * 0.05);

    const yOffset =
      Math.cos(time * 1.8 * Math.PI + randomSeed1.value) * (height * 0.2) +
      Math.cos(time * 2.5 * Math.PI + randomSeed2.value) * (height * 0.1) +
      Math.cos(time * 3.2 * Math.PI + randomSeed3.value) * (height * 0.05);

    return {
      x: width / 2 + xOffset,
      y: height / 2 + yOffset,
    };
  });

  const color1 = useDerivedValue(() => {
    return interpolateColor(
      progress.value,
      [0, 0.2, 0.4, 0.6, 0.8, 1],
      [
        colors.electricBlue,
        colors.brightBlue,
        colors.neonBlue,
        colors.skyBlue,
        colors.electricPurple,
        colors.electricBlue,
      ],
      colorSpace,
    );
  });

  const color2 = useDerivedValue(() => {
    return interpolateColor(
      progress.value,
      [0, 0.25, 0.5, 0.75, 1],
      [
        colors.brightTeal,
        colors.auroraGreen,
        colors.brightSeaGreen,
        colors.neonMint,
        colors.brightTeal,
      ],
      colorSpace,
    );
  });

  const color3 = useDerivedValue(() => {
    return interpolateColor(
      progress.value,
      [0, 0.33, 0.66, 1],
      [
        colors.electricIndigo,
        colors.neonTeal,
        colors.electricPurple,
        colors.electricIndigo,
      ],
      colorSpace,
    );
  });

  const color4 = useDerivedValue(() => {
    return interpolateColor(
      progress.value,
      [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
      [
        colors.electricCyan,
        colors.electricSilver,
        colors.brightGray,
        colors.neonMint,
        colors.electricSilver,
        colors.deepAurora,
        colors.electricCyan,
      ],
      colorSpace,
    );
  });

  const color5 = useDerivedValue(() => {
    return interpolateColor(
      progress.value,
      [0, 0.4, 0.8, 1],
      [
        colors.brightSeaGreen,
        colors.brightTeal,
        colors.electricBlue,
        colors.brightSeaGreen,
      ],
      colorSpace,
    );
  });

  const color6 = useDerivedValue(() => {
    return interpolateColor(
      progress.value,
      [0, 0.3, 0.7, 1],
      [
        colors.neonPurple,
        colors.turquoise,
        colors.brightViolet,
        colors.neonPurple,
      ],
      colorSpace,
    );
  });

  const gradientColors = useDerivedValue(() => {
    return [
      color1.value,
      color2.value,
      color3.value,
      color4.value,
      color5.value,
      color6.value,
      color1.value, // Complete the circle
    ];
  }, []);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
    centerProgress.value = withRepeat(
      withTiming(1, {
        duration: 15000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, [centerProgress, progress]);

  const rTransform = useDerivedValue(() => {
    return [{ rotate: centerProgress.value * 2 * Math.PI }];
  });

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <Canvas style={{ flex: 1 }}>
        <Group origin={c} transform={rTransform}>
          <Fill>
            <SweepGradient colors={gradientColors} c={c} />
          </Fill>
          <Blur blur={25} />
        </Group>
      </Canvas>
    </>
  );
}
