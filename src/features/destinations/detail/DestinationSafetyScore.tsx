import { StyleSheet, Text, View } from 'react-native';

import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

interface DestinationSafetyScoreProps {
  score: number;
}

export default function DestinationSafetyScore({ score }: DestinationSafetyScoreProps) {
  const filledSegments = Math.ceil(Math.min(Math.max(score, 0), 100) / 10);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>INDICADOR DE DEMOSTRACIÓN</Text>
          <Text style={styles.title}>Índice ilustrativo de seguridad</Text>
        </View>
        <View style={styles.scoreBadge}>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.outOf}>/100</Text>
        </View>
      </View>
      <View
        accessibilityLabel={`Índice ficticio de demostración: ${score} de 100`}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: score }}
        style={styles.segments}>
        {Array.from({ length: 10 }, (_, index) => (
          <View
            key={index}
            style={[styles.segment, index < filledSegments && styles.filledSegment]}
          />
        ))}
      </View>
      <Text style={styles.disclaimer}>
        Puntuación ficticia para esta maqueta. No es una evaluación real ni sustituye fuentes oficiales.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: 22,
    backgroundColor: palette.softGreen,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  heading: {
    flex: 1,
  },
  eyebrow: {
    color: '#3F8C68',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  title: {
    marginTop: spacing.xxs,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '800',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 15,
    backgroundColor: palette.white,
  },
  score: {
    color: palette.ink,
    fontSize: 20,
    fontWeight: '800',
  },
  outOf: {
    color: palette.muted,
    fontSize: 10,
    fontWeight: '600',
  },
  segments: {
    flexDirection: 'row',
    gap: spacing.xxs,
    marginTop: spacing.md,
  },
  segment: {
    flex: 1,
    height: 8,
    borderRadius: 5,
    backgroundColor: palette.white,
  },
  filledSegment: {
    backgroundColor: palette.green,
  },
  disclaimer: {
    marginTop: spacing.sm,
    color: palette.muted,
    fontSize: 10,
    lineHeight: 15,
  },
});
