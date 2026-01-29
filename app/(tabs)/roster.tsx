import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';
import { wrestlers, Wrestler } from '../../services/mockData';

const WrestlerCard = ({ wrestler, index }: { wrestler: Wrestler; index: number }) => {
  const router = useRouter();

  return (
    <Animated.View 
      entering={FadeInUp.delay(index * 100).duration(400)}
      style={styles.cardContainer}
    >
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
        onPress={() => router.push(`/wrestler/${wrestler.id}`)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={wrestler.image}
            style={styles.wrestlerImage}
            contentFit="cover"
          />
          {wrestler.isChampion && (
            <View style={styles.championBadge}>
              <MaterialIcons name="emoji-events" size={12} color="#FFD700" />
            </View>
          )}
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.wrestlerName}>{wrestler.name}</Text>
          <Text style={styles.wrestlerRole}>{wrestler.role}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default function RosterScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWrestlers = wrestlers.filter(wrestler =>
    wrestler.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wrestler.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>ROSTER</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color={theme.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={theme.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Wrestler Grid */}
      <FlashList
        data={filteredWrestlers}
        renderItem={({ item, index }) => (
          <WrestlerCard wrestler={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        estimatedItemSize={220}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    color: theme.textPrimary,
    fontSize: 14,
  },
  cardContainer: {
    flex: 1,
    padding: spacing.sm,
  },
  card: {
    backgroundColor: theme.cardBackground,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: theme.cardBorder,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    position: 'relative',
  },
  wrestlerImage: {
    width: '100%',
    aspectRatio: 4 / 5,
  },
  championBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: spacing.xs,
    borderRadius: borderRadius.full,
  },
  cardInfo: {
    padding: spacing.md,
    alignItems: 'center',
  },
  wrestlerName: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    marginBottom: spacing.xs,
  },
  wrestlerRole: {
    ...typography.cardSubtitle,
    color: theme.primary,
  },
});
