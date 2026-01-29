import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';
import { news, NewsItem } from '../../services/mockData';

const NewsCard = ({ item, index }: { item: NewsItem; index: number }) => {
  const router = useRouter();

  const getCategoryColor = (category: string) => {
    switch (category.toUpperCase()) {
      case 'ANNOUNCEMENTS':
        return theme.primary;
      case 'BREAKING':
        return '#F59E0B';
      case 'RESULTS':
        return theme.success;
      default:
        return theme.primary;
    }
  };

  return (
    <Animated.View entering={FadeInRight.delay(index * 100).duration(400)}>
      <Pressable
        style={({ pressed }) => [
          styles.newsCard,
          pressed && styles.newsCardPressed,
        ]}
        onPress={() => router.push(`/news/${item.id}`)}
      >
        {/* Thumbnail */}
        <Image
          source={item.image}
          style={styles.thumbnail}
          contentFit="cover"
        />

        {/* Content */}
        <View style={styles.newsContent}>
          {/* Category Badge */}
          <View style={[
            styles.categoryBadge,
            { backgroundColor: getCategoryColor(item.category) }
          ]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>

          {/* Title */}
          <Text style={styles.newsTitle} numberOfLines={2}>
            {item.title}
          </Text>

          {/* Excerpt */}
          <Text style={styles.newsExcerpt} numberOfLines={2}>
            {item.excerpt}
          </Text>

          {/* Footer */}
          <View style={styles.newsFooter}>
            <Text style={styles.newsDate}>{item.date}</Text>
            <Text style={styles.readMore}>Read More</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default function NewsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>NEWS</Text>
      </View>

      {/* News List */}
      <FlashList
        data={news}
        renderItem={({ item, index }) => (
          <NewsCard item={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={140}
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
    paddingVertical: spacing.lg,
  },
  pageTitle: {
    ...typography.pageTitle,
    color: theme.textPrimary,
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: theme.cardBackground,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  newsCardPressed: {
    opacity: 0.8,
  },
  thumbnail: {
    width: 100,
    height: 120,
  },
  newsContent: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  categoryText: {
    ...typography.badge,
    color: theme.textPrimary,
  },
  newsTitle: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: spacing.xs,
  },
  newsExcerpt: {
    ...typography.bodySmall,
    color: theme.textSecondary,
    lineHeight: 16,
    marginBottom: spacing.sm,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsDate: {
    ...typography.bodySmall,
    color: theme.textMuted,
    fontSize: 11,
  },
  readMore: {
    ...typography.bodySmall,
    color: theme.primary,
    fontSize: 11,
  },
  separator: {
    height: spacing.md,
  },
});
