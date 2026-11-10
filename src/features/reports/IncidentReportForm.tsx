import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { incidentCategoryOptions, incidentSeverityOptions } from '@/data/mock/reports.mock';
import { incidentCategoryLabels } from '@/features/reports/report-presentation';
import type { Destination } from '@/types/destination.types';
import type {
  IncidentReportFormErrors,
  IncidentReportFormValues,
  SubmittedIncidentReport,
} from '@/types/report.types';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import {
  submitIncidentReport,
  validateIncidentReport,
} from '@/services/reports.service';

interface IncidentReportFormProps {
  destinations: Destination[];
  onSubmitted: (report: SubmittedIncidentReport) => void;
}

const initialValues: IncidentReportFormValues = {
  category: null,
  title: '',
  description: '',
  destinationId: null,
  severity: 'medium',
};

export default function IncidentReportForm({
  destinations,
  onSubmitted,
}: IncidentReportFormProps) {
  const [values, setValues] = useState<IncidentReportFormValues>(initialValues);
  const [errors, setErrors] = useState<IncidentReportFormErrors>({});

  const updateValue = <K extends keyof IncidentReportFormValues>(
    key: K,
    value: IncidentReportFormValues[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    const errorField: keyof IncidentReportFormErrors | undefined =
      key === 'severity' ? undefined : key;
    if (!errorField) return;

    setErrors((current) => {
      if (!current[errorField]) return current;
      const remaining = { ...current };
      delete remaining[errorField];
      return remaining;
    });
  };

  const submit = () => {
    const validationErrors = validateIncidentReport(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const report = submitIncidentReport(values);
    if (!report) return;

    onSubmitted(report);
    setValues(initialValues);
    setErrors({});
  };

  const selectedDestination = destinations.find(
    (destination) => destination.id === values.destinationId,
  );

  return (
    <View style={styles.formCard}>
      <View style={styles.formHeading}>
        <View style={styles.formIcon}>
          <SymbolView
            name={{ ios: 'square.and.pencil', android: 'edit_square', web: 'edit_square' }}
            size={20}
            tintColor={palette.coral}
          />
        </View>
        <View style={styles.formHeadingText}>
          <Text style={styles.formTitle}>Cuéntanos qué pasó</Text>
          <Text style={styles.formSubtitle}>Completa los campos del reporte demo</Text>
        </View>
      </View>

      <FieldLabel title="Categoría" required />
      <View style={styles.categoryGrid}>
        {incidentCategoryOptions.map((option) => {
          const selected = values.category === option.id;
          return (
            <Pressable
              key={option.id}
              accessibilityRole="button"
              accessibilityLabel={`Categoría: ${option.label}`}
              accessibilityState={{ selected }}
              onPress={() => updateValue('category', option.id)}
              style={({ pressed }) => [
                styles.categoryOption,
                selected && styles.categoryOptionSelected,
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.categoryLabel, selected && styles.selectedText]}>
                {option.label}
              </Text>
              <Text
                style={[
                  styles.categoryDescription,
                  selected && styles.selectedSubtleText,
                ]}>
                {option.description}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <FieldError message={errors.category} />

      <FieldLabel title="Título" required />
      <TextInput
        accessibilityLabel="Título del incidente"
        autoCapitalize="sentences"
        maxLength={100}
        onChangeText={(text) => updateValue('title', text)}
        placeholder="Ej. Situación en un espacio público"
        placeholderTextColor={palette.muted}
        returnKeyType="next"
        style={[styles.input, errors.title && styles.inputError]}
        value={values.title}
      />
      <View style={styles.inputFooter}>
        <FieldError message={errors.title} />
        <Text style={styles.characterCount}>{values.title.length}/100</Text>
      </View>

      <FieldLabel title="Descripción" required />
      <TextInput
        accessibilityLabel="Descripción del incidente"
        autoCapitalize="sentences"
        maxLength={600}
        multiline
        onChangeText={(text) => updateValue('description', text)}
        placeholder="Añade detalles que ayuden a entender el reporte."
        placeholderTextColor={palette.muted}
        style={[styles.input, styles.descriptionInput, errors.description && styles.inputError]}
        textAlignVertical="top"
        value={values.description}
      />
      <View style={styles.inputFooter}>
        <FieldError message={errors.description} />
        <Text style={styles.characterCount}>{values.description.length}/600</Text>
      </View>

      <FieldLabel title="Destino" required />
      <Text style={styles.fieldHint}>Selecciona uno de los destinos de demostración.</Text>
      <View style={styles.destinationGrid}>
        {destinations.map((destination) => {
          const selected = values.destinationId === destination.id;
          return (
            <Pressable
              key={destination.id}
              accessibilityRole="button"
              accessibilityLabel={`Destino: ${destination.city}, ${destination.country}`}
              accessibilityState={{ selected }}
              onPress={() => updateValue('destinationId', destination.id)}
              style={({ pressed }) => [
                styles.destinationOption,
                selected && styles.destinationOptionSelected,
                pressed && styles.pressed,
              ]}>
              <Text style={styles.destinationFlag}>{destination.country}</Text>
              <Text
                numberOfLines={1}
                style={[styles.destinationName, selected && styles.selectedText]}>
                {destination.city}
              </Text>
              {selected && (
                <SymbolView
                  name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
                  size={16}
                  tintColor={palette.green}
                />
              )}
            </Pressable>
          );
        })}
      </View>
      <FieldError message={errors.destinationId} />

      <FieldLabel title="Ubicación" />
      <View style={styles.locationNotice}>
        <View style={styles.locationIcon}>
          <SymbolView
            name={{ ios: 'location.fill', android: 'location_on', web: 'location_on' }}
            size={18}
            tintColor="#347FB4"
          />
        </View>
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationTitle}>
            {selectedDestination
              ? `Zona centro · ${selectedDestination.city}`
              : 'Ubicación de demostración'}
          </Text>
          <Text style={styles.locationCaption}>Simulada para la presentación · Sin GPS</Text>
        </View>
        <View style={styles.demoBadge}>
          <Text style={styles.demoBadgeText}>DEMO</Text>
        </View>
      </View>

      <FieldLabel title="Gravedad" required />
      <View style={styles.severityRow}>
        {incidentSeverityOptions.map((option) => {
          const selected = values.severity === option.id;
          return (
            <Pressable
              key={option.id}
              accessibilityRole="button"
              accessibilityLabel={`Gravedad: ${option.label}`}
              accessibilityState={{ selected }}
              onPress={() => updateValue('severity', option.id)}
              style={({ pressed }) => [
                styles.severityOption,
                {
                  backgroundColor: selected ? option.backgroundColor : palette.white,
                  borderColor: selected ? option.color : palette.border,
                },
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.severityLabel, { color: option.color }]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.disclaimer}>
        <SymbolView
          name={{ ios: 'info.circle.fill', android: 'info', web: 'info' }}
          size={17}
          tintColor={palette.ink}
        />
        <Text style={styles.disclaimerText}>
          El envío es una demostración local. No contacta servicios de emergencia ni genera una alerta verificada.
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Enviar reporte de demostración"
        onPress={submit}
        style={({ pressed }) => [styles.submitButton, pressed && styles.submitPressed]}>
        <SymbolView
          name={{ ios: 'paperplane.fill', android: 'send', web: 'send' }}
          size={17}
          tintColor={palette.white}
        />
        <Text style={styles.submitButtonText}>Enviar reporte demo</Text>
      </Pressable>
    </View>
  );
}

interface FieldLabelProps {
  title: string;
  required?: boolean;
}

function FieldLabel({ title, required = false }: FieldLabelProps) {
  return (
    <Text style={styles.fieldLabel}>
      {title}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  );
}

interface FieldErrorProps {
  message?: string;
}

function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <Text accessibilityRole="alert" style={styles.errorText}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  formCard: {
    padding: spacing.lg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
  },
  formHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  formIcon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: palette.softCoral,
  },
  formHeadingText: {
    flex: 1,
  },
  formTitle: {
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: 18,
    fontWeight: '800',
  },
  formSubtitle: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 11,
  },
  fieldLabel: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    color: palette.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  required: {
    color: palette.coral,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  categoryOption: {
    width: '48%',
    minHeight: 65,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.canvas,
  },
  categoryOptionSelected: {
    borderColor: palette.coral,
    backgroundColor: palette.softCoral,
  },
  categoryLabel: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  categoryDescription: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 9,
    lineHeight: 13,
  },
  selectedText: {
    color: palette.ink,
  },
  selectedSubtleText: {
    color: palette.muted,
  },
  input: {
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 15,
    backgroundColor: palette.canvas,
    color: palette.ink,
    fontSize: 14,
  },
  descriptionInput: {
    minHeight: 116,
  },
  inputError: {
    borderColor: palette.coral,
    backgroundColor: palette.softCoral,
  },
  inputFooter: {
    minHeight: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  characterCount: {
    color: palette.muted,
    fontSize: 9,
  },
  errorText: {
    marginTop: spacing.xxs,
    color: '#C94B50',
    fontSize: 11,
    lineHeight: 16,
  },
  fieldHint: {
    marginTop: -spacing.xxs,
    marginBottom: spacing.xs,
    color: palette.muted,
    fontSize: 10,
  },
  destinationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  destinationOption: {
    width: '31.5%',
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.xs,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.canvas,
  },
  destinationOptionSelected: {
    borderColor: palette.green,
    backgroundColor: palette.softGreen,
  },
  destinationFlag: {
    color: palette.muted,
    fontSize: 9,
  },
  destinationName: {
    flex: 1,
    color: palette.ink,
    fontSize: 10,
    fontWeight: '600',
  },
  locationNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: 16,
    backgroundColor: palette.softSky,
  },
  locationIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: palette.white,
  },
  locationTextContainer: {
    flex: 1,
    minWidth: 0,
  },
  locationTitle: {
    color: palette.ink,
    fontSize: 11,
    fontWeight: '700',
  },
  locationCaption: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 9,
  },
  demoBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: 10,
    backgroundColor: palette.white,
  },
  demoBadgeText: {
    color: palette.ink,
    fontSize: 8,
    fontWeight: '800',
  },
  severityRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  severityOption: {
    flex: 1,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
  },
  severityLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    padding: spacing.sm,
    marginTop: spacing.lg,
    borderRadius: 14,
    backgroundColor: palette.softYellow,
  },
  disclaimerText: {
    flex: 1,
    color: palette.ink,
    fontSize: 10,
    lineHeight: 15,
  },
  submitButton: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    borderRadius: 17,
    backgroundColor: palette.coral,
  },
  submitButtonText: {
    color: palette.white,
    fontSize: 13,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.78,
  },
  submitPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
