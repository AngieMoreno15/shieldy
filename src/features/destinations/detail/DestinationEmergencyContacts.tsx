import { SymbolView } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';

import type { DestinationEmergencyContact } from '@/types/destination.types';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface DestinationEmergencyContactsProps {
  contacts: DestinationEmergencyContact[];
}

export default function DestinationEmergencyContacts({
  contacts,
}: DestinationEmergencyContactsProps) {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <View style={styles.iconContainer}>
          <SymbolView
            name={{ ios: 'phone.fill', android: 'call', web: 'call' }}
            size={19}
            tintColor="#9A7025"
          />
        </View>
        <View style={styles.headingText}>
          <Text style={styles.title}>Contactos de emergencia demo</Text>
          <Text style={styles.subtitle}>Números de ejemplo, no operativos</Text>
        </View>
      </View>

      <View style={styles.warning}>
        <SymbolView
          name={{ ios: 'exclamationmark.triangle.fill', android: 'warning', web: 'warning' }}
          size={19}
          tintColor="#9A7025"
        />
        <Text style={styles.warningText}>
          Estos contactos y números son ficticios, no están verificados y no deben utilizarse en
          situaciones reales. Ante una emergencia real, consulta los canales oficiales del lugar.
        </Text>
      </View>

      {contacts.map((contact, index) => (
        <View key={`${contact.label}-${index}`} style={styles.contact}>
          <Text style={styles.contactLabel}>{contact.label}</Text>
          <Text accessibilityLabel={`Número de demostración, no llamar: ${contact.number}`} style={styles.number}>
            {contact.number}
          </Text>
        </View>
      ))}
      <Text style={styles.demoLabel}>Solo para vista previa · No llamar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F1E5C8',
    backgroundColor: palette.softYellow,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: palette.white,
  },
  headingText: {
    flex: 1,
  },
  title: {
    color: palette.ink,
    fontSize: 15,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 10,
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    padding: spacing.sm,
    marginTop: spacing.md,
    borderRadius: 15,
    backgroundColor: '#FFFCF5',
  },
  warningText: {
    flex: 1,
    color: palette.ink,
    fontSize: 11,
    lineHeight: 17,
    fontWeight: '600',
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8DAB8',
  },
  contactLabel: {
    flex: 1,
    color: palette.ink,
    fontSize: 11,
  },
  number: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  demoLabel: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 9,
    fontWeight: '700',
  },
});
