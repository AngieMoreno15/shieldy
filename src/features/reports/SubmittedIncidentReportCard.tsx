import { SymbolView } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';

import { incidentCategoryLabels, incidentSeverityPresentation } from '@/features/reports/report-presentation';
import type { SubmittedIncidentReport } from '@/types/report.types';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface SubmittedIncidentReportCardProps {
  report: SubmittedIncidentReport;
}

export default function SubmittedIncidentReportCard({
  report,
}: SubmittedIncidentReportCardProps) {
  const severity = incidentSeverityPresentation[report.severity];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <SymbolView
            name={{ ios: 'square.and.pencil', android: 'edit_square', web: 'edit_square' }}
            size={18}
            tintColor={palette.coral}
          />
        </View>
        <View style={styles.heading}>
          <Text style={styles.category}>{incidentCategoryLabels[report.category]}</Text>
          <Text style={styles.title}>{report.title}</Text>
        </View>
        <View style={[styles.severityBadge, { backgroundColor: severity.backgroundColor }]}>
          <Text style={[styles.severityText, { color: severity.color }]}>
            {severity.label}
          </Text>
        </View>
      </View>

      <Text numberOfLines={3} style={styles.description}>{report.description}</Text>
      <View style={styles.metadata}>
        <View style={styles.metadataRow}>
          <SymbolView
            name={{ ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' }}
            size={14}
            tintColor={palette.muted}
          />
          <Text style={styles.metadataText}>{report.destinationName}</Text>
        </View>
        <Text style={styles.location}>{report.demonstrationLocation}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.sentAt}>
          Enviado durante esta sesión · {new Date(report.submittedAt).toLocaleTimeString()}
        </Text>
        <Text style={styles.demoBadge}>REPORTE DEMO</Text>
      </View>
      <Text style={styles.disclaimer}>
        Reporte simulado. No es un incidente real ni una alerta verificada.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  icon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: palette.softCoral,
  },
  heading: {
    flex: 1,
    minWidth: 0,
  },
  category: {
    color: palette.muted,
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    marginTop: spacing.xxs,
    color: palette.ink,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '700',
  },
  severityBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: 11,
  },
  severityText: {
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  description: {
    marginTop: spacing.sm,
    color: palette.ink,
    fontSize: 12,
    lineHeight: 18,
  },
  metadata: {
    gap: spacing.xxs,
    paddingTop: spacing.sm,
    marginTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.border,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  metadataText: {
    color: palette.ink,
    fontSize: 10,
    fontWeight: '600',
  },
  location: {
    color: palette.muted,
    fontSize: 9,
    lineHeight: 14,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  sentAt: {
    color: palette.muted,
    fontSize: 9,
  },
  demoBadge: {
    color: palette.ink,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  disclaimer: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 9,
    lineHeight: 14,
  },
});
