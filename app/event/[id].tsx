import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';
import { events, wrestlers } from '../../services/mockData';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  // Sample match card data
  const matches = [
    {
      id: '1',
      type: 'MAIN EVENT',
      title: 'IWA HEAVYWEIGHT CHAMPIONSHIP',
      wrestler1: wrestlers[0], // Blaze
      wrestler2: wrestlers[1], // Titan
    },
    {
      id: '2',
      type: 'TAG TEAM MATCH',
      title: 'TAG TEAM CHAMPIONSHIP',
      wrestler1: wrestlers[2], // Viper
      wrestler2: wrestlers[3], // Sarrak
    },
    {
      id: '3',
      type: 'SINGLES MATCH',
      title: 'NUMBER ONE CONTENDER',
      wrestler1: wrestlers[4], // Gardson
      wrestler2: wrestlers[5], // Phoenix
    },
  ];

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
            source={event.image}
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

          {/* Event Info Overlay */}
          <Animated.View 
            entering={FadeIn.delay(200).duration(400)}
            style={styles.eventOverlay}
          >
            <View style={styles.dateBox}>
              <Text style={styles.dateMonth}>{event.month}</Text>
              <Text style={styles.dateDay}>{event.day}</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
              <View style={styles.locationRow}>
                <MaterialIcons name="location-on" size={14} color={theme.primary} />
                <Text style={styles.locationText}>{event.location}</Text>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Action Buttons */}
          <Animated.View 
            entering={FadeInUp.delay(300).duration(400)}
            style={styles.actionRow}
          >
            {!event.isPast ? (
              <>
                <Pressable style={styles.primaryButton}>
                  <MaterialIcons name="confirmation-number" size={20} color={theme.textPrimary} />
                  <Text style={styles.primaryButtonText}>GET TICKETS</Text>
                </Pressable>
                <Pressable style={styles.iconButton}>
                  <MaterialIcons name="share" size={20} color={theme.primary} />
                </Pressable>
                <Pressable style={styles.iconButton}>
                  <MaterialIcons name="notifications-none" size={20} color={theme.primary} />
                </Pressable>
              </>
            ) : (
              <>
                <Pressable style={styles.primaryButton}>
                  <MaterialIcons name="play-circle" size={20} color={theme.textPrimary} />
                  <Text style={styles.primaryButtonText}>WATCH REPLAY</Text>
                </Pressable>
                <Pressable style={styles.iconButton}>
                  <MaterialIcons name="share" size={20} color={theme.primary} />
                </Pressable>
              </>
            )}
          </Animated.View>

          {/* Match Card Section */}
          <Animated.View entering={FadeInUp.delay(400).duration(400)}>
            <Text style={styles.sectionTitle}>MATCH CARD</Text>
            
            {matches.map((match, index) => (
              <Animated.View 
                key={match.id}
                entering={FadeInUp.delay(500 + index * 100).duration(400)}
                style={styles.matchCard}
              >
                <View style={styles.matchHeader}>
                  <Text style={styles.matchType}>{match.type}</Text>
                  <Text style={styles.matchTitle}>{match.title}</Text>
                </View>
                
                <View style={styles.versusRow}>
                  {/* Wrestler 1 */}
                  <View style={styles.wrestlerContainer}>
                    <Image
                      source={match.wrestler1.image}
                      style={styles.wrestlerThumb}
                      contentFit="cover"
                    />
                    <Text style={styles.wrestlerName}>{match.wrestler1.name}</Text>
                  </View>

                  {/* VS */}
                  <View style={styles.vsContainer}>
                    <Text style={styles.vsText}>VS</Text>
                  </View>

                  {/* Wrestler 2 */}
                  <View style={styles.wrestlerContainer}>
                    <Image
                      source={match.wrestler2.image}
                      style={styles.wrestlerThumb}
                      contentFit="cover"
                    />
                    <Text style={styles.wrestlerName}>{match.wrestler2.name}</Text>
                  </View>
                </View>
              </Animated.View>
            ))}
          </Animated.View>

          {/* Venue Info */}
          <Animated.View 
            entering={FadeInUp.delay(800).duration(400)}
            style={styles.venueCard}
          >
            <Text style={styles.sectionTitle}>VENUE</Text>
            <View style={styles.venueInfo}>
              <MaterialIcons name="stadium" size={40} color={theme.primary} />
              <View style={styles.venueDetails}>
                <Text style={styles.venueName}>{event.venue}</Text>
                <Text style={styles.venueAddress}>{event.location}</Text>
              </View>
              <Pressable style={styles.mapButton}>
                <MaterialIcons name="map" size={20} color={theme.primary} />
              </Pressable>
            </View>
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
    height: 280,
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
  eventOverlay: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.md,
  },
  dateBox: {
    backgroundColor: theme.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  dateMonth: {
    ...typography.badge,
    color: theme.textPrimary,
  },
  dateDay: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    fontSize: 24,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    ...typography.cardSubtitle,
    color: theme.textSecondary,
  },
  eventSubtitle: {
    ...typography.sectionHeader,
    color: theme.textPrimary,
    marginBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  locationText: {
    ...typography.bodySmall,
    color: theme.textSecondary,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  primaryButtonText: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    fontSize: 14,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    ...typography.label,
    color: theme.textSecondary,
    marginBottom: spacing.md,
  },
  matchCard: {
    backgroundColor: theme.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: theme.border,
  },
  matchHeader: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  matchType: {
    ...typography.badge,
    color: theme.primary,
    marginBottom: spacing.xs,
  },
  matchTitle: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    fontSize: 14,
  },
  versusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrestlerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  wrestlerThumb: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.cardBorder,
    marginBottom: spacing.sm,
  },
  wrestlerName: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    fontSize: 12,
  },
  vsContainer: {
    paddingHorizontal: spacing.md,
  },
  vsText: {
    ...typography.sectionHeader,
    color: theme.primary,
    fontSize: 24,
  },
  venueCard: {
    marginTop: spacing.lg,
  },
  venueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.border,
    gap: spacing.md,
  },
  venueDetails: {
    flex: 1,
  },
  venueName: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    marginBottom: spacing.xs,
  },
  venueAddress: {
    ...typography.bodySmall,
    color: theme.textSecondary,
  },
  mapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    ...typography.body,
    color: theme.textSecondary,
    textAlign: 'center',
    marginTop: 100,
  },
});
