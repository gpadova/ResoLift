import { Redirect } from "expo-router";
import { storage } from "~/database/init-mmkv";

export default function Index() {
  const token = storage.getString("token");

  return <Redirect href={token ? "/(public)" : "/(auth)/(tabs)"} />;
}
