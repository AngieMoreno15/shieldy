import { SymbolView } from 'expo-symbols';
import { useMemo, useState, useSyncExternalStore } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import IncidentReportForm from '@/features/reports/IncidentReportForm';
import SubmittedIncidentReportCard from '@/features/reports/SubmittedIncidentReportCard';
import { getFeaturedDestinations } from '@/services/destinations.service';
import {
  getSubmittedIncidentReports,
  subscribeToSubmittedIncidentReports,
} from '@/services/reports.service';
import type { SubmittedIncidentReport } from '@/types/report.types';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export default function ReportScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const reports = useSyncExternalStore(
    subscribeToSubmittedIncidentReports,
    getSubmittedIncidentReports,
    getSubmittedIncidentReports,
  );
  const destinations = useMemo(() => getFeaturedDestinations(), []);
  const [submittedReport, setSubmittedReport] = useState<SubmittedIncidentReport | null>(null);
  const wideLayout = width >= 920;

  const handleSubmitted = (report: SubmittedIncidentReport) => {
    setSubmittedReport(report);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: width < 360 ? spacing.md : spacing.lg },
        ]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver al inicio"
          onPress={() => router.replace('/(tabs)/home')}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <SymbolView
            name={{ ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' }}
            size={18}
            tintColor={palette.ink}
          />
          <Text style={styles.backLabel}>Volver al inicio</Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <SymbolView
              name={{ ios: 'square.and.pencil', android: 'edit_square', web: 'edit_square' }}
              size={24}
              tintColor={palette.coral}
            />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Reportar un incidente</Text>
            <Text style={styles.subtitle}>Comparte un reporte de demostración local</Text>
          </View>
        </View>

        <View style={styles.warningBanner}>
          <SymbolView
            name={{ ios: 'exclamationmark.triangle.fill', android: 'warning', web: 'warning' }}
            size={19}
            tintColor="#9A7025"
          />
          <Text style={styles.warningText}>
            Esta función es solo una simulación académica. El reporte no se envía a nadie, no crea
            una alerta verificada y no sustituye los servicios de emergencia.
          </Text>
        </View>

        {submittedReport && (
          <View
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
            style={styles.successBanner}>
            <View style={styles.successIcon}>
              <SymbolView
                name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
                size={21}
                tintColor="#3F8C68"
              />
            </View>
            <View style={styles.successTextContainer}>
              <Text style={styles.successTitle}>Reporte demo registrado</Text>
              <Text style={styles.successMessage}>
                “{submittedReport.title}” se guardó localmente durante esta sesión.
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Cerrar confirmación"
              onPress={() => setSubmittedReport(null)}
              hitSlop={8}>
              <SymbolView
                name={{ ios: 'xmark', android: 'close', web: 'close' }}
                size={16}
                tintColor={palette.muted}
              />
            </Pressable>
          </View>
        )}

        <View style={[styles.mainGrid, wideLayout && styles.mainGridWide]}>
          <View style={[styles.formColumn, wideLayout && styles.formColumnWide]}>
            <IncidentReportForm
              destinations={destinations}
              onSubmitted={handleSubmitted}
            />
          </View>

          <View style={[styles.reportsColumn, wideLayout && styles.reportsColumnWide]}>
            <View style={styles.reportsHeader}>
              <View style={styles.reportsTitleContainer}>
                <Text style={styles.sectionEyebrow}>ESTA SESIÓN</Text>
                <Text style={styles.reportsTitle}>Reportes enviados</Text>
              </View>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{reports.length}</Text>
              </View>
            </View>
            <Text style={styles.reportsSubtitle}>
              Solo tú puedes ver estos reportes en esta sesión de demostración.
            </Text>

            {reports.length > 0 ? (
              reports.map((report) => (
                <SubmittedIncidentReportCard key={report.id} report={report} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <View style={styles.emptyIcon}>
                  <SymbolView
                    name={{ ios: 'doc.text', android: 'description', web: 'description' }}
                    size={24}
                    tintColor={palette.muted}
                  />
                </View>
                <Text style={styles.emptyTitle}>Aún no hay reportes</Text>
                <Text style={styles.emptyDescription}>
                  Al enviar un formulario de demostración, aparecerá aquí durante esta sesión.
                </Text>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.footerNotice}>
          Datos locales y simulados · Sin GPS, backend ni contacto con autoridades.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.canvas,
  },
  content: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  backButton: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.md,
    borderRadius: 20,
    backgroundColor: palette.white,
  },
  backLabel: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  headerIcon: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: palette.softCoral,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: typography.fontSize.title,
    lineHeight: typography.lineHeight.title,
    fontWeight: typography.fontWeight.extrabold,
  },
  subtitle: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 12,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 17,
    backgroundColor: palette.softYellow,
  },
  warningText: {
    flex: 1,
    color: palette.ink,
    fontSize: 11,
    lineHeight: 17,
    fontWeight: '600',
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#B9DFCA',
    backgroundColor: palette.softGreen,
  },
  successIcon: {
    paddingTop: spacing.xxs,
  },
  successTextContainer: {
    flex: 1,
  },
  successTitle: {
    color: '#347452',
    fontSize: 13,
    fontWeight: '800',
  },
  successMessage: {
    marginTop: spacing.xxs,
    color: palette.ink,
    fontSize: 11,
    lineHeight: 17,
  },
  mainGrid: {
    gap: spacing.lg,
  },
  mainGridWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  formColumn: {
    minWidth: 0,
    width: '100%',
  },
  formColumnWide: {
    width: '58%',
  },
  reportsColumn: {
    minWidth: 0,
    width: '100%',
  },
  reportsColumnWide: {
    flex: 1,
  },
  reportsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xxs,
  },
  reportsTitleContainer: {
    flex: 1,
  },
  sectionEyebrow: {
    color: palette.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  reportsTitle: {
    marginTop: spacing.xxs,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: 19,
    fontWeight: '800',
  },
  countBadge: {
    minWidth: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: palette.softSky,
  },
  countText: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  reportsSubtitle: {
    marginBottom: spacing.sm,
    color: palette.muted,
    fontSize: 10,
    lineHeight: 15,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
    borderRadius: 20,
    backgroundColor: palette.white,
  },
  emptyIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: palette.softSky,
  },
  emptyTitle: {
    marginTop: spacing.sm,
    color: palette.ink,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyDescription: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
  },
  footerNotice: {
    marginTop: spacing.lg,
    color: palette.muted,
    fontSize: 10,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.78,
  },
});
