import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { theme, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { wrestlers } from '../../services/mockData';

const StatBox = ({ 
  label, 
  value, 
  delay 
}: { 
  label: string; 
  value: string; 
  delay: number;
}) => (
  <Animated.View 
    entering={FadeInUp.delay(delay).duration(400)}
    style={styles.statBox}
  >
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </Animated.View>
);

export default function WrestlerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const wrestler = wrestlers.find(w => w.id === id);

  if (!wrestler) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Wrestler not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={wrestler.image}
            style={styles.heroImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)', theme.background]}
            style={styles.heroGradient}
          />
          
          {/* Back Button */}
          <Pressable 
            style={[styles.backButton, { top: insets.top + 8 }]}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color={theme.textPrimary} />
          </Pressable>

          {/* Name Overlay */}
          <Animated.View 
            entering={FadeIn.delay(200).duration(400)}
            style={styles.nameOverlay}
          >
            {wrestler.isChampion && (
              <View style={styles.championBadge}>
                <MaterialIcons name="emoji-events" size={14} color="#FFD700" />
                <Text style={styles.championText}>CHAMPION</Text>
              </View>
            )}
            <Text style={styles.wrestlerName}>{wrestler.name}</Text>
            <Text style={styles.wrestlerNickname}>"{wrestler.nickname}"</Text>
          </Animated.View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Quick Stats */}
          <View style={styles.statsRow}>
            <StatBox label="HEIGHT" value={wrestler.height} delay={300} />
            <StatBox label="WEIGHT" value={wrestler.weight} delay={400} />
            <StatBox label="WINS" value={wrestler.wins.toString()} delay={500} />
            <StatBox label="LOSSES" value={wrestler.losses.toString()} delay={600} />
          </View>

          {/* Info Cards */}
          <Animated.View 
            entering={FadeInUp.delay(400).duration(400)}
            style={styles.infoCard}
          >
            <View style={styles.infoRow}>
              <MaterialIcons name="home" size={18} color={theme.primary} />
              <Text style={styles.infoLabel}>Hometown</Text>
              <Text style={styles.infoValue}>{wrestler.hometown}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <MaterialIcons name="flash-on" size={18} color={theme.primary} />
              <Text style={styles.infoLabel}>Finisher</Text>
              <Text style={styles.infoValue}>{wrestler.finisher}</Text>
            </View>
            {wrestler.championships && wrestler.championships.length > 0 && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <MaterialIcons name="emoji-events" size={18} color="#FFD700" />
                  <Text style={styles.infoLabel}>Title</Text>
                  <Text style={[styles.infoValue, { color: '#FFD700' }]}>
                    {wrestler.championships[0]}
                  </Text>
                </View>
              </>
            )}
          </Animated.View>

          {/* Bio */}
          <Animated.View 
            entering={FadeInUp.delay(500).duration(400)}
            style={styles.bioSection}
          >
            <Text style={styles.sectionTitle}>BIOGRAPHY</Text>
            <Text style={styles.bioText}>{wrestler.bio}</Text>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View 
            entering={FadeInUp.delay(600).duration(400)}
            style={styles.actionButtons}
          >
            <Pressable style={styles.primaryButton}>
              <MaterialIcons name="play-circle" size={20} color={theme.textPrimary} />
              <Text style={styles.primaryButtonText}>WATCH HIGHLIGHTS</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton}>
              <MaterialIcons name="star-outline" size={20} color={theme.primary} />
              <Text style={styles.secondaryButtonText}>ADD TO FAVORITES</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    height: 450,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  backButton: {
    position: 'absolute',
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  nameOverlay: {
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.lg,
    right: spacing.lg,
  },
  championBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  championText: {
    ...typography.badge,
    color: '#FFD700',
  },
  wrestlerName: {
    ...typography.heroTitle,
    color: theme.textPrimary,
    fontSize: 48,
  },
  wrestlerNickname: {
    ...typography.sectionHeader,
    color: theme.primary,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  content: {
    paddingHorizontal: spacing.lg,
    marginTop: -spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: theme.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  statValue: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.badge,
    color: theme.textSecondary,
  },
  infoCard: {
    backgroundColor: theme.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: theme.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  infoLabel: {
    ...typography.label,
    color: theme.textSecondary,
    width: 80,
  },
  infoValue: {
    ...typography.body,
    color: theme.textPrimary,
    flex: 1,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: theme.border,
    marginVertical: spacing.md,
  },
  bioSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: theme.textSecondary,
    marginBottom: spacing.md,
  },
  bioText: {
    ...typography.body,
    color: theme.textSecondary,
    lineHeight: 24,
  },
  actionButtons: {
    gap: spacing.md,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  primaryButtonText: {
    ...typography.cardTitle,
    color: theme.textPrimary,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: theme.primary,
    gap: spacing.sm,
  },
  secondaryButtonText: {
    ...typography.cardTitle,
    color: theme.primary,
  },
  errorText: {
    ...typography.body,
    color: theme.textSecondary,
    textAlign: 'center',
    marginTop: 100,
  },
});
