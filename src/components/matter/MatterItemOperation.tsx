import { View } from "react-native";
import { COLOR_RED } from "../../modules/color";
import { useShowBottomModal } from "../../ui/BottomModal";
import Button from "../../ui/Button";

export function useMatterItemOperation() {
  const [showBottomModal, hideBottomModal] = useShowBottomModal();
  return ({ onEdit, onDelete }: MatterItemOperationProps) =>
    showBottomModal(
      <MatterItemOperation
        onEdit={() => {
          hideBottomModal();
          onEdit();
        }}
        onDelete={() => {
          hideBottomModal();
          onDelete();
        }}
      />
    );
}

interface MatterItemOperationProps {
  onEdit: () => void;
  onDelete: () => void;
}

function MatterItemOperation(props: MatterItemOperationProps) {
  const { onEdit, onDelete } = props;

  return (
    <View>
      <Button
        label="编辑"
        icon="edit"
        onPress={onEdit}
        showArrow={false}
      ></Button>
      <Button
        label="删除"
        icon="delete"
        color={COLOR_RED}
        onPress={onDelete}
        showArrow={false}
      ></Button>
    </View>
  );
}
