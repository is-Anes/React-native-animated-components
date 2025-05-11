import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';

export default function RobotFace() {
  // Antenna animation
  const antennaGlow = useSharedValue(1);
  const antennaRotation = useSharedValue(0);

  // Eyes animation
  const eyeScale = useSharedValue(1);
  const pupilScale = useSharedValue(1);

  // Mouth animation
  const mouthGlow = useSharedValue(0.5);

  // Indicator animation
  const indicatorOpacity = useSharedValue(0.5);

  // Arms animation
  const leftArmRotation = useSharedValue(0);
  const rightArmRotation = useSharedValue(0);
  const handRotation = useSharedValue(0);

  // New animations
  const bodyRotation = useSharedValue(0);
  const bodyScale = useSharedValue(1);
  const headRotation = useSharedValue(0);
  const earTwitch = useSharedValue(0);
  const panelGlow = useSharedValue(0.1);
  const robotHover = useSharedValue(0);
  const screwRotation = useSharedValue(0);

  // New animations
  const headShadowOpacity = useSharedValue(0.2);
  const headShadowOffset = useSharedValue(10);
  const bodyShadowOpacity = useSharedValue(0.1);
  const bodyShadowRadius = useSharedValue(10);
  const bodyColorShift = useSharedValue(0);
  const torsoColorShift = useSharedValue(0);
  const panelColorShift = useSharedValue(0);

  // Start animations
  useEffect(() => {
    // Using Linear easing for all animations
    const linearEasing = Easing.linear;

    // Antenna pulsating glow
    antennaGlow.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 1000, easing: linearEasing }),
        withTiming(1, { duration: 1000, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // Antenna slight rotation
    antennaRotation.value = withRepeat(
      withSequence(
        withTiming(-0.15, { duration: 1800, easing: linearEasing }),
        withTiming(0.08, { duration: 1800, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // Eyes blinking
    eyeScale.value = withRepeat(
      withDelay(
        3000,
        withSequence(
          withTiming(1, { duration: 100, easing: linearEasing }),
          withTiming(0.1, { duration: 100, easing: linearEasing }),
          withTiming(1, { duration: 100, easing: linearEasing }),
        ),
      ),
      -1,
      false,
    );

    // Pupil pulsating
    pupilScale.value = withRepeat(
      withSequence(
        withTiming(0.9, { duration: 1500, easing: linearEasing }),
        withTiming(1.1, { duration: 1500, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // Mouth lights pulsating
    mouthGlow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800, easing: linearEasing }),
        withTiming(0.6, { duration: 800, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // Indicator lights pulsating
    indicatorOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1200, easing: linearEasing }),
        withTiming(0.3, { duration: 1200, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // Left arm waving
    leftArmRotation.value = withRepeat(
      withSequence(
        withTiming(-0.15, { duration: 1800, easing: linearEasing }),
        withTiming(0.08, { duration: 1800, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // Right arm moving
    rightArmRotation.value = withRepeat(
      withDelay(
        500, // Offset to create asynchronous movement
        withSequence(
          withTiming(0.1, { duration: 2000, easing: linearEasing }),
          withTiming(-0.12, { duration: 2000, easing: linearEasing }),
        ),
      ),
      -1,
      true,
    );

    // Hand waving
    handRotation.value = withRepeat(
      withSequence(
        withTiming(-0.25, { duration: 800, easing: linearEasing }),
        withTiming(0.25, { duration: 800, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // Body subtle rotation
    bodyRotation.value = withRepeat(
      withSequence(
        withTiming(-0.03, { duration: 3000, easing: linearEasing }),
        withTiming(0.03, { duration: 3000, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // Body pulsating
    bodyScale.value = withRepeat(
      withSequence(
        withTiming(0.98, { duration: 2000, easing: linearEasing }),
        withTiming(1.02, { duration: 2000, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // Head subtle rotation
    headRotation.value = withRepeat(
      withSequence(
        withTiming(-0.02, { duration: 2500, easing: linearEasing }),
        withTiming(0.02, { duration: 2500, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // Ear occasional twitching
    earTwitch.value = withRepeat(
      withDelay(
        4000, // Random delay to make it look occasional
        withSequence(
          withTiming(1, { duration: 100, easing: linearEasing }),
          withTiming(0, { duration: 100, easing: linearEasing }),
          withTiming(1, { duration: 100, easing: linearEasing }),
          withTiming(0, { duration: 100, easing: linearEasing }),
          withTiming(1, { duration: 500, easing: linearEasing }), // Hold normal position longer
        ),
      ),
      -1,
      false,
    );

    // Panel lines glowing
    panelGlow.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 1500, easing: linearEasing }),
        withTiming(0.1, { duration: 1500, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // Robot hovering effect
    robotHover.value = withRepeat(
      withSequence(
        withTiming(2, { duration: 1500, easing: linearEasing }),
        withTiming(-2, { duration: 1500, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // Screws rotating
    screwRotation.value = withRepeat(
      withTiming(6.28, { duration: 10000, easing: linearEasing }),
      -1,
      false,
    );

    // New animations for shadows
    headShadowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 2000, easing: linearEasing }),
        withTiming(0.1, { duration: 2000, easing: linearEasing }),
      ),
      -1,
      true,
    );

    headShadowOffset.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 2500, easing: linearEasing }),
        withTiming(5, { duration: 2500, easing: linearEasing }),
      ),
      -1,
      true,
    );

    bodyShadowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 1800, easing: linearEasing }),
        withTiming(0.05, { duration: 1800, easing: linearEasing }),
      ),
      -1,
      true,
    );

    bodyShadowRadius.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 1500, easing: linearEasing }),
        withTiming(5, { duration: 1500, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // Color shift animations
    bodyColorShift.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 3000, easing: linearEasing }),
        withTiming(0, { duration: 3000, easing: linearEasing }),
      ),
      -1,
      true,
    );

    torsoColorShift.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 4000, easing: linearEasing }),
        withTiming(0, { duration: 4000, easing: linearEasing }),
      ),
      -1,
      true,
    );

    panelColorShift.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 5000, easing: linearEasing }),
        withTiming(0, { duration: 5000, easing: linearEasing }),
      ),
      -1,
      true,
    );

    // We want these animations to run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animated styles
  const antennaBallStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: antennaGlow.value }],
      opacity: 0.8 + antennaGlow.value * 0.2,
    };
  });

  const antennaStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${antennaRotation.value}rad` },
        { translateX: antennaRotation.value * 20 },
      ],
    };
  });

  const eyeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: eyeScale.value }],
    };
  });

  const pupilStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pupilScale.value }],
    };
  });

  const mouthSegmentStyle = useAnimatedStyle(() => {
    return {
      opacity: mouthGlow.value,
    };
  });

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      opacity: indicatorOpacity.value,
    };
  });

  const leftArmStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: 0 },
        { translateX: 0 },
        { rotateZ: '0deg' },
        { translateY: -30 * scale },
        { rotateZ: `${leftArmRotation.value}rad` },
        { translateY: 30 * scale },
      ],
    };
  });

  const rightArmStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: 0 },
        { translateX: 0 },
        { rotateZ: '0deg' },
        { translateY: -30 * scale },
        { rotateZ: `${rightArmRotation.value}rad` },
        { translateY: 30 * scale },
      ],
    };
  });

  const leftHandStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: 0 },
        { rotateZ: '0deg' },
        { translateY: -3 * scale },
        { rotateZ: `${handRotation.value}rad` },
        { translateY: 3 * scale },
      ],
    };
  });

  const rightHandStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: 0 },
        { rotateZ: '0deg' },
        { translateY: -3 * scale },
        { rotateZ: `${-handRotation.value}rad` },
        { translateY: 3 * scale },
      ],
    };
  });

  // New animation styles
  const bodyContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: robotHover.value },
        { rotateZ: `${bodyRotation.value}rad` },
        { scale: bodyScale.value },
      ],
    };
  });

  const headContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${headRotation.value}rad` }],
    };
  });

  const panelLineStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.2 + panelGlow.value,
      backgroundColor: `rgba(199, 199, 204, ${0.5 + panelGlow.value})`,
    };
  });

  const leftEarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${earTwitch.value * -0.1}rad` }],
    };
  });

  const rightEarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${earTwitch.value * 0.1}rad` }],
    };
  });

  const screwStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${screwRotation.value}rad` }],
    };
  });

  // New animation styles for shadows
  const headContainerShadowStyle = useAnimatedStyle(() => {
    return {
      shadowOpacity: headShadowOpacity.value,
      shadowOffset: { width: 0, height: headShadowOffset.value },
    };
  });

  const bodyContainerShadowStyle = useAnimatedStyle(() => {
    return {
      shadowOpacity: bodyShadowOpacity.value,
      shadowRadius: bodyShadowRadius.value,
    };
  });

  // Color animation styles
  const bodyColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgb(229, ${229 + bodyColorShift.value}, 234)`,
    };
  });

  const torsoColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgb(229, ${229 + torsoColorShift.value}, 234)`,
    };
  });

  const panelColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgb(209, ${213 + panelColorShift.value}, 214)`,
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        activeOpacity={0.7}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Robot Container */}
      <Animated.View style={[styles.robotContainer, bodyContainerStyle]}>
        {/* Robot Head Container with Shadow */}
        <Animated.View
          style={[
            styles.headContainer,
            headContainerStyle,
            headContainerShadowStyle,
          ]}>
          {/* Robot Head */}
          <View style={styles.head}>
            {/* Panel lines */}
            <Animated.View style={[styles.panelLine, panelLineStyle]} />
            <Animated.View
              style={[
                styles.panelLine,
                styles.panelLineHorizontal,
                panelLineStyle,
              ]}
            />

            {/* Eyes */}
            <View style={styles.eyesContainer}>
              <View style={styles.eyeOuterFrame}>
                <Animated.View style={[styles.eye, eyeStyle]}>
                  <Animated.View style={[styles.pupil, pupilStyle]}>
                    <View style={styles.highlight} />
                  </Animated.View>
                  <View style={styles.eyebrow} />
                </Animated.View>
              </View>
              <View style={styles.eyeOuterFrame}>
                <Animated.View style={[styles.eye, eyeStyle]}>
                  <Animated.View style={[styles.pupil, pupilStyle]}>
                    <View style={styles.highlight} />
                  </Animated.View>
                  <View style={styles.eyebrow} />
                </Animated.View>
              </View>
            </View>

            {/* Nose */}
            <View style={styles.nose} />

            {/* Mouth */}
            <View style={styles.mouthOuter}>
              <View style={styles.mouthInner}>
                {[...Array(6)].map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.mouthSegment,
                      index === 0 || index === 5
                        ? styles.mouthSegmentCorner
                        : null,
                      index === 2 || index === 3
                        ? styles.mouthSegmentMiddle
                        : null,
                    ]}>
                    <Animated.View
                      style={[
                        styles.mouthSegmentGlow,
                        mouthSegmentStyle,
                        index === 0 || index === 5
                          ? { backgroundColor: '#FF3B30' }
                          : null,
                        index === 2 || index === 3
                          ? { backgroundColor: '#34C759' }
                          : null,
                      ]}
                    />
                  </View>
                ))}
              </View>
            </View>

            {/* Antenna */}
            <Animated.View style={[styles.antenna, antennaStyle]}>
              <Animated.View style={[styles.antennaBall, antennaBallStyle]} />
              <View style={styles.antennaStick} />
            </Animated.View>

            {/* Ears */}
            <Animated.View style={[styles.ear, styles.leftEar, leftEarStyle]}>
              <View style={styles.earInner} />
              <View style={styles.earHole} />
            </Animated.View>
            <Animated.View style={[styles.ear, styles.rightEar, rightEarStyle]}>
              <View style={styles.earInner} />
              <View style={styles.earHole} />
            </Animated.View>

            {/* Neck */}
            <View style={styles.neck} />

            {/* Indicator lights with glowing effect */}
            <View style={styles.indicatorContainer}>
              {['#FF3B30', '#34C759', '#007AFF'].map((color, index) => (
                <View key={index} style={styles.indicatorOuter}>
                  <View
                    style={[styles.indicator, { backgroundColor: color }]}
                  />
                  <Animated.View
                    style={[
                      styles.indicatorGlow,
                      indicatorStyle,
                      { backgroundColor: color },
                    ]}
                  />
                </View>
              ))}
            </View>

            {/* Brand Logo */}
            <View style={styles.brandLogoContainer}>
              <Text style={styles.brandLogo}>R2</Text>
            </View>

            {/* Screws */}
            {[
              styles.screwTopLeft,
              styles.screwTopRight,
              styles.screwBottomLeft,
              styles.screwBottomRight,
            ].map((position, index) => (
              <View key={index} style={[styles.screw, position]}>
                <Animated.View style={[styles.screwInner, screwStyle]} />
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Robot Body */}
        <Animated.View style={[styles.bodyContainer, bodyContainerShadowStyle]}>
          {/* Torso */}
          <View style={styles.torso}>
            {/* Chest Panel */}
            <View style={styles.chestPanel}>
              {/* Control Buttons */}
              <View style={styles.controlButtonsRow}>
                {['#FF9500', '#5856D6', '#007AFF'].map((color, index) => (
                  <View
                    key={index}
                    style={[styles.controlButton, { backgroundColor: color }]}
                  />
                ))}
              </View>

              {/* Center Display */}
              <View style={styles.centerDisplay}>
                <Animated.View style={[styles.displayBar, mouthSegmentStyle]} />
                <Animated.View style={[styles.displayBar, mouthSegmentStyle]} />
                <Animated.View style={[styles.displayBar, mouthSegmentStyle]} />
              </View>
            </View>

            {/* Arms */}
            <Animated.View style={[styles.arm, styles.leftArm, leftArmStyle]}>
              <View style={styles.shoulder} />
              <View style={styles.upperArm} />
              <View style={styles.forearm} />
              <Animated.View style={[styles.hand, leftHandStyle]}>
                {[...Array(3)].map((_, index) => (
                  <View key={index} style={styles.finger} />
                ))}
              </Animated.View>
            </Animated.View>
            <Animated.View style={[styles.arm, styles.rightArm, rightArmStyle]}>
              <View style={styles.shoulder} />
              <View style={styles.upperArm} />
              <View style={styles.forearm} />
              <Animated.View style={[styles.hand, rightHandStyle]}>
                {[...Array(3)].map((_, index) => (
                  <View key={index} style={styles.finger} />
                ))}
              </Animated.View>
            </Animated.View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const isSmallDevice = width < 380;
const scale = isSmallDevice ? 0.9 : 1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  robotContainer: {
    alignItems: 'center',
  },
  headContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 15,
    marginBottom: 5 * scale,
  },
  head: {
    width: 180 * scale,
    height: 220 * scale,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#C1C1C6',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#E5E5EA',
  },
  panelLine: {
    position: 'absolute',
    width: 1,
    height: '70%',
    backgroundColor: '#C7C7CC',
    left: '50%',
    top: '15%',
  },
  panelLineHorizontal: {
    width: '70%',
    height: 1,
    left: '15%',
    top: '50%',
  },
  eyesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120 * scale,
    marginBottom: 20 * scale,
    marginTop: -25 * scale,
  },
  eyeOuterFrame: {
    width: 45 * scale,
    height: 45 * scale,
    borderRadius: 22.5 * scale,
    backgroundColor: '#C7C7CC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  eyebrow: {
    position: 'absolute',
    top: -12 * scale,
    width: 35 * scale,
    height: 5 * scale,
    backgroundColor: '#8E8E93',
    borderRadius: 2.5 * scale,
  },
  eye: {
    width: 40 * scale,
    height: 40 * scale,
    borderRadius: 20 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C7C7CC',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  pupil: {
    width: 20 * scale,
    height: 20 * scale,
    borderRadius: 10 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  highlight: {
    width: 7 * scale,
    height: 7 * scale,
    borderRadius: 3.5 * scale,
    backgroundColor: 'rgba(255,255,255,0.8)',
    position: 'absolute',
    top: 3 * scale,
    left: 3 * scale,
  },
  nose: {
    width: 16 * scale,
    height: 8 * scale,
    borderRadius: 4 * scale,
    marginBottom: 12 * scale,
    backgroundColor: '#8E8E93',
  },
  mouthOuter: {
    width: 110 * scale,
    height: 26 * scale,
    borderRadius: 13 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3 * scale,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    backgroundColor: '#AEAEB2',
  },
  mouthInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    borderRadius: 9 * scale,
    paddingHorizontal: 7 * scale,
    alignItems: 'center',
    backgroundColor: '#8E8E93',
  },
  mouthSegment: {
    width: 9 * scale,
    height: 7 * scale,
    backgroundColor: 'transparent',
    borderRadius: 1 * scale,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mouthSegmentGlow: {
    width: 7 * scale,
    height: 5 * scale,
    borderRadius: 1 * scale,
    backgroundColor: '#60A5FA',
  },
  mouthSegmentCorner: {
    height: 3 * scale,
  },
  mouthSegmentMiddle: {
    height: 10 * scale,
  },
  antenna: {
    position: 'absolute',
    top: -25 * scale,
    alignItems: 'center',
  },
  antennaBall: {
    width: 14 * scale,
    height: 14 * scale,
    borderRadius: 7 * scale,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    backgroundColor: '#FF3B30',
  },
  antennaStick: {
    width: 3 * scale,
    height: 18 * scale,
    marginTop: -5 * scale,
    backgroundColor: '#8E8E93',
  },
  ear: {
    width: 14 * scale,
    height: 45 * scale,
    position: 'absolute',
    borderRadius: 7 * scale,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4 * scale,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    backgroundColor: '#C7C7CC',
  },
  earInner: {
    width: 5 * scale,
    height: 22 * scale,
    backgroundColor: '#8E8E93',
    borderRadius: 2.5 * scale,
  },
  earHole: {
    width: 5 * scale,
    height: 5 * scale,
    borderRadius: 2.5 * scale,
    backgroundColor: '#8E8E93',
  },
  leftEar: {
    left: -12 * scale,
    top: 70 * scale,
  },
  rightEar: {
    right: -12 * scale,
    top: 70 * scale,
  },
  neck: {
    position: 'absolute',
    width: 38 * scale,
    height: 20 * scale,
    bottom: -20 * scale,
    borderBottomLeftRadius: 9 * scale,
    borderBottomRightRadius: 9 * scale,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderTopWidth: 0,
    backgroundColor: '#C7C7CC',
  },
  indicatorContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 30 * scale,
    right: 16 * scale,
  },
  indicatorOuter: {
    width: 12 * scale,
    height: 12 * scale,
    borderRadius: 6 * scale,
    backgroundColor: '#8E8E93',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6 * scale,
  },
  indicator: {
    width: 8 * scale,
    height: 8 * scale,
    borderRadius: 4 * scale,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  indicatorGlow: {
    position: 'absolute',
    width: 15 * scale,
    height: 15 * scale,
    borderRadius: 7.5 * scale,
  },
  brandLogoContainer: {
    position: 'absolute',
    bottom: 30 * scale,
    left: 16 * scale,
    width: 26 * scale,
    height: 18 * scale,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3 * scale,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandLogo: {
    color: '#4A4A4F',
    fontSize: 10 * scale,
    fontWeight: 'bold',
  },
  screw: {
    position: 'absolute',
    width: 10 * scale,
    height: 10 * scale,
    borderRadius: 5 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1D1D6',
  },
  screwInner: {
    width: 5 * scale,
    height: 1.5 * scale,
    backgroundColor: '#8E8E93',
  },
  screwTopLeft: {
    top: 12 * scale,
    left: 12 * scale,
  },
  screwTopRight: {
    top: 12 * scale,
    right: 12 * scale,
  },
  screwBottomLeft: {
    bottom: 12 * scale,
    left: 12 * scale,
  },
  screwBottomRight: {
    bottom: 12 * scale,
    right: 12 * scale,
  },

  // Body Styles
  bodyContainer: {
    marginTop: -12 * scale,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  torso: {
    width: 200 * scale,
    height: 160 * scale,
    backgroundColor: '#E5E5EA',
    borderRadius: 20 * scale,
    borderWidth: 2,
    borderColor: '#C1C1C6',
    paddingTop: 20 * scale,
    alignItems: 'center',
    position: 'relative',
  },
  chestPanel: {
    width: 160 * scale,
    height: 100 * scale,
    backgroundColor: '#D1D1D6',
    borderRadius: 10 * scale,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    padding: 10 * scale,
    justifyContent: 'space-between',
  },
  controlButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10 * scale,
  },
  controlButton: {
    width: 22 * scale,
    height: 22 * scale,
    borderRadius: 11 * scale,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  centerDisplay: {
    backgroundColor: '#8E8E93',
    borderRadius: 6 * scale,
    height: 40 * scale,
    padding: 8 * scale,
    justifyContent: 'space-between',
  },
  displayBar: {
    height: 6 * scale,
    backgroundColor: '#60A5FA',
    borderRadius: 3 * scale,
  },
  arm: {
    position: 'absolute',
    width: 24 * scale,
    top: 30 * scale,
    alignItems: 'center',
    transformOrigin: 'top center',
  },
  leftArm: {
    left: -18 * scale,
    transform: [{ rotateZ: '-10deg' }],
  },
  rightArm: {
    right: -18 * scale,
    transform: [{ rotateZ: '10deg' }],
  },
  shoulder: {
    width: 28 * scale,
    height: 28 * scale,
    borderRadius: 14 * scale,
    backgroundColor: '#C7C7CC',
    borderWidth: 1,
    borderColor: '#AEAEB2',
  },
  upperArm: {
    width: 20 * scale,
    height: 45 * scale,
    backgroundColor: '#D1D1D6',
    marginTop: -4 * scale,
    borderWidth: 1,
    borderColor: '#C7C7CC',
  },
  forearm: {
    width: 18 * scale,
    height: 40 * scale,
    backgroundColor: '#C7C7CC',
    borderWidth: 1,
    borderColor: '#AEAEB2',
  },
  hand: {
    width: 24 * scale,
    height: 24 * scale,
    backgroundColor: '#D1D1D6',
    borderRadius: 7 * scale,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    paddingBottom: 3 * scale,
    transformOrigin: 'center top',
  },
  finger: {
    width: 4 * scale,
    height: 8 * scale,
    backgroundColor: '#C7C7CC',
    borderRadius: 2 * scale,
  },
});
