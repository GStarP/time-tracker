import { View, StyleSheet, Text, Pressable } from "react-native";
import { Matter } from "../../data/matter";
import { OnPressCallback } from "../../ui";
import IconButton from "../../ui/IconButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { icon } from "../../modules/icon";
import { color } from "../../modules/color";
import { COLOR_HINT, COLOR_WHITE } from "../../styles/const";
import React from "react";

interface MatterItemProps extends React.ComponentProps<typeof View> {
  matter: Matter;
  trackedTime?: number;
  onStartPress?: OnPressCallback;
  onLongPress?: () => void;
}
const DEFAULT_PROPS = {
  trackedTime: 0,
};

function MatterItem(props: MatterItemProps) {
  const {
    style,
    matter,
    trackedTime = DEFAULT_PROPS.trackedTime,
    onStartPress,
    onLongPress,
  } = props;

  const iconName = icon(matter.matterIcon) as any;
  const iconColor = color(matter.matterColor);

  return (
    <Pressable style={[styles.container, style]} onLongPress={onLongPress}>
      <Ionicons
        name={iconName}
        color={iconColor}
        size={24}
        style={styles.left}
      />
      <View>
        <Text style={styles.matterName}>{matter.matterName}</Text>
        {trackedTime > 0 ? (
          <Text style={styles.matterTrackedTime}></Text>
        ) : null}
      </View>
      <View style={styles.right}>
        {/* @TEST */}
        <Text>{matter.sortNum}</Text>
        <IconButton iconName="play-circle-outline" onPress={onStartPress} />
      </View>
    </Pressable>
  );
}

export default React.memo(MatterItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 72,
    borderRadius: 4,
    backgroundColor: COLOR_WHITE,
    elevation: 2,
    margin: 2,
  },
  left: { marginRight: 16 },
  right: {
    marginLeft: "auto",
  },
  matterName: {
    fontSize: 16,
  },
  matterTrackedTime: {
    fontSize: 12,
    color: COLOR_HINT,
  },
});
