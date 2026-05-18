import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Container as ThemedContainer, Text, ProgressBar, Badge } from '../components/Themed';
import { MetricGrid, PressableCard, SectionHeader } from '../components/StudyUI';
import { theme as AppTheme } from '../theme';
import { allModules, userData } from '../data';

export const DashboardScreen = ({ navigation }: any) => {
  const totalLessons = allModules.reduce((acc, m) =>
    acc + m.topics.reduce((tacc: number, t: any) => tacc + t.lessons.length, 0), 0);
  const completedTopics = allModules.reduce((acc, m) =>
    acc + m.topics.filter((t: any) => t.progress === 100).length, 0);
  const totalTopics = allModules.reduce((acc, m) => acc + m.topics.length, 0);
  const overallProgress = Math.round(
    allModules.reduce((acc, m) =>
      acc + m.topics.reduce((tacc: number, t: any) => tacc + t.progress, 0), 0) / totalTopics
  );

  return (
    <ThemedContainer style={{ paddingTop: 60 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text variant="label" color="primary" style={{ letterSpacing: 1 }}>
              OTURUM HAZIR
            </Text>
          </View>
          <Text variant="heading" style={styles.username}>
            {userData.name}
          </Text>
          <Text color="textMuted" style={styles.levelText}>
            {userData.level} · 2026.05 programı
          </Text>

          <View style={styles.overallProgress}>
            <View style={styles.progressRow}>
              <Text variant="label" color="textMuted" style={styles.progressLabel}>
                TOPLAM İLERLEME
              </Text>
              <Text variant="mono" color="primary" style={{ fontSize: 11 }}>{overallProgress}%</Text>
            </View>
            <ProgressBar progress={overallProgress} height={6} />
          </View>
        </View>

        <MetricGrid
          style={{ marginBottom: AppTheme.spacing.xl }}
          items={[
            {
              icon: '📚',
              label: 'TAMAMLANAN KONU',
              value: completedTopics,
              caption: `${totalTopics} toplam`,
              color: 'primary',
            },
            {
              icon: '⚡',
              label: 'TOPLAM DERS',
              value: totalLessons,
              caption: 'içerik',
              color: 'secondary',
            },
            {
              icon: '🎯',
              label: 'ORT. İLERLEME',
              value: `${overallProgress}%`,
              caption: 'ortalama',
              color: 'success',
            },
          ]}
        />

        <SectionHeader title="Modüller" subtitle="İçerik haritası" />

        {allModules.map((module, moduleIndex) => {
          const moduleProgress = Math.round(
            module.topics.reduce((acc: number, t: any) => acc + t.progress, 0) / module.topics.length
          );
          const totalLessonsInModule = module.topics.reduce((acc: number, t: any) => acc + t.lessons.length, 0);

          return (
            <PressableCard
              key={module.category}
              onPress={() => navigation.navigate('ModuleDetail', { module })}
              style={[
                styles.moduleCard,
              ]}
            >
              <View style={styles.moduleIcon}>
                <Text style={{ fontSize: 32 }}>
                  {module.icon || ['💻', '⚙️', '🌐'][moduleIndex % 3]}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text variant="heading" style={{ fontSize: 18, marginBottom: 8, letterSpacing: 0.5 }}>
                  {module.guide.displayName}
                </Text>

                <Text
                  color="textMuted"
                  style={styles.moduleSummary}
                  numberOfLines={2}
                >
                  {module.guide.summary}
                </Text>

                <View style={styles.moduleMetaRow}>
                  <Badge label={module.guide.level} color="textMuted" />
                  <Badge label={module.guide.estimatedTime} color="secondary" />
                  <Badge label={`${module.topics.length} konu`} color="textMuted" />
                  <Badge label={`${totalLessonsInModule} ders`} color="textMuted" />
                  <Badge
                    label={`${moduleProgress}%`}
                    color={moduleProgress === 100 ? 'success' : 'primary'}
                    variant={moduleProgress === 100 ? 'filled' : 'outline'}
                  />
                </View>

                <ProgressBar progress={moduleProgress} height={6} animated={false} />
              </View>

              <View style={styles.arrowButton}>
                <Text color="primary" style={{ fontSize: 18 }}>→</Text>
              </View>
            </PressableCard>
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>
    </ThemedContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: AppTheme.spacing.xl,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: AppTheme.colors.primary,
    marginRight: 8,
  },
  username: {
    fontSize: 32,
    letterSpacing: -0.5,
    lineHeight: 36,
    marginBottom: 4,
  },
  levelText: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: AppTheme.spacing.lg,
  },
  overallProgress: {
    backgroundColor: AppTheme.colors.surface,
    padding: AppTheme.spacing.md,
    borderWidth: 2,
    borderColor: AppTheme.colors.border,
    ...AppTheme.shadows.sm,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 11,
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: AppTheme.spacing.lg,
    marginBottom: AppTheme.spacing.md,
  },
  moduleSummary: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10,
  },
  moduleMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  moduleIcon: {
    width: 64,
    height: 64,
    borderWidth: 2,
    borderColor: AppTheme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AppTheme.spacing.lg,
    backgroundColor: AppTheme.colors.background,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: AppTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppTheme.colors.background,
    marginLeft: AppTheme.spacing.md,
  },
});
