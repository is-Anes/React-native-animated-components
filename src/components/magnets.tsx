import { Dimensions, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
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
  objectPosition: SharedValue<Position>;
  type: 'spring' | 'timing';
}

// Constants
const { width, height } = Dimensions.get('window');

const DEFAULT_MAGNETS: Position[] = [
  // Curved path positions with varied spacing
  {
    x: width * 0.2,
    y: height * 0.3,
  },
  {
    x: width * 0.35,
    y: height * 0.15,
  },
  {
    x: width * 0.55,
    y: height * 0.2,
  },
  {
    x: width * 0.8,
    y: height * 0.3,
  },
  {
    x: width * 0.85,
    y: height * 0.55,
  },
  {
    x: width * 0.7,
    y: height * 0.75,
  },
  {
    x: width * 0.4,
    y: height * 0.8,
  },
  {
    x: width * 0.15,
    y: height * 0.6,
  },
  // Central focus point
  {
    x: width * 0.5,
    y: height * 0.5,
  },
];

const MAGNET_RADIUS = 10;
// const MAGNET_COLOR = '#c8c8c8'; // Darker metallic gray
// const MAIN_MAGNET_COLOR = '#393939'; // Bronze metallic
const MAGNET_COLOR = '#c1c1c1'; // Aluminum
const MAGNET_ACTIVE_COLOR = {
  spring: MAGNET_COLOR,
  timing: MAGNET_COLOR,
};
const MAIN_MAGNET_COLOR = '#3b3b3b'; // Graphite steel
const CHEESE_RADIUS = 25;
const SPRING_CONFIG = {
  mass: 0.4,
  damping: 15, // Added damping for more metallic "bounce" feel
  stiffness: 120, // Added stiffness for metallic rigidity
};

const getDistance = (position: Position, position2: Position) => {
  'worklet';
  return Math.sqrt(
    (position.x - position2.x) ** 2 + (position.y - position2.y) ** 2,
  );
};

const useMagnetDrag = (
  initialPosition: Position,
  magnets: Position[],
  { animation }: { animation: 'spring' | 'timing' },
) => {
  const positionX = useSharedValue(initialPosition.x);
  const positionY = useSharedValue(initialPosition.y);
  const isActive = useSharedValue(false);
  const context = useSharedValue<Position>({ x: 0, y: 0 });
  const withAnimation = animation === 'spring' ? withSpring : withTiming;
  const withConfig = animation === 'spring' ? SPRING_CONFIG : { duration: 500 };
  const position = useDerivedValue(() => ({
    x: positionX.value,
    y: positionY.value,
  }));

  const getNearestMagnet = (currentPosition: Position): Position => {
    'worklet';

    if (magnets.length === 0) {
      return currentPosition;
    }

    const [firstMagnet] = magnets;
    let nearestMagnet = firstMagnet;
    let shortestDistance = getDistance(currentPosition, firstMagnet);

    for (let i = 1; i < magnets.length; i++) {
      const distance = getDistance(currentPosition, magnets[i]);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestMagnet = magnets[i];
      }
    }

    return nearestMagnet;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
      {
        scale: withSpring(isActive.value ? 1.2 : 1, {
          mass: 0.5,
          damping: 10,
          stiffness: 100,
        }),
      },
    ],
  }));

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isActive.value = true;
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
    })
    .onFinalize(() => {
      isActive.value = false;
    });

  return {
    animatedStyle,
    panGesture,
    position,
  };
};

const Magnet: React.FC<MagnetProps> = ({
  position,
  radius,
  color,
  objectPosition,
  type,
}) => {
  const rAnimatedStyle = useAnimatedStyle(() => {
    const distance = getDistance(objectPosition.value, position);
    const scale = interpolate(
      distance,
      [0, CHEESE_RADIUS * 2],
      [3, 1],
      Extrapolation.CLAMP,
    );
    const bgColor = interpolateColor(
      scale,
      [1, 3],
      [color, MAGNET_ACTIVE_COLOR[type]],
    );

    return {
      backgroundColor: bgColor,
      transform: [{ scale }],
    };
  }, [objectPosition, position]);

  return (
    <Animated.View
      style={[
        styles.magnet,
        {
          width: radius * 2,
          height: radius * 2,
          backgroundColor: color,
          borderRadius: radius,
          left: position.x - radius,
          top: position.y - radius,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          elevation: 5,
        },
        rAnimatedStyle,
      ]}
    />
  );
};

type MagnetsProps = {
  type: 'spring' | 'timing';
  magnets?: Position[];
  initialPosition?: Position;
  magnetRadius?: number;
  magnetColor?: string;
  objectRadius?: number;
  objectColor?: string;
};

export const Magnets: React.FC<MagnetsProps> = ({
  type,
  magnets = DEFAULT_MAGNETS,
  initialPosition = magnets[0] || { x: width / 2, y: height / 2 },
  magnetRadius = MAGNET_RADIUS,
  magnetColor = MAGNET_COLOR,
  objectRadius = CHEESE_RADIUS,
  objectColor = MAIN_MAGNET_COLOR,
}) => {
  const { animatedStyle, panGesture, position } = useMagnetDrag(
    initialPosition,
    magnets,
    {
      animation: type,
    },
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.cheese,
            {
              width: objectRadius * 2,
              height: objectRadius * 2,
              borderRadius: objectRadius,
              backgroundColor: objectColor,
              left: -objectRadius,
              top: -objectRadius,
            },
            animatedStyle,
          ]}
        />
      </GestureDetector>
      {magnets.map((magnetPosition, index) => (
        <Magnet
          key={`magnet-${index}`}
          position={magnetPosition}
          radius={magnetRadius}
          color={magnetColor}
          objectPosition={position}
          type={type}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  magnet: {
    position: 'absolute',
  },
  cheese: {
    position: 'absolute',
    zIndex: 1000,
    borderColor: '#888',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
});
