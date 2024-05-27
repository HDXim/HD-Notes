import React from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Box, Button, Text } from "@gluestack-ui/themed";

import { Group } from "helpers/groupHelper";

export interface GroupItemViewProps {
  group: Group;
  visibleLine: boolean;
  onPressGroup: () => void;
  onPressDeleteIcon: () => void;
}

const GroupItemView: React.FC<GroupItemViewProps> = ({
  group,
  visibleLine,
  onPressGroup,
  onPressDeleteIcon,
}) => (
  <>
    <Button
      onPress={onPressGroup}
      marginVertical={3}
      borderRadius={10}
      paddingLeft={"$4"}
      paddingRight={0}
      alignItems="center"
      paddingVertical={"$1"}
      bgColor="$primary300"
      h={"auto"}
      $active-opacity={"$40"}
    >
      <Ionicons name="folder-outline" size={24} color="black" />
      <Text
        paddingHorizontal={"$4"}
        color="$primary950"
        numberOfLines={1}
        flex={1}
      >
        {group.groupTitle || "Untitled group"}
      </Text>
      <Text color="$primary950" pr={"$2"} numberOfLines={1}>
        {group.noteAmount || "0"}
      </Text>
      <Entypo name="chevron-small-right" size={24} color="black" />
      <Button
        $active-opacity={"$40"}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={onPressDeleteIcon}
        paddingLeft={0}
        paddingRight={"$4"}
        bgColor="transparent"
      >
        <Ionicons name="trash-outline" size={24} color="black" />
      </Button>
    </Button>
    {visibleLine && (
      <Box
        borderTopWidth={0.5}
        width={"70%"}
        bgColor="$primary950"
        alignSelf="center"
      />
    )}
  </>
);

export default GroupItemView;
