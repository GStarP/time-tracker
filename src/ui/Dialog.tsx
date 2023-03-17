import { atom, useAtom, useSetAtom } from "jotai";
import { Modal, View, Text, StyleSheet } from "react-native";
import {
  COLOR_SHADOW,
  COLOR_TEXT_SECONDARY,
  COLOR_WHITE,
} from "../styles/const";
import { COLOR_RED } from "../utils/color";
import { EMPTY_FUNC } from "../utils/const";
import TextButton from "./TextButton";

export interface DialogProps {
  content: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
}
const DEFAULT_DIALOG_OPTIONS = {
  title: "提示",
  confirmText: "确认",
  cancelText: "取消",
};

export function errorDialogOptions(
  e: string | { toString: () => string }
): DialogProps {
  return {
    content: e.toString(),
    title: "错误",
    cancelText: "",
  };
}

export function useDialog(): [(options: DialogProps) => Promise<unknown>] {
  const setDialogVidible = useSetAtom(DialogStore.visible);
  const setDialogTitle = useSetAtom(DialogStore.title);
  const setDialogContent = useSetAtom(DialogStore.content);
  const setDialogConfirmText = useSetAtom(DialogStore.confirmText);
  const setDialogCancelText = useSetAtom(DialogStore.cancelText);

  return [
    // showDialog
    (options) => {
      const { content, title, confirmText, cancelText } = {
        ...DEFAULT_DIALOG_OPTIONS,
        ...options,
      };
      setDialogVidible(true);
      setDialogTitle(title);
      setDialogContent(content);
      setDialogConfirmText(confirmText);
      setDialogCancelText(cancelText);

      return new Promise((resolve, reject) => {
        DialogPromise.resolve = resolve;
        DialogPromise.reject = reject;
      });
    },
  ];
}

const DialogStore = {
  visible: atom(false),
  title: atom(""),
  content: atom(""),
  confirmText: atom(""),
  cancelText: atom(""),
};

const DialogPromise: {
  resolve: (v: unknown) => void;
  reject: (v?: unknown) => void;
} = {
  resolve: EMPTY_FUNC,
  reject: EMPTY_FUNC,
};

export function Dialog() {
  const [visible, setVisible] = useAtom(DialogStore.visible);
  const [title] = useAtom(DialogStore.title);
  const [content] = useAtom(DialogStore.content);
  const [confirmText] = useAtom(DialogStore.confirmText);
  const [cancelText] = useAtom(DialogStore.cancelText);

  const onConfirm = () => {
    setVisible(false);
    DialogPromise.resolve(null);
  };

  const onCancel = () => {
    setVisible(false);
    DialogPromise.reject();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.mask}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={{ color: COLOR_TEXT_SECONDARY }}>{content}</Text>
          <View style={styles.actions}>
            {confirmText === "" ? null : (
              <TextButton
                label={confirmText}
                onPress={onConfirm}
                style={{ marginLeft: 8 }}
              ></TextButton>
            )}
            {cancelText === "" ? null : (
              <TextButton
                label={cancelText}
                onPress={onCancel}
                color={COLOR_RED}
              ></TextButton>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mask: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_SHADOW,
  },
  dialog: {
    width: "80%",
    backgroundColor: COLOR_WHITE,
    borderRadius: 4,
    elevation: 4,
    padding: 20,
    paddingRight: 20 - 12,
    paddingBottom: 20 - 8,
    marginBottom: "10%",
  },
  title: {
    fontSize: 20,
    marginBottom: 20 - 4,
  },
  actions: {
    flexDirection: "row-reverse",
    marginTop: 20 + 4,
  },
});
