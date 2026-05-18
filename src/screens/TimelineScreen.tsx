import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container as ThemedContainer, Text, ScreenHeader, Badge } from '../components/Themed';
import { MetricGrid, SectionHeader } from '../components/StudyUI';
import { theme as AppTheme } from '../theme';
import timelineData from '../data/timeline.json';

const TimelineRow = ({
  item,
  isExpanded,
  isLast,
  onToggle,
}: {
  item: any;
  isExpanded: boolean;
  isLast: boolean;
  onToggle: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
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
    <View style={styles.row}>
      <View style={styles.leftCol}>
        <View style={[styles.yearBadge, { borderColor: item.color }]}>
          <Text variant="mono" style={[styles.year, { color: item.color }]}>
            {item.year}
          </Text>
        </View>
        {!isLast && <View style={styles.line} />}
      </View>

      <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onToggle}
          style={[
            styles.card,
            isExpanded && { borderColor: item.color, ...AppTheme.shadows.md },
          ]}
        >
          <View style={styles.cardHeader}>
            <Badge label={item.tag} color={item.color as any} variant="filled" />
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <View style={[styles.expandButton, { borderColor: item.color }]}>
                <Text style={{ fontSize: 12, color: item.color }}>▼</Text>
              </View>
            </Animated.View>
          </View>

          <Text variant="heading" style={{ fontSize: 17, marginTop: 12, marginBottom: 6, letterSpacing: 0.5 }}>
            {item.title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.whoDot, { backgroundColor: item.color }]} />
            <Text variant="label" color="textMuted" style={{ fontSize: 11 }}>
              {item.who}
            </Text>
          </View>

          {isExpanded && (
            <View style={styles.expandedContent}>
              <View style={[styles.divider, { backgroundColor: item.color, opacity: 0.3 }]} />

              <View style={styles.summaryBox}>
                <Text style={styles.summary}>{item.summary}</Text>
              </View>

              <View style={[styles.impactBox, { borderLeftColor: item.color }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ fontSize: 16, marginRight: 6 }}>💡</Text>
                  <Text variant="label" style={{ color: item.color, fontSize: 11, letterSpacing: 1 }}>
                    Etkisi
                  </Text>
                </View>
                <Text style={{ lineHeight: 22, color: AppTheme.colors.text, fontSize: 14 }}>
                  {item.impact}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export const TimelineScreen = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const startYear = Number(timelineData[0].year);
  const endYear = Number(timelineData[timelineData.length - 1].year);

  return (
    <ThemedContainer style={{ paddingHorizontal: AppTheme.spacing.md }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Teknoloji Tarihi" subtitle="Nasıl başladı" />

        <MetricGrid
          style={{ marginBottom: AppTheme.spacing.xl }}
          items={[
            {
              icon: '📅',
              label: 'OLAY',
              value: timelineData.length,
              caption: 'kayıt',
              color: 'primary',
            },
            {
              icon: '⏳',
              label: 'ZAMAN ARALIĞI',
              value: endYear - startYear,
              caption: 'yıl',
              color: 'secondary',
            },
          ]}
        />

        <SectionHeader title="Zaman çizgisi" subtitle="Dönüm noktaları" />

        <View style={styles.timeline}>
          {timelineData.map((item, index) => (
            <TimelineRow
              key={item.id}
              item={item}
              isExpanded={expanded === item.id}
              isLast={index === timelineData.length - 1}
              onToggle={() => setExpanded(expanded === item.id ? null : item.id)}
            />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </ThemedContainer>
  );
};

const styles = StyleSheet.create({
  timeline: {
    paddingTop: AppTheme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.lg,
  },
  leftCol: {
    width: 60,
    alignItems: 'center',
  },
  yearBadge: {
    borderWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: AppTheme.colors.background,
    marginBottom: 12,
    ...AppTheme.shadows.sm,
  },
  year: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: AppTheme.colors.border,
    minHeight: 40,
  },
  card: {
    flex: 1,
    borderWidth: 2,
    borderColor: AppTheme.colors.border,
    backgroundColor: AppTheme.colors.surface,
    padding: AppTheme.spacing.md,
    ...AppTheme.shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandButton: {
    width: 28,
    height: 28,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppTheme.colors.background,
  },
  whoDot: {
    width: 4,
    height: 4,
    marginRight: 8,
  },
  expandedContent: {
    marginTop: AppTheme.spacing.md,
  },
  divider: {
    height: 2,
    marginBottom: AppTheme.spacing.md,
  },
  summaryBox: {
    backgroundColor: AppTheme.colors.background,
    padding: AppTheme.spacing.md,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    marginBottom: AppTheme.spacing.md,
  },
  summary: {
    lineHeight: 22,
    color: AppTheme.colors.text,
    fontSize: 14,
  },
  impactBox: {
    borderLeftWidth: 4,
    paddingLeft: AppTheme.spacing.md,
    paddingVertical: AppTheme.spacing.sm,
    backgroundColor: AppTheme.colors.background,
  },
});
