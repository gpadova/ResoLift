import { Text } from "~/components/nativewindui/Text";
import { SafeAreaView, View } from "react-native";
import { db } from "~/database/init-drizzle";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { FlashList } from "@shopify/flash-list";
import { Separator } from "~/components/ui/separator";
import { Goal } from "~/components/goals/goal";
import { Button } from "~/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "~/theme/colors";

export default function Goals() {
  const { data: goals } = useLiveQuery(db.query.goal.findMany());
  return (
    <>
      <SafeAreaView className="flex-1">
        <FlashList
          data={goals}
          className="px-2"
          keyExtractor={(item) => item.id}
          estimatedItemSize={100}
          ListHeaderComponent={() => (
            <View className="flex-row justify-between items-center pb-6">
              <Text className="text-2xl font-bold">All Goals</Text>
              <Button variant="ghost">
                <Ionicons
                  name="settings-outline"
                  size={24}
                  color={COLORS.light.primary}
                />
              </Button>
            </View>
          )}
          ListEmptyComponent={<Text>No goals found</Text>}
          ItemSeparatorComponent={() => <Separator className="my-4" />}
          renderItem={({ item }) => <Goal goal={item} />}
        />
      </SafeAreaView>
    </>
  );
}
