import { Dimensions, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

// Types
interface Position {
  x: number;
  y: number;
}

interface MagnetProps {
  position: Position;
  radius: number;
  color: string;
}

interface CheeseProps {
  radius: number;
  animation: 'spring' | 'timing';
}

// Constants
const { width, height } = Dimensions.get('window');
const FIRST_MAGNET_CENTER: Position = {
  x: width / 2,
  y: height / 2 - height / 4,
};
const SECOND_MAGNET_CENTER: Position = {
  x: width / 2,
  y: height / 2 + height / 4,
};
const MAGNET_RADIUS = 10;
const MAGNET_COLOR = '#b8b8b8';
const CHEESE_RADIUS = 25;
const CHEESE_COLOR = 'red';
const SPRING_CONFIG = {
  mass: 0.4,
};

const getDistance = (position: Position, position2: Position) => {
  'worklet';
  return Math.sqrt(
    (position.x - position2.x) ** 2 + (position.y - position2.y) ** 2,
  );
};

const useMagnetDrag = (
  initialPosition: Position,
  { animation }: { animation: 'spring' | 'timing' },
) => {
  const positionX = useSharedValue(initialPosition.x);
  const positionY = useSharedValue(initialPosition.y);
  const context = useSharedValue<Position>({ x: 0, y: 0 });
  const withAnimation = animation === 'spring' ? withSpring : withTiming;
  const withConfig = animation === 'spring' ? SPRING_CONFIG : {};

  const getNearestMagnet = (position: Position): Position => {
    'worklet';
    const distanceToFirstMagnet = getDistance(position, FIRST_MAGNET_CENTER);
    const distanceToSecondMagnet = getDistance(position, SECOND_MAGNET_CENTER);

    return distanceToFirstMagnet < distanceToSecondMagnet
      ? FIRST_MAGNET_CENTER
      : SECOND_MAGNET_CENTER;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
    ],
  }));

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      context.value = {
        x: positionX.value,
        y: positionY.value,
      };
    })
    .onUpdate(event => {
      positionX.value = context.value.x + event.translationX;
      positionY.value = context.value.y + event.translationY;
    })
    .onEnd(({ velocityX, velocityY }) => {
      const nearestMagnetPosition = getNearestMagnet({
        x: positionX.value,
        y: positionY.value,
      });
      positionX.value = withAnimation(nearestMagnetPosition.x, {
        velocity: velocityX,
        ...withConfig,
      });
      positionY.value = withAnimation(nearestMagnetPosition.y, {
        velocity: velocityY,
        ...withConfig,
      });
    });

  return {
    animatedStyle,
    panGesture,
  };
};

const Magnet: React.FC<MagnetProps> = ({ position, radius, color }) => (
  <View
    style={[
      styles.magnet,
      {
        width: radius * 2,
        height: radius * 2,
        backgroundColor: color,
        borderRadius: radius,
        left: position.x - radius,
        top: position.y - radius,
      },
    ]}
  />
);

const Cheese: React.FC<CheeseProps> = ({ radius, animation }) => {
  const { animatedStyle, panGesture } = useMagnetDrag(FIRST_MAGNET_CENTER, {
    animation,
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.cheese,
          {
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            left: -radius,
            top: -radius,
          },
          animatedStyle,
        ]}
      />
    </GestureDetector>
  );
};

type MagnetsProps = {
  type: 'spring' | 'timing';
};

export const Magnets: React.FC<MagnetsProps> = ({ type }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Cheese radius={CHEESE_RADIUS} animation={type} />
      <Magnet
        position={FIRST_MAGNET_CENTER}
        radius={MAGNET_RADIUS}
        color={MAGNET_COLOR}
      />
      <Magnet
        position={SECOND_MAGNET_CENTER}
        radius={MAGNET_RADIUS}
        color={MAGNET_COLOR}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  magnet: {
    position: 'absolute',
  },
  cheese: {
    position: 'absolute',
    backgroundColor: CHEESE_COLOR,
    zIndex: 1000,
  },
});
