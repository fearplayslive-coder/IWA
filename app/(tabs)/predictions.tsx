import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';
import { predictions, polls, Prediction, Poll } from '../../services/mockData';

const PredictionCard = ({ 
  prediction, 
  index,
  onVote,
}: { 
  prediction: Prediction; 
  index: number;
  onVote: (predictionId: string, wrestler: 1 | 2) => void;
}) => {
  const [userVote, setUserVote] = useState<1 | 2 | null>(null);
  const totalVotes = prediction.wrestler1Votes + prediction.wrestler2Votes;
  const wrestler1Percentage = Math.round((prediction.wrestler1Votes / totalVotes) * 100);
  const wrestler2Percentage = 100 - wrestler1Percentage;

  const handleVote = (wrestler: 1 | 2) => {
    if (!prediction.isOpen) return;
    setUserVote(wrestler);
    onVote(prediction.id, wrestler);
  };

  return (
    <Animated.View entering={FadeInUp.delay(index * 100).duration(400)}>
      <View style={styles.predictionCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.matchTitle}>{prediction.matchTitle}</Text>
          <View style={[
            styles.statusBadge,
            !prediction.isOpen && styles.statusBadgeClosed,
          ]}>
            <Text style={[
              styles.statusText,
              !prediction.isOpen && styles.statusTextClosed,
            ]}>
              {prediction.isOpen ? 'OPEN' : 'CLOSED'}
            </Text>
          </View>
        </View>

        <Text style={styles.deadline}>Deadline: {prediction.deadline}</Text>

        {/* Wrestlers */}
        <View style={styles.versusContainer}>
          <Pressable
            style={[
              styles.wrestlerOption,
              userVote === 1 && styles.wrestlerOptionSelected,
              !prediction.isOpen && styles.wrestlerOptionDisabled,
            ]}
            onPress={() => handleVote(1)}
            disabled={!prediction.isOpen}
          >
            <Text style={[
              styles.wrestlerName,
              userVote === 1 && styles.wrestlerNameSelected,
            ]}>
              {prediction.wrestler1}
            </Text>
            <View style={styles.voteInfo}>
              <Text style={styles.percentage}>{wrestler1Percentage}%</Text>
              <Text style={styles.voteCount}>{prediction.wrestler1Votes.toLocaleString()} votes</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${wrestler1Percentage}%` },
              ]} />
            </View>
          </Pressable>

          <View style={styles.vsCircle}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          <Pressable
            style={[
              styles.wrestlerOption,
              userVote === 2 && styles.wrestlerOptionSelected,
              !prediction.isOpen && styles.wrestlerOptionDisabled,
            ]}
            onPress={() => handleVote(2)}
            disabled={!prediction.isOpen}
          >
            <Text style={[
              styles.wrestlerName,
              userVote === 2 && styles.wrestlerNameSelected,
            ]}>
              {prediction.wrestler2}
            </Text>
            <View style={styles.voteInfo}>
              <Text style={styles.percentage}>{wrestler2Percentage}%</Text>
              <Text style={styles.voteCount}>{prediction.wrestler2Votes.toLocaleString()} votes</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${wrestler2Percentage}%` },
              ]} />
            </View>
          </Pressable>
        </View>

        {userVote && prediction.isOpen && (
          <View style={styles.successMessage}>
            <MaterialIcons name="check-circle" size={16} color={theme.success} />
            <Text style={styles.successText}>Vote recorded!</Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const PollCard = ({ 
  poll, 
  index,
  onVote,
}: { 
  poll: Poll; 
  index: number;
  onVote: (pollId: string, optionId: string) => void;
}) => {
  const [userVote, setUserVote] = useState<string | null>(null);
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  const getTypeColor = () => {
    switch (poll.type) {
      case 'match-type': return '#F59E0B';
      case 'booking': return '#8B5CF6';
      default: return theme.primary;
    }
  };

  const handleVote = (optionId: string) => {
    if (!poll.isOpen) return;
    setUserVote(optionId);
    onVote(poll.id, optionId);
  };

  return (
    <Animated.View entering={FadeInUp.delay(index * 100).duration(400)}>
      <View style={styles.pollCard}>
        <View style={styles.cardHeader}>
          <View style={[styles.typeBadge, { backgroundColor: getTypeColor() }]}>
            <Text style={styles.typeText}>{poll.type.toUpperCase()}</Text>
          </View>
          <View style={[
            styles.statusBadge,
            !poll.isOpen && styles.statusBadgeClosed,
          ]}>
            <Text style={[
              styles.statusText,
              !poll.isOpen && styles.statusTextClosed,
            ]}>
              {poll.isOpen ? 'OPEN' : 'CLOSED'}
            </Text>
          </View>
        </View>

        <Text style={styles.pollQuestion}>{poll.question}</Text>
        <Text style={styles.deadline}>Deadline: {poll.deadline}</Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {poll.options.map((option) => {
            const percentage = Math.round((option.votes / totalVotes) * 100);
            const isSelected = userVote === option.id;

            return (
              <Pressable
                key={option.id}
                style={[
                  styles.pollOption,
                  isSelected && styles.pollOptionSelected,
                  !poll.isOpen && styles.pollOptionDisabled,
                ]}
                onPress={() => handleVote(option.id)}
                disabled={!poll.isOpen}
              >
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}>
                    {option.text}
                  </Text>
                  <View style={styles.optionStats}>
                    <Text style={styles.optionPercentage}>{percentage}%</Text>
                    <Text style={styles.optionVotes}>{option.votes.toLocaleString()}</Text>
                  </View>
                </View>
                <View style={styles.optionProgressBar}>
                  <View style={[
                    styles.optionProgressFill,
                    { width: `${percentage}%`, backgroundColor: getTypeColor() },
                  ]} />
                </View>
              </Pressable>
            );
          })}
        </View>

        {userVote && poll.isOpen && (
          <View style={styles.successMessage}>
            <MaterialIcons name="check-circle" size={16} color={theme.success} />
            <Text style={styles.successText}>Vote recorded!</Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export default function PredictionsScreen() {
  const insets = useSafeAreaInsets();

  const handleVotePrediction = (predictionId: string, wrestler: 1 | 2) => {
    console.log(`Voted for wrestler ${wrestler} in prediction ${predictionId}`);
    // In real app: API call to save vote
  };

  const handleVotePoll = (pollId: string, optionId: string) => {
    console.log(`Voted for option ${optionId} in poll ${pollId}`);
    // In real app: API call to save vote
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>PREDICTIONS</Text>
        <Text style={styles.subtitle}>Vote on matches & help book shows</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Match Predictions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MATCH PREDICTIONS</Text>
          {predictions.map((prediction, index) => (
            <PredictionCard
              key={prediction.id}
              prediction={prediction}
              index={index}
              onVote={handleVotePrediction}
            />
          ))}
        </View>

        {/* Polls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAN POLLS</Text>
          {polls.map((poll, index) => (
            <PollCard
              key={poll.id}
              poll={poll}
              index={index + predictions.length}
              onVote={handleVotePoll}
            />
          ))}
        </View>
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
  predictionCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  pollCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  matchTitle: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    flex: 1,
  },
  statusBadge: {
    backgroundColor: theme.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusBadgeClosed: {
    backgroundColor: theme.textMuted,
  },
  statusText: {
    ...typography.badge,
    color: theme.textPrimary,
  },
  statusTextClosed: {
    color: theme.background,
  },
  deadline: {
    ...typography.bodySmall,
    color: theme.textSecondary,
    marginBottom: spacing.lg,
  },
  versusContainer: {
    gap: spacing.md,
  },
  wrestlerOption: {
    padding: spacing.md,
    backgroundColor: theme.surface,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: theme.border,
  },
  wrestlerOptionSelected: {
    borderColor: theme.primary,
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
  },
  wrestlerOptionDisabled: {
    opacity: 0.6,
  },
  wrestlerName: {
    ...typography.cardTitle,
    color: theme.textPrimary,
    marginBottom: spacing.sm,
  },
  wrestlerNameSelected: {
    color: theme.primary,
  },
  voteInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  percentage: {
    ...typography.sectionHeader,
    color: theme.textPrimary,
    fontSize: 20,
  },
  voteCount: {
    ...typography.bodySmall,
    color: theme.textSecondary,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.primary,
  },
  vsCircle: {
    alignSelf: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.surface,
    borderWidth: 2,
    borderColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    ...typography.cardTitle,
    color: theme.primary,
  },
  typeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  typeText: {
    ...typography.badge,
    color: theme.textPrimary,
  },
  pollQuestion: {
    ...typography.body,
    color: theme.textPrimary,
    fontWeight: '600',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  optionsContainer: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  pollOption: {
    padding: spacing.md,
    backgroundColor: theme.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: theme.border,
  },
  pollOptionSelected: {
    borderColor: theme.primary,
    borderWidth: 2,
  },
  pollOptionDisabled: {
    opacity: 0.6,
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  optionText: {
    ...typography.body,
    color: theme.textPrimary,
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: '600',
  },
  optionStats: {
    alignItems: 'flex-end',
    marginLeft: spacing.md,
  },
  optionPercentage: {
    ...typography.body,
    color: theme.textPrimary,
    fontWeight: '700',
  },
  optionVotes: {
    ...typography.bodySmall,
    color: theme.textMuted,
    fontSize: 11,
  },
  optionProgressBar: {
    height: 4,
    backgroundColor: theme.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  optionProgressFill: {
    height: '100%',
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    gap: spacing.xs,
  },
  successText: {
    ...typography.body,
    color: theme.success,
  },
});
