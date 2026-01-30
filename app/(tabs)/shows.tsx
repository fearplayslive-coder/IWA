import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';
import { shows, Show, ShowMatch } from '../../services/mockData';

const MatchRating = ({ 
  match, 
  onRate 
}: { 
  match: ShowMatch; 
  onRate: (matchId: string, rating: number) => void;
}) => {
  const [userRating, setUserRating] = useState(0);

  const handleRate = (rating: number) => {
    setUserRating(rating);
    onRate(match.id, rating);
  };

  return (
    <View style={styles.matchItem}>
      <View style={styles.matchHeader}>
        <Text style={styles.matchTitle} numberOfLines={1}>{match.title}</Text>
        <View style={styles.ratingDisplay}>
          <MaterialIcons name="star" size={14} color="#F59E0B" />
          <Text style={styles.ratingText}>{match.rating.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({match.userRatings})</Text>
        </View>
      </View>
      
      <View style={styles.wrestlersList}>
        <Text style={styles.wrestlersText}>{match.wrestlers.join(' vs ')}</Text>
      </View>

      {/* User Rating */}
      <View style={styles.userRatingContainer}>
        <Text style={styles.rateLabel}>RATE THIS MATCH:</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable
              key={star}
              onPress={() => handleRate(star)}
              hitSlop={8}
            >
              <MaterialIcons
                name={star <= userRating ? 'star' : 'star-outline'}
                size={24}
                color={star <= userRating ? '#F59E0B' : theme.textMuted}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const ShowCard = ({ 
  show, 
  index,
  onRate,
}: { 
  show: Show; 
  index: number;
  onRate: (matchId: string, rating: number) => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Animated.View entering={FadeInUp.delay(index * 100).duration(400)}>
      <View style={styles.showCard}>
        {/* Thumbnail */}
        <Pressable onPress={() => setExpanded(!expanded)}>
          <View style={styles.thumbnailContainer}>
            <Image
              source={show.thumbnail}
              style={styles.thumbnail}
              contentFit="cover"
            />
            <View style={styles.playOverlay}>
              <MaterialIcons name="play-circle" size={64} color="rgba(255,255,255,0.9)" />
            </View>
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>{show.duration}</Text>
            </View>
          </View>
        </Pressable>

        {/* Show Info */}
        <View style={styles.showInfo}>
          <Text style={styles.showTitle}>{show.title}</Text>
          <Text style={styles.showSubtitle}>{show.subtitle}</Text>
          <Text style={styles.showDate}>{show.date}</Text>
        </View>

        {/* Matches */}
        <Pressable 
          style={styles.expandButton}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.expandButtonText}>
            {expanded ? 'HIDE MATCHES' : 'VIEW MATCHES & RATE'}
          </Text>
          <MaterialIcons 
            name={expanded ? 'expand-less' : 'expand-more'} 
            size={20} 
            color={theme.primary} 
          />
        </Pressable>

        {expanded && (
          <View style={styles.matchesContainer}>
            {show.matches.map((match) => (
              <MatchRating key={match.id} match={match} onRate={onRate} />
            ))}
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export default function ShowsScreen() {
  const insets = useSafeAreaInsets();

  const handleRateMatch = (matchId: string, rating: number) => {
    console.log(`Rated match ${matchId} with ${rating} stars`);
    // In real app: API call to save rating
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>SHOWS</Text>
        <Text style={styles.subtitle}>Full episodes & highlights</Text>
      </View>

      {/* Shows List */}
      <FlashList
        data={shows}
        renderItem={({ item, index }) => (
          <ShowCard show={item} index={index} onRate={handleRateMatch} />
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={300}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  pageTitle: {
    ...typography.pageTitle,
    color: theme.textPrimary,
  },
  subtitle: {
    ...typography.bodySmall,
    color: theme.textSecondary,
    marginTop: spacing.xs,
  },
  showCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.border,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
    height: 200,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  durationBadge: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  durationText: {
    ...typography.badge,
    color: theme.textPrimary,
  },
  showInfo: {
    padding: spacing.lg,
  },
  showTitle: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    marginBottom: spacing.xs,
  },
  showSubtitle: {
    ...typography.cardSubtitle,
    color: theme.primary,
    marginBottom: spacing.xs,
  },
  showDate: {
    ...typography.bodySmall,
    color: theme.textSecondary,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    gap: spacing.xs,
  },
  expandButtonText: {
    ...typography.badge,
    color: theme.primary,
  },
  matchesContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.border,
    backgroundColor: theme.surface,
  },
  matchItem: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  matchTitle: {
    ...typography.body,
    color: theme.textPrimary,
    fontWeight: '600',
    flex: 1,
    marginRight: spacing.md,
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingText: {
    ...typography.body,
    color: theme.textPrimary,
    fontWeight: '700',
  },
  ratingCount: {
    ...typography.bodySmall,
    color: theme.textMuted,
  },
  wrestlersList: {
    marginBottom: spacing.md,
  },
  wrestlersText: {
    ...typography.bodySmall,
    color: theme.textSecondary,
  },
  userRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  rateLabel: {
    ...typography.badge,
    color: theme.textSecondary,
  },
  starsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  separator: {
    height: spacing.lg,
  },
});
