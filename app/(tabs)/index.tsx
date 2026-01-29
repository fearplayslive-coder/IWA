import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme, typography, spacing } from '../../constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const CTAButton = ({ 
    title, 
    onPress, 
    delay 
  }: { 
    title: string; 
    onPress: () => void; 
    delay: number;
  }) => (
    <Animated.View entering={FadeInDown.delay(delay).duration(600)}>
      <Pressable
        style={({ pressed }) => [
          styles.ctaButton,
          pressed && styles.ctaButtonPressed,
        ]}
        onPress={onPress}
      >
        <Text style={styles.ctaButtonText}>{title}</Text>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Background Hero Image */}
      <Image
        source={require('../../assets/images/hero-bg.jpg')}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
      />
      
      {/* Gradient Overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top Bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Pressable style={styles.iconButton}>
          <MaterialIcons name="search" size={24} color={theme.textPrimary} />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <MaterialIcons name="person-outline" size={24} color={theme.textPrimary} />
        </Pressable>
      </View>

      {/* Main Content */}
      <View style={[styles.content, { paddingBottom: insets.bottom + 100 }]}>
        {/* Logo/Title Section */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.titleSection}
        >
          <Text style={styles.subtitle}>INFERNO WRESTLING ALLIANCE</Text>
          <Text style={styles.title}>WHERE LEGENDS</Text>
          <Text style={styles.title}>ARE FORGED</Text>
        </Animated.View>

        {/* CTA Buttons */}
        <View style={styles.ctaContainer}>
          <CTAButton 
            title="ROSTER" 
            onPress={() => router.push('/roster')} 
            delay={300}
          />
          <CTAButton 
            title="EVENTS" 
            onPress={() => router.push('/events')} 
            delay={400}
          />
          <CTAButton 
            title="WATCH NOW" 
            onPress={() => router.push('/events')} 
            delay={500}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xl,
  },
  titleSection: {
    marginBottom: spacing.xxl,
  },
  subtitle: {
    ...typography.heroSubtitle,
    color: theme.primary,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.heroTitle,
    color: theme.textPrimary,
    lineHeight: 48,
  },
  ctaContainer: {
    gap: spacing.md,
  },
  ctaButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.primary,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderRadius: 4,
  },
  ctaButtonPressed: {
    backgroundColor: theme.primary,
  },
  ctaButtonText: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    fontSize: 18,
  },
});
