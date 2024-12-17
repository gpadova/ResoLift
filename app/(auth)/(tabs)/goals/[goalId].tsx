import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text } from "~/components/nativewindui/Text";

export default function Goal() {
  const { goalId } = useLocalSearchParams();
  return (
    <>
      <SafeAreaView className="flex-1">
        <Text>{goalId}</Text>
      </SafeAreaView>
    </>
  );
}
