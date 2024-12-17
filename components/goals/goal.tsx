import { Goal as GoalType } from "~/database/schema";
import { Text } from "~/components/ui/text";
import { Pressable, View } from "react-native";
import { Progress } from "../ui/progress";
import { useRouter } from "expo-router";

export function Goal({ goal }: { goal: GoalType }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push(`/goals/${goal.id}`);
      }}
    >
      <View className="flex-1 flex-column gap-2 w-full">
        <Text className="text-lg font-bold">{goal.title}</Text>
        <View className="w-full flex-row items-center gap-2">
          <Progress value={20} max={100} className="w-[95%]" />
        </View>
        <View className="flex-row items-center justify-between pr-2">
          <Text className="text-md text-muted-foreground">
            {goal.target} {goal.unit?.toLowerCase()} left
          </Text>
          <Text className="text-md text-muted-foreground">
            {goal.completionDate?.toLocaleDateString()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
