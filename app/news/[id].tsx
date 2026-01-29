import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';
import { news, NewsItem } from '../../services/mockData';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const article = news.find(n => n.id === id);

  if (!article) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Article not found</Text>
      </View>
    );
  }

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

  // Related articles (exclude current)
  const relatedArticles = news.filter(n => n.id !== id).slice(0, 3);

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
            source={article.image}
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

          {/* Share Button */}
          <Pressable 
            style={[styles.shareButton, { top: insets.top + 8 }]}
          >
            <MaterialIcons name="share" size={24} color={theme.textPrimary} />
          </Pressable>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Category & Date */}
          <Animated.View 
            entering={FadeIn.delay(200).duration(400)}
            style={styles.metaRow}
          >
            <View style={[
              styles.categoryBadge,
              { backgroundColor: getCategoryColor(article.category) }
            ]}>
              <Text style={styles.categoryText}>{article.category}</Text>
            </View>
            <Text style={styles.dateText}>{article.date}</Text>
          </Animated.View>

          {/* Title */}
          <Animated.Text 
            entering={FadeInUp.delay(300).duration(400)}
            style={styles.title}
          >
            {article.title}
          </Animated.Text>

          {/* Article Content */}
          <Animated.View entering={FadeInUp.delay(400).duration(400)}>
            <Text style={styles.articleText}>{article.content}</Text>
            
            {/* Extended content placeholder */}
            <Text style={styles.articleText}>
              The crowd of over 15,000 fans erupted as the final bell rang, marking yet another 
              chapter in what has become one of the most intense rivalries in IWA history. Both 
              competitors gave everything they had, leaving it all in the ring.
            </Text>
            
            <Text style={styles.articleText}>
              After the match, Blaze addressed the crowd, declaring that he would defend his 
              championship against anyone who dares to challenge him. "This is my ring, my 
              championship, and my era," Blaze proclaimed to thunderous cheers and boos alike.
            </Text>

            <Text style={styles.articleText}>
              IWA officials have confirmed that the next championship defense will take place at 
              next month's "Inferno Rising" event, though the challenger has yet to be announced. 
              Speculation is rampant among fans and analysts alike.
            </Text>
          </Animated.View>

          {/* Social Actions */}
          <Animated.View 
            entering={FadeInUp.delay(500).duration(400)}
            style={styles.socialRow}
          >
            <Pressable style={styles.socialButton}>
              <MaterialIcons name="thumb-up" size={20} color={theme.textSecondary} />
              <Text style={styles.socialText}>Like</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <MaterialIcons name="chat-bubble-outline" size={20} color={theme.textSecondary} />
              <Text style={styles.socialText}>Comment</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <MaterialIcons name="bookmark-border" size={20} color={theme.textSecondary} />
              <Text style={styles.socialText}>Save</Text>
            </Pressable>
          </Animated.View>

          {/* Related Articles */}
          <Animated.View entering={FadeInUp.delay(600).duration(400)}>
            <Text style={styles.sectionTitle}>RELATED ARTICLES</Text>
            
            {relatedArticles.map((relatedArticle, index) => (
              <Pressable
                key={relatedArticle.id}
                style={({ pressed }) => [
                  styles.relatedCard,
                  pressed && styles.relatedCardPressed,
                ]}
                onPress={() => router.replace(`/news/${relatedArticle.id}`)}
              >
                <Image
                  source={relatedArticle.image}
                  style={styles.relatedImage}
                  contentFit="cover"
                />
                <View style={styles.relatedContent}>
                  <Text style={styles.relatedTitle} numberOfLines={2}>
                    {relatedArticle.title}
                  </Text>
                  <Text style={styles.relatedDate}>{relatedArticle.date}</Text>
                </View>
              </Pressable>
            ))}
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
  shareButton: {
    position: 'absolute',
    right: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  content: {
    paddingHorizontal: spacing.lg,
    marginTop: -spacing.xl,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  categoryBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    ...typography.badge,
    color: theme.textPrimary,
  },
  dateText: {
    ...typography.bodySmall,
    color: theme.textSecondary,
  },
  title: {
    ...typography.pageTitle,
    color: theme.textPrimary,
    fontSize: 24,
    lineHeight: 32,
    marginBottom: spacing.xl,
  },
  articleText: {
    ...typography.body,
    color: theme.textSecondary,
    lineHeight: 26,
    marginBottom: spacing.lg,
  },
  socialRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.border,
    paddingVertical: spacing.md,
    marginVertical: spacing.xl,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  socialText: {
    ...typography.bodySmall,
    color: theme.textSecondary,
  },
  sectionTitle: {
    ...typography.label,
    color: theme.textSecondary,
    marginBottom: spacing.md,
  },
  relatedCard: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  relatedCardPressed: {
    opacity: 0.8,
  },
  relatedImage: {
    width: 100,
    height: 80,
  },
  relatedContent: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  relatedTitle: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: spacing.xs,
  },
  relatedDate: {
    ...typography.bodySmall,
    color: theme.textMuted,
    fontSize: 11,
  },
  errorText: {
    ...typography.body,
    color: theme.textSecondary,
    textAlign: 'center',
    marginTop: 100,
  },
});
