import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Container as ThemedContainer, Text, ScreenHeader, Badge, ProgressBar } from '../components/Themed';
import { MetricGrid, PressableCard, SectionHeader } from '../components/StudyUI';
import { theme as AppTheme } from '../theme';

export const ModuleTopicsScreen = ({ route, navigation }: any) => {
  const { module } = route.params;

  const moduleProgress = Math.round(
    module.topics.reduce((acc: number, t: any) => acc + t.progress, 0) / module.topics.length
  );
  const completedTopics = module.topics.filter((t: any) => t.progress === 100).length;
  const totalLessons = module.topics.reduce((acc: number, t: any) => acc + t.lessons.length, 0);

  return (
    <ThemedContainer style={{ paddingHorizontal: AppTheme.spacing.md }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title={module.guide.displayName}
          subtitle="Modül içeriği"
          onBack={() => navigation.goBack()}
        />

        <MetricGrid
          style={{ marginBottom: AppTheme.spacing.lg }}
          items={[
            {
              label: 'KONU',
              value: module.topics.length,
              caption: 'toplam',
              color: 'primary',
            },
            {
              label: 'DERS',
              value: totalLessons,
              caption: 'içerik',
              color: 'secondary',
            },
            {
              label: 'TAMAMLANAN',
              value: completedTopics,
              caption: 'konu',
              color: 'success',
            },
          ]}
        />

        <View style={styles.guideCard}>
          <Text variant="label" color="primary" style={styles.guideKicker}>
            MODÜL ÖZETİ
          </Text>
          <Text variant="heading" style={styles.guideTitle}>
            {module.guide.displayName}
          </Text>
          <Text color="textMuted" style={styles.guideSummary}>
            {module.guide.summary}
          </Text>

          <View style={styles.guideMetaRow}>
            <Badge label={module.guide.level} color="textMuted" />
            <Badge label={module.guide.estimatedTime} color="secondary" />
          </View>

          <View style={styles.guideBlock}>
            <Text variant="label" color="textMuted" style={styles.guideBlockLabel}>
              BAŞLAMADAN ÖNCE
            </Text>
            <View style={styles.chipWrap}>
              {module.guide.prerequisites.map((item: string) => (
                <Badge key={item} label={item} color="primary" />
              ))}
            </View>
          </View>

          <View style={styles.guideBlock}>
            <Text variant="label" color="textMuted" style={styles.guideBlockLabel}>
              BU MODÜLÜN ÇIKTILARI
            </Text>
            {module.guide.learningGoals.map((goal: string, index: number) => (
              <View key={goal} style={styles.goalRow}>
                <View style={styles.goalDot} />
                <Text color="textMuted" style={styles.goalText}>
                  {goal}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text variant="label" color="textMuted" style={{ fontSize: 10 }}>
              MODÜL İLERLEME
            </Text>
            <Text variant="mono" color="primary" style={{ fontSize: 10 }}>{moduleProgress}%</Text>
          </View>
            <ProgressBar progress={moduleProgress} height={6} />
        </View>

        <SectionHeader title="Konular" subtitle="Adım adım ilerle" />

        {module.topics.map((topic: any, index: number) => {
          return (
            <PressableCard
              key={topic.id}
              onPress={() => navigation.navigate('Lesson', {
                topicTitle: topic.title,
                topic: topic
              })}
              style={styles.topicItem}
            >
              <View style={styles.topicIndex}>
                <View style={styles.indexBadge}>
                  <Text variant="mono" color="primary" style={{ fontSize: 12 }}>
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                </View>
              </View>
              
              <View style={styles.topicContent}>
                <Text variant="heading" style={styles.topicTitle}>
                  {topic.title}
                </Text>
                <Text color="textMuted" style={styles.topicSummary} numberOfLines={2}>
                  {topic.study.summary}
                </Text>
                
                <View style={styles.topicMeta}>
                  <Badge label={topic.study.difficulty} color="textMuted" />
                  <View style={{ width: 8 }} />
                  <Badge label={topic.study.estimatedTime} color="secondary" />
                  <View style={{ width: 8 }} />
                  <Badge label={`${topic.lessons.length} ders`} color="textMuted" />
                  <View style={{ width: 8 }} />
                  <Badge 
                    label={`${topic.progress}%`} 
                    color={topic.progress === 100 ? 'success' : 'primary'} 
                    variant={topic.progress === 100 ? 'filled' : 'outline'}
                  />
                </View>

                <View style={{ marginTop: 8 }}>
                  <ProgressBar progress={topic.progress} height={3} animated={false} />
                </View>
              </View>

              <View style={styles.arrowButton}>
                <Text color="primary" style={{ fontSize: 16 }}>→</Text>
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
  guideCard: {
    backgroundColor: AppTheme.colors.surface,
    borderWidth: 2,
    borderColor: AppTheme.colors.border,
    padding: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.lg,
    ...AppTheme.shadows.md,
  },
  guideKicker: {
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 4,
  },
  guideTitle: {
    fontSize: 18,
    marginBottom: 6,
  },
  guideSummary: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  guideMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  guideBlock: {
    marginTop: AppTheme.spacing.sm,
  },
  guideBlockLabel: {
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 8,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  goalDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: AppTheme.colors.primary,
    marginTop: 7,
    marginRight: 10,
  },
  goalText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
  progressCard: {
    backgroundColor: AppTheme.colors.surface,
    borderWidth: 2,
    borderColor: AppTheme.colors.border,
    padding: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.lg,
    ...AppTheme.shadows.md,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.sm,
  },
  topicIndex: {
    marginRight: AppTheme.spacing.md,
  },
  indexBadge: {
    width: 36,
    height: 36,
    borderWidth: 2,
    borderColor: AppTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppTheme.colors.background,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 14,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  topicSummary: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  topicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: AppTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppTheme.colors.background,
  },
});
