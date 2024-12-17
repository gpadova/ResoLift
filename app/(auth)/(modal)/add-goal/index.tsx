import { z } from "zod";
import {
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "~/components/nativewindui/Text";
import { useForm, Controller } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "~/components/ui/select";
import { db } from "~/database/init-drizzle";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FullWindowOverlay } from "react-native-screens";
import React, { useState } from "react";
import { PortalHost } from "@rn-primitives/portal";
import { Checkbox } from "~/components/ui/checkbox";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  addGoalSchema,
  addGoalSchemaDefaultValues,
} from "~/utils/schemas/addGoalSchema";
import { goal } from "~/database/schema";
import { Option } from "@rn-primitives/select";
import { DAYS_OF_THE_WEEK } from "~/lib/consts";
import { useRouter } from "expo-router";

const WindowOverlay =
  Platform.OS === "ios" ? FullWindowOverlay : React.Fragment;
const CUSTOM_PORTAL_HOST_NAME = "add-goal-portal";
const LABEL_CLASS = "";

export default function AddGoal() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Option>(
    {} as Option
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addGoalSchema),
    defaultValues: addGoalSchemaDefaultValues,
  });
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 16,
    right: 16,
  };

  const onSubmit = async (data: z.infer<typeof addGoalSchema>) => {
    console.log(data);
    try {
      const query = await db.insert(goal).values({
        title: data.name,
        description: data.description,
        target: Number(data.target),
        reminder: data.reminder,
        unit: data.unit,
        completionDate: data.completionDate,
        categoryId: selectedCategory?.value,
      });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  const { data: categories } = useLiveQuery(db.query.goalCategory.findMany());

  return (
    <>
      <ScrollView className="bg-white dark:bg-background px-4 py-6 space-y-4 gap-6 pb-32">
        <View className="gap-2 mb-4">
          <Label className={LABEL_CLASS}>Name</Label>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-500">{errors.name.message}</Text>
          )}
        </View>
        <View className="gap-2 mb-4">
          <Label className={LABEL_CLASS}>Description</Label>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Textarea
                placeholder="Name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </View>
        <View className="gap-4 flex-row justify-between mb-4">
          <View className="flex-1 gap-2">
            <Label className={LABEL_CLASS}>Target</Label>
            <Controller
              control={control}
              name="target"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Target"
                  keyboardType="numeric"
                  value={value.toString()}
                  onChangeText={(e) => onChange(Number(e))}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.target && (
              <Text className="text-red-500">{errors.target.message}</Text>
            )}
          </View>
          <View className="flex-1 gap-2">
            <Label className={LABEL_CLASS}>Unit</Label>
            <Controller
              control={control}
              name="unit"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Unit"
                  keyboardType="default"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.unit && (
              <Text className="text-red-500">{errors.unit.message}</Text>
            )}
          </View>
        </View>
        <View className="gap-2 mb-4">
          <Label className={LABEL_CLASS}>Category</Label>
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  className="w-full"
                  onValueChange={(newValue) => {
                    setSelectedCategory(newValue);
                  }}
                  value={selectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue
                      className="text-foreground text-sm native:text-lg"
                      placeholder="Select a category"
                    />
                  </SelectTrigger>
                  <SelectContent
                    insets={contentInsets}
                    className="w-full"
                    portalHost={CUSTOM_PORTAL_HOST_NAME}
                  >
                    <SelectGroup>
                      {categories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                          label={category.name ?? ""}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />
          {errors.category && (
            <Text className="text-red-500">{errors.category.message}</Text>
          )}
        </View>
        <View className="mb-4">
          <Label className={`${LABEL_CLASS} mb-3`}>Days of the week</Label>
          <View className="flex-row gap-2">
            {DAYS_OF_THE_WEEK.map((day) => {
              const fieldName = `days.${day.toLowerCase()}` as
                | "days.monday"
                | "days.tuesday"
                | "days.wednesday"
                | "days.thursday"
                | "days.friday"
                | "days.saturday"
                | "days.sunday";
              return (
                <View
                  key={day}
                  className="flex-1 flex-col justify-center items-center gap-1"
                >
                  <Text>{day.slice(0, 3)}</Text>
                  <Controller
                    control={control}
                    name={fieldName}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox checked={!!value} onCheckedChange={onChange} />
                    )}
                  />
                </View>
              );
            })}
          </View>
        </View>
        <View className="mb-4">
          <View className="flex-row justify-between items-center my-4">
            <Label className={LABEL_CLASS}>Completion Date</Label>
            <Controller
              control={control}
              name="completionDate"
              render={({ field: { onChange, value } }) => {
                return (
                  <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    onChange={(_, selectedDate) => {
                      onChange(selectedDate);
                    }}
                    mode="date"
                    display="default"
                  />
                );
              }}
            />
          </View>
          {errors.completionDate && (
            <Text className="text-red-500">
              {errors.completionDate.message}
            </Text>
          )}
        </View>
        <View className="flex-1 flex-row justify-between mt-4">
          <Label className={LABEL_CLASS}>Reminder</Label>
          <View className="w-20 flex-row justify-end">
            <Controller
              control={control}
              name="reminder"
              render={({ field: { onChange, value } }) => (
                <Switch
                  checked={!!value}
                  onCheckedChange={onChange}
                  className="max-w-20"
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View
        className="p-6 bg-background"
        style={{ paddingBottom: insets.bottom }}
      >
        <Button className="w-full" onPress={handleSubmit(onSubmit)}>
          <Text className="text-primary-foreground font-medium">
            Start Tracking
          </Text>
        </Button>
      </View>
      <WindowOverlay>
        <PortalHost name={CUSTOM_PORTAL_HOST_NAME} />
      </WindowOverlay>
    </>
  );
}
