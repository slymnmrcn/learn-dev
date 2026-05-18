import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import {
  Container as ThemedContainer,
  Text,
  CodeBlock,
  ScreenHeader,
  Badge,
} from '../components/Themed';
import { MetricGrid, PressableCard, SectionHeader } from '../components/StudyUI';
import { theme as AppTheme } from '../theme';
import algorithmsData from '../data/algorithms.json';
import type { AlgorithmItem, AlgorithmsData } from '../types';

const typedAlgorithmsData = algorithmsData as AlgorithmsData;

const AlgorithmItemCard = ({
  item,
  isExpanded,
  onToggle,
}: {
  item: AlgorithmItem;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
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

  return (
    <PressableCard onPress={onToggle} style={[styles.card, isExpanded && styles.cardExpanded]}>
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text variant="heading" style={{ fontSize: 15, marginBottom: 8, letterSpacing: 0.5 }}>
            {item.name}
          </Text>
          <View style={styles.badges}>
            <Badge label={item.complexity} color="primary" variant="filled" />
            <View style={{ width: 8 }} />
            <Badge label={`space ${item.space}`} color="textMuted" />
          </View>
        </View>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <View style={styles.expandButton}>
            <Text color="primary" style={{ fontSize: 14 }}>
              ▼
            </Text>
          </View>
        </Animated.View>
      </View>

      {isExpanded && (
        <View style={styles.expanded}>
          <View style={styles.divider} />
          <View style={styles.descriptionBox}>
            <View style={styles.descriptionHeader}>
              <View style={styles.descriptionDot} />
              <Text variant="label" color="secondary" style={{ fontSize: 10, letterSpacing: 1 }}>
                Açıklama
              </Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <CodeBlock code={item.code} language={item.language} />
        </View>
      )}
    </PressableCard>
  );
};

export const AlgorithmsScreen = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <ThemedContainer style={{ paddingHorizontal: AppTheme.spacing.md }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Algoritmalar" subtitle="Kısa başvuru" />

        <MetricGrid
          style={{ marginBottom: AppTheme.spacing.xl }}
          items={[
            {
              icon: '⚡',
              label: 'TOPLAM',
              value: typedAlgorithmsData.algorithms.reduce((acc, g) => acc + g.items.length, 0),
              caption: 'algoritma',
              color: 'primary',
            },
            {
              icon: '📚',
              label: 'KATEGORİ',
              value: typedAlgorithmsData.algorithms.length,
              caption: 'grup',
              color: 'secondary',
            },
          ]}
        />

        <SectionHeader title="Gruplar" subtitle="Kısa referans" />

        {typedAlgorithmsData.algorithms.map((group) => (
          <View key={group.id} style={{ marginBottom: AppTheme.spacing.xl }}>
            <View style={styles.groupHeader}>
              <View style={styles.groupDot} />
              <Text variant="label" color="primary" style={styles.groupTitle}>
                {group.title}
              </Text>
              <View style={styles.groupLine} />
            </View>

            {group.items.map((item) => {
              const isExpanded = expandedItem === `${group.id}-${item.name}`;

              return (
                <AlgorithmItemCard
                  key={item.name}
                  item={item}
                  isExpanded={isExpanded}
                  onToggle={() => setExpandedItem(isExpanded ? null : `${group.id}-${item.name}`)}
                />
              );
            })}
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </ThemedContainer>
  );
};

const styles = StyleSheet.create({
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: AppTheme.spacing.md,
  },
  groupDot: {
    width: 6,
    height: 6,
    backgroundColor: AppTheme.colors.primary,
    marginRight: 12,
  },
  groupTitle: {
    letterSpacing: 2,
    fontSize: 12,
  },
  groupLine: {
    flex: 1,
    height: 1,
    backgroundColor: AppTheme.colors.border,
    marginLeft: 12,
  },
  card: {
    padding: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.sm,
  },
  cardExpanded: {
    borderColor: AppTheme.colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badges: {
    flexDirection: 'row',
  },
  expandButton: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: AppTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppTheme.colors.background,
  },
  expanded: {
    marginTop: AppTheme.spacing.md,
  },
  divider: {
    height: 2,
    backgroundColor: AppTheme.colors.border,
    marginBottom: AppTheme.spacing.md,
  },
  descriptionBox: {
    backgroundColor: AppTheme.colors.background,
    borderLeftWidth: 3,
    borderLeftColor: AppTheme.colors.secondary,
    padding: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.md,
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: AppTheme.spacing.sm,
  },
  descriptionDot: {
    width: 4,
    height: 4,
    backgroundColor: AppTheme.colors.secondary,
    marginRight: 8,
  },
  description: {
    lineHeight: 22,
    color: AppTheme.colors.textMuted,
    fontSize: 14,
  },
});
