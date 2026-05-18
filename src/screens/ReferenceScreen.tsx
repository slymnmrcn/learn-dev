import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { Container as ThemedContainer, Text, ScreenHeader, Badge } from '../components/Themed';
import { MetricGrid, PressableCard, SectionHeader } from '../components/StudyUI';
import { theme as AppTheme } from '../theme';
import referenceData from '../data/reference.json';
import type { ReferenceSection } from '../types';

const typedReferenceData = referenceData as ReferenceSection[];

const ReferenceSectionCard = ({
  section,
  isOpen,
  onToggle,
}: {
  section: ReferenceSection;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const rotateAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  const sectionColor = AppTheme.colors[section.color];

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={{ marginBottom: AppTheme.spacing.sm }}>
      <PressableCard
        onPress={onToggle}
        style={[styles.sectionHeader, isOpen && { borderColor: sectionColor }]}
      >
        <View style={[styles.sectionIconBox, { borderColor: sectionColor }]}>
          <Text variant="mono" style={{ color: sectionColor, fontSize: 18 }}>
            {section.icon}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text variant="heading" style={{ fontSize: 15, marginBottom: 4, letterSpacing: 0.5 }}>
            {section.title}
          </Text>
          <Text color="textMuted" style={styles.sectionSummary}>
            {section.summary}
          </Text>
          <Badge label={`${section.items.length} komut`} color={section.color} />
        </View>

        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <View style={[styles.expandButton, { borderColor: sectionColor }]}>
            <Text style={{ color: sectionColor, fontSize: 14 }}>▼</Text>
          </View>
        </Animated.View>
      </PressableCard>

      {isOpen && (
        <View style={[styles.commandList, { borderColor: sectionColor }]}>
          {section.items.map((item, i) => (
            <View
              key={item.cmd}
              style={[
                styles.commandRow,
                i === section.items.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View style={styles.commandHeader}>
                <View style={[styles.commandDot, { backgroundColor: sectionColor }]} />
                <Text variant="mono" style={[styles.cmd, { color: sectionColor }]}>
                  {item.cmd}
                </Text>
              </View>
              <Text color="textMuted" style={styles.cmdDesc}>
                {item.desc}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export const ReferenceScreen = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <ThemedContainer style={{ paddingHorizontal: AppTheme.spacing.md }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Teknik Kılavuz" subtitle="Hızlı başvuru" />

        <MetricGrid
          style={{ marginBottom: AppTheme.spacing.xl }}
          items={[
            {
              icon: '⌨️',
              label: 'KOMUT',
              value: typedReferenceData.reduce((acc, s) => acc + s.items.length, 0),
              caption: 'toplam',
              color: 'primary',
            },
            {
              icon: '📦',
              label: 'KATEGORİ',
              value: typedReferenceData.length,
              caption: 'grup',
              color: 'secondary',
            },
            {
              icon: '🧭',
              label: 'ODAK',
              value: 'debug',
              caption: 'akış',
              color: 'success',
            },
          ]}
        />

        <SectionHeader title="Araç Kutusu" subtitle="Günlük teşhis" />

        {typedReferenceData.map((section) => (
          <ReferenceSectionCard
            key={section.id}
            section={section}
            isOpen={openSection === section.id}
            onToggle={() => setOpenSection(openSection === section.id ? null : section.id)}
          />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </ThemedContainer>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: AppTheme.spacing.md,
  },
  sectionIconBox: {
    width: 44,
    height: 44,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AppTheme.spacing.md,
    backgroundColor: AppTheme.colors.background,
  },
  sectionSummary: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  expandButton: {
    width: 32,
    height: 32,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppTheme.colors.background,
  },
  commandList: {
    borderWidth: 2,
    borderTopWidth: 0,
    backgroundColor: AppTheme.colors.background,
    ...AppTheme.shadows.md,
  },
  commandRow: {
    padding: AppTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  commandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  commandDot: {
    width: 4,
    height: 4,
    marginRight: 8,
  },
  cmd: {
    fontSize: 12,
    flex: 1,
  },
  cmdDesc: {
    fontSize: 13,
    lineHeight: 20,
    paddingLeft: 12,
  },
});
