import React from 'react';
import {
  Animated,
  type GestureResponderEvent,
  StyleSheet,
  type StyleProp,
  TouchableOpacity,
  View,
  type ViewStyle,
  type TouchableOpacityProps,
} from 'react-native';
import { theme } from '../theme';
import { Text } from './Themed';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  accentColor?: string;
};

export const SectionHeader = ({
  title,
  subtitle,
  accentColor = theme.colors.primary,
}: SectionHeaderProps) => (
  <View style={styles.sectionHeader}>
    <View style={[styles.sectionDot, { backgroundColor: accentColor }]} />
    <View style={{ flex: 0 }}>
      {subtitle ? (
        <Text variant="label" color="textMuted" style={styles.sectionSubtitle}>
          {subtitle}
        </Text>
      ) : null}
      <Text variant="label" style={[styles.sectionTitle, { color: accentColor }]}>
        {title}
      </Text>
    </View>
    <View style={styles.sectionLine} />
  </View>
);

type MetricItem = {
  label: string;
  value: string | number;
  caption?: string;
  icon?: string;
  color?: keyof typeof theme.colors;
};

type MetricGridProps = {
  items: MetricItem[];
  style?: StyleProp<ViewStyle>;
};

export const MetricGrid = ({ items, style }: MetricGridProps) => (
  <View style={[styles.metricGrid, style]}>
    {items.map((item, index) => (
      <View
        key={`${item.label}-${index}`}
        style={[styles.metricTile, index > 0 && styles.metricTileDivider]}
      >
        {item.icon ? <Text style={styles.metricIcon}>{item.icon}</Text> : null}
        <Text variant="label" color="textMuted" style={styles.metricLabel}>
          {item.label}
        </Text>
        <Text variant="heading" color={item.color ?? 'primary'} style={styles.metricValue}>
          {item.value}
        </Text>
        {item.caption ? (
          <Text variant="mono" color="textMuted" style={styles.metricCaption}>
            {item.caption}
          </Text>
        ) : null}
      </View>
    ))}
  </View>
);

type PressableCardProps = TouchableOpacityProps & {
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
};

export const PressableCard = ({
  children,
  style,
  scaleTo = 0.98,
  onPressIn,
  onPressOut,
  ...props
}: PressableCardProps) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = (event: GestureResponderEvent) => {
    Animated.spring(scaleAnim, {
      toValue: scaleTo,
      useNativeDriver: true,
    }).start();
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    onPressOut?.(event);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      <Animated.View style={[styles.pressableCard, { transform: [{ scale: scaleAnim }] }, style]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionDot: {
    width: 6,
    height: 6,
    marginRight: 12,
  },
  sectionSubtitle: {
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 12,
    letterSpacing: 2,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    marginLeft: 12,
    backgroundColor: theme.colors.border,
  },
  metricGrid: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.md,
  },
  metricTile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.sm,
  },
  metricTileDivider: {
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border,
  },
  metricIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: 1,
  },
  metricValue: {
    fontSize: 20,
  },
  metricCaption: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  pressableCard: {
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
});
