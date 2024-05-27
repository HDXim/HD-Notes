import React, { memo } from "react";

import GroupItemView, { GroupItemViewProps } from "./GroupItemView";

interface GroupItemProps
  extends Omit<GroupItemViewProps, "onPressGroup" | "onPressDeleteIcon"> {
  onPressGroup: (groupId: string) => void;
  onPressDeleteIcon: (groupId: string) => void;
}

const GroupItemContainer: React.FC<GroupItemProps> = ({
  group,
  visibleLine,
  onPressGroup,
  onPressDeleteIcon,
}) => {
  console.log("~~~~~~", group.groupTitle);

  const handleOnPressGroup = () => onPressGroup(group.groupId);
  const handleOnPressDeleteIcon = () => onPressDeleteIcon(group.groupId);
  return (
    <GroupItemView
      group={group}
      visibleLine={visibleLine}
      onPressGroup={handleOnPressGroup}
      onPressDeleteIcon={handleOnPressDeleteIcon}
    />
  );
};

export default memo(GroupItemContainer);
