import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
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

import ProfileAboutCard from '@/features/profile/ProfileAboutCard';
import ProfileDestinationRow from '@/features/profile/ProfileDestinationRow';
import ProfileHeaderCard from '@/features/profile/ProfileHeaderCard';
import ProfileLanguageSelector from '@/features/profile/ProfileLanguageSelector';
import ProfilePreferenceRow from '@/features/profile/ProfilePreferenceRow';
import ProfileSectionCard from '@/features/profile/ProfileSectionCard';
import { useProfileData } from '@/features/profile/useProfileData';
import SubmittedIncidentReportCard from '@/features/reports/SubmittedIncidentReportCard';
import {
  setProfileLanguage,
  setProfileNotificationPreference,
  setProfilePrivacyPreference,
} from '@/services/user.service';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export default function ProfileScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { user, favoriteDestinations, reports, preferences } = useProfileData();
  const [showAllFavorites, setShowAllFavorites] = useState(false);
  const wideLayout = width >= 900;
  const visibleFavorites = showAllFavorites
    ? favoriteDestinations
    : favoriteDestinations.slice(0, 3);
  const visibleReports = reports.slice(0, 2);

  const openDestination = (id: string) => {
    router.push({ pathname: '/destination/[id]', params: { id } });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: width < 360 ? spacing.md : spacing.lg },
        ]}>
        <View style={styles.pageHeader}>
          <View style={styles.pageTitleGroup}>
            <Text style={styles.eyebrow}>TU ESPACIO SHIELDY</Text>
            <Text style={styles.pageTitle}>Mi perfil</Text>
            <Text style={styles.pageSubtitle}>Tu información y preferencias de viaje.</Text>
          </View>
          <View style={styles.pageIcon}>
            <SymbolView
              name={{ ios: 'person.crop.circle.fill', android: 'account_circle', web: 'account_circle' }}
              size={25}
              tintColor={palette.coral}
            />
          </View>
        </View>

        <ProfileHeaderCard user={user} />

        <View style={[styles.columns, wideLayout && styles.columnsWide]}>
          <View style={[styles.column, wideLayout && styles.columnWide]}>
            <ProfileSectionCard
              title="Destinos favoritos"
              icon={{ ios: 'heart.fill', android: 'favorite', web: 'favorite' }}
              action={
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{favoriteDestinations.length}</Text>
                </View>
              }>
              {favoriteDestinations.length > 0 ? (
                <>
                  {visibleFavorites.map((destination) => (
                    <ProfileDestinationRow
                      key={destination.id}
                      destination={destination}
                      onPress={() => openDestination(destination.id)}
                    />
                  ))}
                  {favoriteDestinations.length > 3 && (
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => setShowAllFavorites((current) => !current)}
                      style={({ pressed }) => [styles.textAction, pressed && styles.pressed]}>
                      <Text style={styles.textActionLabel}>
                        {showAllFavorites ? 'Mostrar menos' : 'Ver todos los favoritos'}
                      </Text>
                      <Text style={styles.actionArrow}>{showAllFavorites ? '−' : '›'}</Text>
                    </Pressable>
                  )}
                </>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>
                    Guarda destinos con el icono de corazón para verlos aquí.
                  </Text>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => router.navigate('/(tabs)/destinations')}
                    style={({ pressed }) => [styles.textAction, pressed && styles.pressed]}>
                    <Text style={styles.textActionLabel}>Explorar destinos</Text>
                    <Text style={styles.actionArrow}>›</Text>
                  </Pressable>
                </View>
              )}
            </ProfileSectionCard>

            <ProfileSectionCard
              title="Notificaciones"
              icon={{ ios: 'bell.badge.fill', android: 'notifications_active', web: 'notifications_active' }}>
              <ProfilePreferenceRow
                title="Alertas de seguridad"
                description="Avisos locales de demostración."
                value={preferences.notifications.securityAlerts}
                onValueChange={(value) => setProfileNotificationPreference('securityAlerts', value)}
              />
              <ProfilePreferenceRow
                title="Novedades de destinos"
                description="Actualizaciones de la guía de viaje."
                value={preferences.notifications.destinationUpdates}
                onValueChange={(value) => setProfileNotificationPreference('destinationUpdates', value)}
              />
              <ProfilePreferenceRow
                title="Resumen semanal"
                description="Un resumen visual de tus destinos guardados."
                value={preferences.notifications.weeklySummary}
                onValueChange={(value) => setProfileNotificationPreference('weeklySummary', value)}
              />
              <ProfileLanguageSelector
                value={preferences.language}
                onChange={setProfileLanguage}
              />
            </ProfileSectionCard>
          </View>

          <View style={[styles.column, wideLayout && styles.columnWide]}>
            <ProfileSectionCard
              title="Mis reportes"
              icon={{ ios: 'doc.text.fill', android: 'description', web: 'description' }}
              action={
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{reports.length}</Text>
                </View>
              }>
              <Text style={styles.sectionHint}>
                Reportes de demostración registrados durante esta sesión.
              </Text>
              {visibleReports.length > 0 ? (
                <>
                  {visibleReports.map((report) => (
                    <SubmittedIncidentReportCard key={report.id} report={report} />
                  ))}
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => router.push('/report')}
                    style={({ pressed }) => [styles.textAction, pressed && styles.pressed]}>
                    <Text style={styles.textActionLabel}>
                      {reports.length > visibleReports.length
                        ? 'Ver todos mis reportes'
                        : 'Abrir reportes'}
                    </Text>
                    <Text style={styles.actionArrow}>›</Text>
                  </Pressable>
                </>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>
                    Todavía no has enviado reportes en esta sesión.
                  </Text>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => router.push('/report')}
                    style={({ pressed }) => [styles.textAction, pressed && styles.pressed]}>
                    <Text style={styles.textActionLabel}>Ir a reportes</Text>
                    <Text style={styles.actionArrow}>›</Text>
                  </Pressable>
                </View>
              )}
            </ProfileSectionCard>

            <ProfileSectionCard
              title="Privacidad"
              icon={{ ios: 'hand.raised.fill', android: 'privacy_tip', web: 'privacy_tip' }}>
              <Text style={styles.sectionHint}>
                Ajustes locales de demostración. Ningún dato se comparte externamente.
              </Text>
              <ProfilePreferenceRow
                title="Compartir actividad de viajes"
                description="Preferencia visual; no publica información."
                value={preferences.privacy.shareTravelActivity}
                onValueChange={(value) => setProfilePrivacyPreference('shareTravelActivity', value)}
              />
              <ProfilePreferenceRow
                title="Sugerencias personalizadas"
                description="Preferencia local para esta demostración."
                value={preferences.privacy.personalizedSuggestions}
                onValueChange={(value) => setProfilePrivacyPreference('personalizedSuggestions', value)}
              />
            </ProfileSectionCard>

            <ProfileAboutCard />

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Cerrar sesión de demostración y volver a bienvenida"
              onPress={() => router.replace('/')}
              style={({ pressed }) => [styles.signOutButton, pressed && styles.pressed]}>
              <SymbolView
                name={{ ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' }}
                size={18}
                tintColor={palette.coral}
              />
              <Text style={styles.signOutLabel}>Cerrar sesión de demostración</Text>
            </Pressable>
            <Text style={styles.signOutHint}>
              Esta acción solo vuelve a la pantalla de bienvenida.
            </Text>
          </View>
        </View>
        <Text style={styles.footer}>Shieldy · Proyecto académico · Perfil ficticio</Text>
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
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  pageTitleGroup: {
    flex: 1,
  },
  eyebrow: {
    color: palette.coral,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.9,
  },
  pageTitle: {
    marginTop: spacing.xxs,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: typography.fontSize.title,
    lineHeight: typography.lineHeight.title,
    fontWeight: typography.fontWeight.extrabold,
  },
  pageSubtitle: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 11,
  },
  pageIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
    borderRadius: 17,
    backgroundColor: palette.softCoral,
  },
  columns: {
    gap: spacing.md,
  },
  columnsWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  column: {
    minWidth: 0,
    width: '100%',
    gap: spacing.md,
  },
  columnWide: {
    width: '50%',
  },
  countBadge: {
    minWidth: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
    borderRadius: 11,
    backgroundColor: palette.softCoral,
  },
  countText: {
    color: palette.ink,
    fontSize: 11,
    fontWeight: '800',
  },
  emptyState: {
    paddingVertical: spacing.xs,
  },
  emptyText: {
    color: palette.muted,
    fontSize: 11,
    lineHeight: 17,
  },
  textAction: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
    borderRadius: 13,
    backgroundColor: palette.softSky,
  },
  textActionLabel: {
    color: palette.ink,
    fontSize: 11,
    fontWeight: '800',
  },
  actionArrow: {
    color: palette.coral,
    fontSize: 19,
    lineHeight: 20,
  },
  sectionHint: {
    marginBottom: spacing.xs,
    color: palette.muted,
    fontSize: 10,
    lineHeight: 15,
  },
  signOutButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#F4D1CD',
    backgroundColor: palette.white,
  },
  signOutLabel: {
    color: palette.coral,
    fontSize: 12,
    fontWeight: '800',
  },
  signOutHint: {
    marginTop: -spacing.xs,
    color: palette.muted,
    fontSize: 9,
    textAlign: 'center',
  },
  footer: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 9,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.72,
  },
});
