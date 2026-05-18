import React, { useEffect } from 'react';
import {
  Text as RNText,
  View as RNView,
  TouchableOpacity,
  ViewProps,
  TextProps,
  TouchableOpacityProps,
  Animated,
  type DimensionValue,
  Easing,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { theme } from '../theme';

type ThemeColor = keyof typeof theme.colors;
type BadgeColor = ThemeColor | string;

const resolveColor = (color: BadgeColor) =>
  color in theme.colors ? theme.colors[color as ThemeColor] : color;

export const Container = ({ style, ...props }: ViewProps) => (
  <RNView
    style={[
      { flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: theme.spacing.md },
      style,
    ]}
    {...props}
  />
);

export const Card = ({ style, animated = false, ...props }: ViewProps & { animated?: boolean }) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }
  }, [animated, scaleAnim]);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.md,
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.none,
          ...theme.shadows.sm,
        },
        animated && {
          transform: [{ scale: scaleAnim }],
          opacity: scaleAnim,
        },
        style,
      ]}
      {...props}
    />
  );
};

export const Text = ({
  style,
  variant = 'body',
  color = 'text',
  ...props
}: TextProps & {
  variant?: 'heading' | 'body' | 'mono' | 'label';
  color?: keyof typeof theme.colors;
}) => {
  const textStyle = {
    color: theme.colors[color],
    fontFamily:
      variant === 'mono'
        ? theme.typography.fonts.mono
        : variant === 'heading'
          ? theme.typography.fonts.heading
          : theme.typography.fonts.body,
    fontSize:
      variant === 'heading'
        ? theme.typography.sizes.lg
        : variant === 'label'
          ? theme.typography.sizes.sm
          : theme.typography.sizes.md,
  };
  return <RNText style={[textStyle, style]} {...props} />;
};

export const Button = ({
  title,
  style,
  textStyle,
  ...props
}: TouchableOpacityProps & { title: string; textStyle?: StyleProp<TextStyle> }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      {...props}
    >
      <Animated.View
        style={[
          {
            backgroundColor: theme.colors.primary,
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
            borderWidth: 2,
            borderColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            ...theme.shadows.md,
            transform: [{ scale: scaleAnim }],
          },
          style,
        ]}
      >
        <Text
          variant="label"
          style={[
            { color: theme.colors.background, fontWeight: '700', letterSpacing: 1 },
            textStyle,
          ]}
        >
          {title.toUpperCase()}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const OutlineButton = ({
  title,
  style,
  textStyle,
  ...props
}: TouchableOpacityProps & { title: string; textStyle?: StyleProp<TextStyle> }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      {...props}
    >
      <Animated.View
        style={[
          {
            backgroundColor: 'transparent',
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
            borderWidth: 2,
            borderColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ scale: scaleAnim }],
          },
          style,
        ]}
      >
        <Text
          variant="label"
          style={[{ color: theme.colors.primary, fontWeight: '700', letterSpacing: 1 }, textStyle]}
        >
          {title.toUpperCase()}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const CodeBlock = ({ code, language }: { code: string; language?: string }) => (
  <RNView
    style={{
      backgroundColor: '#08100e',
      padding: theme.spacing.md,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
      marginVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.sm,
      ...theme.shadows.sm,
    }}
  >
    {language && (
      <RNView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.borderLight,
        }}
      >
        <RNView
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: theme.colors.primary,
            marginRight: 8,
          }}
        />
        <Text
          variant="label"
          color="primary"
          style={{ opacity: 0.8, fontSize: 11, letterSpacing: 1 }}
        >
          {language.toUpperCase()}
        </Text>
      </RNView>
    )}
    <Text variant="mono" style={{ fontSize: 13, lineHeight: 20, color: theme.colors.text }}>
      {code}
    </Text>
  </RNView>
);

export const ScreenHeader = ({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}) => (
  <RNView
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 56,
      paddingBottom: 16,
      paddingHorizontal: 0,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.border,
      marginBottom: 24,
    }}
  >
    {onBack && (
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        style={{
          width: 52,
          height: 52,
          borderWidth: 2,
          borderColor: theme.colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 14,
          backgroundColor: theme.colors.surface,
          ...theme.shadows.md,
        }}
      >
        <Text style={{ fontSize: 22, color: theme.colors.primary, fontWeight: '700' }}>←</Text>
      </TouchableOpacity>
    )}
    <RNView style={{ flex: 1 }}>
      {subtitle && (
        <RNView style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <RNView
            style={{
              width: 4,
              height: 4,
              backgroundColor: theme.colors.primary,
              marginRight: 8,
            }}
          />
          <Text variant="label" color="primary" style={{ letterSpacing: 1.5, fontSize: 11 }}>
            {subtitle}
          </Text>
        </RNView>
      )}
      <Text variant="heading" style={{ fontSize: 22, letterSpacing: 0.2, lineHeight: 28 }}>
        {title}
      </Text>
    </RNView>
  </RNView>
);

// Yeni Progress Bar komponenti
export const ProgressBar = ({
  progress,
  height = 4,
  color = 'primary',
  showLabel = false,
  animated = true,
}: {
  progress: number;
  height?: number;
  color?: keyof typeof theme.colors;
  showLabel?: boolean;
  animated?: boolean;
}) => {
  const widthAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(widthAnim, {
        toValue: progress,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
  }, [progress, animated, widthAnim]);

  const animatedWidth = animated
    ? widthAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      })
    : (`${progress}%` as const);

  return (
    <RNView>
      <RNView
        style={{
          height,
          backgroundColor: theme.colors.borderLight,
          borderRadius: height / 2,
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            height: '100%',
            width: animatedWidth,
            backgroundColor: theme.colors[color],
            borderRadius: height / 2,
          }}
        />
      </RNView>
      {showLabel && (
        <Text
          variant="mono"
          color={color}
          style={{ fontSize: 10, marginTop: 4, textAlign: 'right' }}
        >
          {progress}%
        </Text>
      )}
    </RNView>
  );
};

// Yeni Badge komponenti
export const Badge = ({
  label,
  color = 'primary',
  variant = 'outline',
}: {
  label: string;
  color?: BadgeColor;
  variant?: 'outline' | 'filled';
}) => (
  <RNView
    style={{
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: resolveColor(color),
      backgroundColor: variant === 'filled' ? resolveColor(color) : 'transparent',
      paddingHorizontal: 8,
      paddingVertical: 3,
      alignSelf: 'flex-start',
    }}
  >
    <Text
      variant="mono"
      style={{
        fontSize: 10,
        color: variant === 'filled' ? theme.colors.background : resolveColor(color),
        letterSpacing: 0.5,
      }}
    >
      {label.toUpperCase()}
    </Text>
  </RNView>
);

// Skeleton Loader komponenti
export const SkeletonLoader = ({
  width = '100%',
  height = 20,
  style,
}: {
  width?: DimensionValue;
  height?: number;
  style?: StyleProp<ViewStyle>;
}) => {
  const opacity = React.useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: theme.colors.border,
          opacity,
        },
        style,
      ]}
    />
  );
};
