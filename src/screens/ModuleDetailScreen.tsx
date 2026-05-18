import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Container as ThemedContainer, Text, ScreenHeader, Badge, ProgressBar } from '../components/Themed';
import { MetricGrid, PressableCard, SectionHeader } from '../components/StudyUI';
import { theme as AppTheme } from '../theme';

export const ModuleDetailScreen = ({ route, navigation }: any) => {
  const { topicTitle, topic } = route.params;

  return (
    <ThemedContainer style={{ paddingHorizontal: AppTheme.spacing.md }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title={topic.title}
          subtitle={topicTitle || 'Konu içeriği'}
          onBack={() => navigation.goBack()}
        />

        <MetricGrid
          style={{ marginBottom: AppTheme.spacing.lg }}
          items={[
            {
              label: 'DERS',
              value: topic.lessons.length,
              caption: 'toplam',
              color: 'primary',
            },
            {
              label: 'İLERLEME',
              value: `${topic.progress}%`,
              caption: 'tamamlanan',
              color: 'secondary',
            },
            {
              label: 'DURUM',
              value: topic.progress === 100 ? 'Hazır' : 'Sürüyor',
              caption: topic.progress === 100 ? 'tamamlandı' : 'devam ediyor',
              color: topic.progress === 100 ? 'success' : 'secondary',
            },
          ]}
        />

        <View style={styles.progressCard}>
          <View style={{ marginBottom: AppTheme.spacing.md }}>
            <View style={styles.progressRow}>
              <Text variant="label" color="textMuted" style={{ fontSize: 10 }}>
                KONU İLERLEMESİ
              </Text>
              <Text variant="mono" color="primary" style={{ fontSize: 10 }}>{topic.progress}%</Text>
            </View>
            <ProgressBar progress={topic.progress} height={6} />
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <View style={styles.descriptionHeader}>
            <View style={styles.descriptionDot} />
            <Text variant="label" color="primary" style={{ fontSize: 11, letterSpacing: 1 }}>Açıklama</Text>
          </View>
          <Text color="textMuted" style={{ lineHeight: 22, fontSize: 14 }}>
            {topic.description}
          </Text>
        </View>

        <View style={styles.studyCard}>
          <View style={styles.studyHeader}>
            <View style={styles.studyDot} />
            <Text variant="label" color="primary" style={{ fontSize: 11, letterSpacing: 1 }}>
              KONU ÖZETİ
            </Text>
          </View>
          <Text variant="heading" style={styles.studyTitle}>
            {topic.title}
          </Text>
          <Text color="textMuted" style={styles.studySummary}>
            {topic.study.whyItMatters}
          </Text>

          <View style={styles.studyMetaRow}>
            <Badge label={topic.study.difficulty} color="textMuted" />
            <Badge label={topic.study.estimatedTime} color="secondary" />
          </View>

          <View style={styles.goalList}>
            {topic.study.learningGoals.map((goal: string) => (
              <View key={goal} style={styles.goalRow}>
                <View style={styles.goalDot} />
                <Text color="textMuted" style={styles.goalText}>
                  {goal}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <SectionHeader title="Dersler" subtitle="Okuma sırası" />

        {topic.lessons.map((lesson: any, index: number) => {
          return (
            <PressableCard
              key={lesson.id}
              onPress={() => navigation.navigate('LessonContent', {
                topicTitle: topic.title,
                lesson: lesson
              })}
              style={styles.lessonItem}
            >
              <View style={styles.lessonIndex}>
                <View style={styles.indexBadge}>
                  <Text variant="mono" color="primary" style={{ fontSize: 12 }}>
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                </View>
              </View>
              
              <View style={styles.lessonInfo}>
                <Text variant="heading" style={{ fontSize: 15, marginBottom: 6, letterSpacing: 0.5 }}>
                  {lesson.title}
                </Text>
                {lesson.duration && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.durationDot} />
                    <Text variant="mono" color="textMuted" style={{ fontSize: 10 }}>
                      {lesson.duration}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.arrowButton}>
                <Text color="primary" style={{ fontSize: 16 }}>→</Text>
              </View>
            </PressableCard>
          );
        })}

        {topic.quiz && (
          <PressableCard
            style={styles.quizCard}
          >
            <View style={styles.quizIcon}>
              <Text style={{ fontSize: 24 }}>🎯</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="heading" color="secondary" style={{ fontSize: 16, marginBottom: 4 }}>
                Quiz zamanı
              </Text>
              <Text variant="label" color="textMuted" style={{ fontSize: 11 }}>
                Öğrendiklerini kısa bir denemeyle kontrol et
              </Text>
            </View>
            <View style={[styles.arrowButton, { borderColor: AppTheme.colors.secondary }]}>
              <Text color="secondary" style={{ fontSize: 16 }}>→</Text>
            </View>
          </PressableCard>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </ThemedContainer>
  );
};

const styles = StyleSheet.create({
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
  },
  descriptionCard: {
    backgroundColor: AppTheme.colors.surface,
    borderWidth: 2,
    borderColor: AppTheme.colors.border,
    borderLeftWidth: 4,
    borderLeftColor: AppTheme.colors.primary,
    padding: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.xl,
    ...AppTheme.shadows.sm,
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: AppTheme.spacing.sm,
  },
  descriptionDot: {
    width: 4,
    height: 4,
    backgroundColor: AppTheme.colors.primary,
    marginRight: 8,
  },
  studyCard: {
    backgroundColor: AppTheme.colors.surface,
    borderWidth: 2,
    borderColor: AppTheme.colors.border,
    padding: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.xl,
    ...AppTheme.shadows.sm,
  },
  studyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: AppTheme.spacing.sm,
  },
  studyDot: {
    width: 4,
    height: 4,
    backgroundColor: AppTheme.colors.primary,
    marginRight: 8,
  },
  studyTitle: {
    fontSize: 16,
    marginBottom: 6,
  },
  studySummary: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  studyMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  goalList: {
    gap: 8,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  goalDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: AppTheme.colors.secondary,
    marginTop: 7,
    marginRight: 10,
  },
  goalText: {
    flex: 1,
    lineHeight: 20,
    fontSize: 13,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.sm,
  },
  lessonIndex: {
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
  lessonInfo: {
    flex: 1,
  },
  durationDot: {
    width: 4,
    height: 4,
    backgroundColor: AppTheme.colors.textMuted,
    marginRight: 6,
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
  quizCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: AppTheme.spacing.lg,
    marginTop: AppTheme.spacing.xl,
    borderWidth: 2,
    borderColor: AppTheme.colors.secondary,
    backgroundColor: AppTheme.colors.surface,
    ...AppTheme.shadows.md,
  },
  quizIcon: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: AppTheme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AppTheme.spacing.md,
    backgroundColor: AppTheme.colors.background,
  },
});
