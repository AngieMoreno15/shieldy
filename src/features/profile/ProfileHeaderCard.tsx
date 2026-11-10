import { SymbolView } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';

import type { UserProfile } from '@/types/user.types';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

interface ProfileHeaderCardProps {
  user: UserProfile;
}

export default function ProfileHeaderCard({ user }: ProfileHeaderCardProps) {
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.identity}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
          <View style={styles.avatarBadge}>
            <SymbolView
              name={{ ios: 'sparkle', android: 'auto_awesome', web: 'auto_awesome' }}
              size={11}
              tintColor={palette.ink}
            />
          </View>
        </View>
        <View style={styles.identityText}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
            <View style={styles.demoBadge}>
              <Text style={styles.demoLabel}>DEMO</Text>
            </View>
          </View>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.tagline}>Viajera exploradora</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.details}>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>PAÍS BASE</Text>
          <Text style={styles.detailValue}>{user.homeCountry}</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>EN SHIELDY DESDE</Text>
          <Text style={styles.detailValue}>{user.travelerSince}</Text>
        </View>
      </View>
      <Text style={styles.disclaimer}>Perfil ficticio para una demostración académica.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: 26,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
    backgroundColor: palette.sky,
  },
  initials: {
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: 28,
    fontWeight: '800',
  },
  avatarBadge: {
    position: 'absolute',
    right: -3,
    bottom: -3,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    borderWidth: 2,
    borderColor: palette.white,
    backgroundColor: palette.yellow,
  },
  identityText: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  name: {
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: 21,
    fontWeight: '800',
  },
  demoBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: palette.softCoral,
  },
  demoLabel: {
    color: palette.coral,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  email: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 12,
  },
  tagline: {
    marginTop: spacing.xs,
    color: palette.ink,
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: spacing.md,
    backgroundColor: palette.border,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    flex: 1,
    gap: spacing.xxs,
  },
  detailDivider: {
    width: StyleSheet.hairlineWidth,
    height: 30,
    marginHorizontal: spacing.md,
    backgroundColor: palette.border,
  },
  detailLabel: {
    color: palette.muted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  detailValue: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  disclaimer: {
    marginTop: spacing.md,
    color: palette.muted,
    fontSize: 9,
  },
});
