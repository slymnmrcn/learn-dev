import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Container as ThemedContainer, Text, CodeBlock, Button, OutlineButton, ScreenHeader } from '../components/Themed';
import { MetricGrid, SectionHeader } from '../components/StudyUI';
import { theme as AppTheme } from '../theme';

export const LessonScreen = ({ route, navigation }: any) => {
  const { topicTitle, lesson } = route.params;

  return (
    <ThemedContainer style={{ paddingHorizontal: AppTheme.spacing.md }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title={lesson.title}
          subtitle={topicTitle}
          onBack={() => navigation.goBack()}
        />

        <MetricGrid
          style={{ marginBottom: AppTheme.spacing.lg }}
          items={[
            ...(lesson.duration ? [{
              label: 'SÜRE',
              value: lesson.duration,
              caption: 'okuma',
              color: 'primary' as const,
            }] : []),
            {
              label: 'DERS',
              value: `#${String(lesson.id).split('-').pop()}`,
              caption: 'kimlik',
              color: 'textMuted' as const,
            },
            ...(lesson.codeLanguage ? [{
              label: 'DİL',
              value: lesson.codeLanguage.toUpperCase(),
              caption: 'kod örneği',
              color: 'secondary' as const,
            }] : []),
          ]}
        />

        <SectionHeader title="Ders İçeriği" subtitle="Özet akış" />

        <View style={styles.contentCard}>
          {lesson.content.split('\n\n').map((paragraph: string, i: number) => (
            <Text key={i} style={styles.paragraph}>{paragraph}</Text>
          ))}
        </View>

        <View style={styles.studyCard}>
          <View style={styles.studyHeader}>
            <View style={styles.studyDot} />
            <Text variant="label" color="primary" style={{ fontSize: 11, letterSpacing: 1 }}>
              DERS ÖZETİ
            </Text>
          </View>
          <Text color="textMuted" style={styles.studyText}>
            {lesson.study.takeaway}
          </Text>

          <View style={styles.studyBlock}>
            <Text variant="label" color="textMuted" style={styles.blockLabel}>
              KISA PRATİK
            </Text>
            <Text color="textMuted" style={styles.studyText}>
              {lesson.study.exercise}
            </Text>
          </View>

          <View style={styles.studyBlock}>
            <Text variant="label" color="textMuted" style={styles.blockLabel}>
              KONTROL NOKTASI
            </Text>
            <Text color="textMuted" style={styles.studyText}>
              {lesson.study.checkpoint}
            </Text>
          </View>
        </View>

        {lesson.codeExample && (
          <View style={{ marginBottom: AppTheme.spacing.lg }}>
            <View style={styles.codeHeader}>
              <View style={styles.codeDot} />
              <Text variant="label" color="primary" style={{ fontSize: 11, letterSpacing: 1 }}>
                Kod örneği
              </Text>
            </View>
            <CodeBlock code={lesson.codeExample} language={lesson.codeLanguage} />
          </View>
        )}

        {lesson.keyPoints && lesson.keyPoints.length > 0 && (
          <View style={styles.keyPointsCard}>
            <View style={styles.keyPointsHeader}>
              <Text style={{ fontSize: 20, marginRight: 8 }}>💡</Text>
              <Text variant="heading" style={{ fontSize: 16 }}>Önemli noktalar</Text>
            </View>
            {lesson.keyPoints.map((point: string, i: number) => (
              <View key={i} style={styles.keyPoint}>
                <View style={styles.keyPointBullet} />
                <Text style={styles.keyPointText}>{point}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <OutlineButton
            title="Geri"
            onPress={() => navigation.goBack()}
            style={{ flex: 1 }}
          />
          <View style={{ width: AppTheme.spacing.md }} />
          <Button
            title="İlerle"
            onPress={() => {
              navigation.goBack();
            }}
            style={{ flex: 1 }}
          />
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </ThemedContainer>
  );
};

const styles = StyleSheet.create({
  contentCard: {
    backgroundColor: AppTheme.colors.surface,
    borderWidth: 2,
    borderColor: AppTheme.colors.border,
    borderLeftWidth: 4,
    borderLeftColor: AppTheme.colors.primary,
    padding: AppTheme.spacing.lg,
    marginBottom: AppTheme.spacing.lg,
    ...AppTheme.shadows.sm,
  },
  paragraph: {
    lineHeight: 26,
    marginBottom: AppTheme.spacing.lg,
    color: AppTheme.colors.text,
    fontSize: 15,
  },
  studyCard: {
    backgroundColor: AppTheme.colors.surface,
    borderWidth: 2,
    borderColor: AppTheme.colors.border,
    padding: AppTheme.spacing.lg,
    marginBottom: AppTheme.spacing.lg,
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
  studyText: {
    fontSize: 13,
    lineHeight: 20,
  },
  studyBlock: {
    marginTop: AppTheme.spacing.md,
  },
  blockLabel: {
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 6,
  },
  codeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: AppTheme.spacing.sm,
  },
  codeDot: {
    width: 4,
    height: 4,
    backgroundColor: AppTheme.colors.primary,
    marginRight: 8,
  },
  keyPointsCard: {
    backgroundColor: AppTheme.colors.surface,
    borderWidth: 2,
    borderColor: AppTheme.colors.secondary,
    padding: AppTheme.spacing.lg,
    marginBottom: AppTheme.spacing.lg,
    ...AppTheme.shadows.md,
  },
  keyPointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: AppTheme.spacing.md,
    paddingBottom: AppTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  keyPoint: {
    flexDirection: 'row',
    marginBottom: AppTheme.spacing.md,
  },
  keyPointBullet: {
    width: 6,
    height: 6,
    backgroundColor: AppTheme.colors.secondary,
    marginRight: 12,
    marginTop: 8,
  },
  keyPointText: {
    flex: 1,
    lineHeight: 22,
    color: AppTheme.colors.text,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    marginTop: AppTheme.spacing.xl,
  },
});
