import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';

interface SettingsItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle?: string;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
  danger?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  subtitle,
  hasSwitch,
  switchValue,
  onSwitchChange,
  onPress,
  danger,
}: SettingsItemProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.settingsItem,
      pressed && !hasSwitch && styles.settingsItemPressed,
    ]}
    onPress={onPress}
    disabled={hasSwitch}
  >
    <View style={[styles.iconContainer, danger && styles.iconContainerDanger]}>
      <MaterialIcons
        name={icon}
        size={22}
        color={danger ? theme.error : theme.primary}
      />
    </View>
    <View style={styles.settingsItemContent}>
      <Text style={[styles.settingsItemTitle, danger && styles.dangerText]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>
      )}
    </View>
    {hasSwitch ? (
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        trackColor={{ false: theme.border, true: theme.primary }}
        thumbColor={theme.textPrimary}
      />
    ) : (
      <MaterialIcons
        name="chevron-right"
        size={24}
        color={theme.textMuted}
      />
    )}
  </Pressable>
);

const SettingsSection = ({
  title,
  children,
  delay,
}: {
  title: string;
  children: React.ReactNode;
  delay: number;
}) => (
  <Animated.View 
    entering={FadeInUp.delay(delay).duration(400)}
    style={styles.section}
  >
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </Animated.View>
);

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(true);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>PROFILE</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <Animated.View 
          entering={FadeInUp.delay(100).duration(400)}
          style={styles.profileCard}
        >
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={40} color={theme.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>IWA Fan</Text>
            <Text style={styles.profileEmail}>Sign in to access all features</Text>
          </View>
          <Pressable style={styles.signInButton}>
            <Text style={styles.signInButtonText}>SIGN IN</Text>
          </Pressable>
        </Animated.View>

        {/* Preferences */}
        <SettingsSection title="PREFERENCES" delay={200}>
          <SettingsItem
            icon="notifications"
            title="Push Notifications"
            subtitle="Get alerts for new events"
            hasSwitch
            switchValue={notifications}
            onSwitchChange={setNotifications}
          />
          <SettingsItem
            icon="dark-mode"
            title="Dark Mode"
            subtitle="Always on"
            hasSwitch
            switchValue={darkMode}
            onSwitchChange={setDarkMode}
          />
          <SettingsItem
            icon="language"
            title="Language"
            subtitle="English"
            onPress={() => {}}
          />
        </SettingsSection>

        {/* Join IWA */}
        <SettingsSection title="JOIN IWA" delay={300}>
          <Pressable 
            style={styles.joinButton}
            onPress={() => router.push('/join')}
          >
            <MaterialIcons name="sports-kabaddi" size={32} color={theme.primary} />
            <View style={styles.joinContent}>
              <Text style={styles.joinTitle}>BECOME A WRESTLER</Text>
              <Text style={styles.joinSubtitle}>Apply to join the IWA roster</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={24} color={theme.primary} />
          </Pressable>
        </SettingsSection>

        {/* Content */}
        <SettingsSection title="CONTENT" delay={400}>
          <SettingsItem
            icon="star"
            title="Favorite Wrestlers"
            onPress={() => {}}
          />
          <SettingsItem
            icon="history"
            title="Watch History"
            onPress={() => {}}
          />
          <SettingsItem
            icon="bookmark"
            title="Saved Articles"
            onPress={() => {}}
          />
        </SettingsSection>

        {/* Support */}
        <SettingsSection title="SUPPORT" delay={500}>
          <SettingsItem
            icon="help"
            title="Help & FAQ"
            onPress={() => {}}
          />
          <SettingsItem
            icon="mail"
            title="Contact Us"
            onPress={() => {}}
          />
          <SettingsItem
            icon="info"
            title="About IWA"
            subtitle="Version 1.0.0"
            onPress={() => {}}
          />
        </SettingsSection>

        {/* Legal */}
        <SettingsSection title="LEGAL" delay={600}>
          <SettingsItem
            icon="description"
            title="Terms of Service"
            onPress={() => {}}
          />
          <SettingsItem
            icon="privacy-tip"
            title="Privacy Policy"
            onPress={() => {}}
          />
        </SettingsSection>

        {/* Danger Zone */}
        <SettingsSection title="ACCOUNT" delay={700}>
          <SettingsItem
            icon="logout"
            title="Sign Out"
            danger
            onPress={() => {}}
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  pageTitle: {
    ...typography.pageTitle,
    color: theme.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: theme.border,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.primary,
  },
  profileInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  profileName: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    marginBottom: spacing.xs,
  },
  profileEmail: {
    ...typography.bodySmall,
    color: theme.textSecondary,
  },
  signInButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  signInButtonText: {
    ...typography.badge,
    color: theme.textPrimary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.label,
    color: theme.textSecondary,
    marginBottom: spacing.md,
    paddingLeft: spacing.sm,
  },
  sectionContent: {
    backgroundColor: theme.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.border,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  settingsItemPressed: {
    backgroundColor: theme.surfaceElevated,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconContainerDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    ...typography.body,
    color: theme.textPrimary,
    fontWeight: '500',
  },
  settingsItemSubtitle: {
    ...typography.bodySmall,
    color: theme.textSecondary,
    marginTop: 2,
  },
  dangerText: {
    color: theme.error,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.primary,
    gap: spacing.md,
  },
  joinContent: {
    flex: 1,
  },
  joinTitle: {
    ...typography.cardTitle,
    color: theme.primary,
    marginBottom: spacing.xs,
  },
  joinSubtitle: {
    ...typography.bodySmall,
    color: theme.textSecondary,
  },
});
