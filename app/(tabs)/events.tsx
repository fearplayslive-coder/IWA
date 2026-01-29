import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { theme, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { events, Event } from '../../services/mockData';

const EventCard = ({ event, index }: { event: Event; index: number }) => {
  const router = useRouter();

  return (
    <Animated.View entering={FadeInUp.delay(index * 100).duration(400)}>
      <Pressable
        style={({ pressed }) => [
          styles.eventCard,
          pressed && styles.eventCardPressed,
        ]}
        onPress={() => router.push(`/event/${event.id}`)}
      >
        {/* Event Image */}
        <View style={styles.eventImageContainer}>
          <Image
            source={event.image}
            style={styles.eventImage}
            contentFit="cover"
          />
          {/* Gradient Overlay */}
          <View style={styles.eventOverlay} />
          {/* Event Title on Image */}
          <View style={styles.eventTitleOverlay}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
          </View>
        </View>

        {/* Event Info Bar */}
        <View style={styles.eventInfoBar}>
          {/* Date */}
          <View style={styles.dateContainer}>
            <Text style={styles.dateMonth}>{event.month}</Text>
            <Text style={styles.dateDay}>{event.day}</Text>
          </View>

          {/* Location */}
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={14} color={theme.primary} />
            <Text style={styles.locationText}>{event.location}</Text>
          </View>

          {/* Action Button */}
          <Pressable 
            style={[
              styles.actionButton,
              event.isPast && styles.actionButtonPast,
            ]}
          >
            <Text style={[
              styles.actionButtonText,
              event.isPast && styles.actionButtonTextPast,
            ]}>
              {event.isPast ? 'RESULTS' : 'TICKETS'}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default function EventsScreen() {
  const insets = useSafeAreaInsets();

  const upcomingEvents = events.filter(e => !e.isPast);
  const pastEvents = events.filter(e => e.isPast);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>EVENTS</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>UPCOMING</Text>
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </View>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PAST EVENTS</Text>
            {pastEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                index={index + upcomingEvents.length} 
              />
            ))}
          </View>
        )}
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
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.label,
    color: theme.textSecondary,
    marginBottom: spacing.md,
  },
  eventCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: theme.cardBorder,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  eventCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  eventImageContainer: {
    position: 'relative',
    height: 140,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  eventOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  eventTitleOverlay: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    right: spacing.md,
  },
  eventTitle: {
    ...typography.cardSubtitle,
    color: theme.textSecondary,
    marginBottom: spacing.xs,
  },
  eventSubtitle: {
    ...typography.sectionHeader,
    color: theme.textPrimary,
  },
  eventInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: theme.surface,
  },
  dateContainer: {
    backgroundColor: theme.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    marginRight: spacing.md,
  },
  dateMonth: {
    ...typography.badge,
    color: theme.primary,
  },
  dateDay: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    fontSize: 18,
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  locationText: {
    ...typography.bodySmall,
    color: theme.textSecondary,
    flex: 1,
  },
  actionButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  actionButtonPast: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.textSecondary,
  },
  actionButtonText: {
    ...typography.badge,
    color: theme.textPrimary,
  },
  actionButtonTextPast: {
    color: theme.textSecondary,
  },
});
