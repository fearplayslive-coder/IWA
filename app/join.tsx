
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme, typography, spacing, borderRadius } from '../constants/theme';
import { useAlert } from '../template';

export default function JoinScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    height: '',
    weight: '',
    experience: '',
    why: '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      showAlert('Error', 'Please fill in all required fields');
      return;
    }

    showAlert(
      'Application Submitted!',
      'Thank you for your interest in joining IWA. Our talent scouts will review your application and contact you within 5-7 business days.',
      [
        { 
          text: 'OK', 
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(220, 38, 38, 0.1)', 'rgba(0, 0, 0, 0.9)']}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={theme.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>JOIN IWA</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            paddingBottom: insets.bottom + 32,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <Animated.View 
            entering={FadeInDown.delay(100).duration(600)}
            style={styles.heroSection}
          >
            <Text style={styles.heroTitle}>BECOME A LEGEND</Text>
            <Text style={styles.heroSubtitle}>
              IWA is looking for the next generation of wrestling superstars. 
              Do you have what it takes to step into the Inferno?
            </Text>
          </Animated.View>

          {/* Requirements */}
          <Animated.View 
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.requirementsCard}
          >
            <Text style={styles.sectionTitle}>REQUIREMENTS</Text>
            <View style={styles.requirement}>
              <MaterialIcons name="check-circle" size={20} color={theme.success} />
              <Text style={styles.requirementText}>Age 18 or older</Text>
            </View>
            <View style={styles.requirement}>
              <MaterialIcons name="check-circle" size={20} color={theme.success} />
              <Text style={styles.requirementText}>Prior wrestling training or athletic experience</Text>
            </View>
            <View style={styles.requirement}>
              <MaterialIcons name="check-circle" size={20} color={theme.success} />
              <Text style={styles.requirementText}>Dedication and passion for professional wrestling</Text>
            </View>
            <View style={styles.requirement}>
              <MaterialIcons name="check-circle" size={20} color={theme.success} />
              <Text style={styles.requirementText}>Willingness to relocate if selected</Text>
            </View>
          </Animated.View>

          {/* Application Form */}
          <Animated.View 
            entering={FadeInDown.delay(300).duration(600)}
            style={styles.formCard}
          >
            <Text style={styles.sectionTitle}>APPLICATION FORM</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>FULL NAME *</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Enter your name"
                placeholderTextColor={theme.textMuted}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>EMAIL *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="your@email.com"
                placeholderTextColor={theme.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>PHONE</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                placeholder="(555) 123-4567"
                placeholderTextColor={theme.textMuted}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, styles.formGroupHalf]}>
                <Text style={styles.label}>AGE</Text>
                <TextInput
                  style={styles.input}
                  value={formData.age}
                  onChangeText={(text) => setFormData({ ...formData, age: text })}
                  placeholder="18+"
                  placeholderTextColor={theme.textMuted}
                  keyboardType="number-pad"
                />
              </View>

              <View style={[styles.formGroup, styles.formGroupHalf]}>
                <Text style={styles.label}>HEIGHT</Text>
                <TextInput
                  style={styles.input}
                  value={formData.height}
                  onChangeText={(text) => setFormData({ ...formData, height: text })}
                  placeholder={'6\'0"'} // Escape the single quote inside template literal
                  placeholderTextColor={theme.textMuted}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>WEIGHT (LBS)</Text>
              <TextInput
                style={styles.input}
                value={formData.weight}
                onChangeText={(text) => setFormData({ ...formData, weight: text })}
                placeholder="200"
                placeholderTextColor={theme.textMuted}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>WRESTLING EXPERIENCE</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.experience}
                onChangeText={(text) => setFormData({ ...formData, experience: text })}
                placeholder="Describe your training and experience..."
                placeholderTextColor={theme.textMuted}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>WHY DO YOU WANT TO JOIN IWA?</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.why}
                onChangeText={(text) => setFormData({ ...formData, why: text })}
                placeholder="Tell us your story..."
                placeholderTextColor={theme.textMuted}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </Animated.View>

          {/* Submit Button */}
          <Animated.View entering={FadeInDown.delay(400).duration(600)}>
            <Pressable
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitButtonPressed,
              ]}
              onPress={handleSubmit}
            >
              <MaterialIcons name="send" size={20} color={theme.textPrimary} />
              <Text style={styles.submitButtonText}>SUBMIT APPLICATION</Text>
            </Pressable>
          </Animated.View>

          <Text style={styles.disclaimer}>
            * Required fields. By submitting this form, you agree to IWA's terms and conditions.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.sectionHeader,
    color: theme.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    marginBottom: spacing.xl,
  },
  heroTitle: {
    ...typography.heroTitle,
    color: theme.primary,
    fontSize: 36,
    marginBottom: spacing.md,
  },
  heroSubtitle: {
    ...typography.body,
    color: theme.textSecondary,
    lineHeight: 24,
  },
  requirementsCard: {
    backgroundColor: theme.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: theme.textSecondary,
    marginBottom: spacing.md,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  requirementText: {
    ...typography.body,
    color: theme.textPrimary,
    flex: 1,
  },
  formCard: {
    backgroundColor: theme.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  formRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  formGroupHalf: {
    flex: 1,
  },
  label: {
    ...typography.label,
    color: theme.textSecondary,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: theme.textPrimary,
    fontSize: 15,
  },
  textArea: {
    minHeight: 100,
    paddingTop: spacing.md,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  submitButtonPressed: {
    opacity: 0.8,
  },
  submitButtonText: {
    ...typography.cardTitle,
    color: theme.textPrimary,
  },
  disclaimer: {
    ...typography.bodySmall,
    color: theme.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});
