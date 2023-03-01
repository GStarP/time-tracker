import { atom, useAtom, useSetAtom } from "jotai";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { COLOR_SHADOW, COLOR_WHITE } from "../styles/const";

export const BottomModalStore = {
  visible: atom(false),
  title: atom<string | undefined>(undefined),
  // only allow one child component
  child: atom<JSX.Element | null>(null),
};

export function useShowBottomModal() {
  const setBottomMoalVisible = useSetAtom(BottomModalStore.visible);
  const setBottomMoalTitle = useSetAtom(BottomModalStore.title);
  const setBottomMoalChild = useSetAtom(BottomModalStore.child);

  return (child: JSX.Element, title?: string) => {
    setBottomMoalVisible(true);
    setBottomMoalTitle(title);
    setBottomMoalChild(child);
  };
}

export default function BottomModal() {
  const [visible, setVisible] = useAtom(BottomModalStore.visible);
  const [title] = useAtom(BottomModalStore.title);
  const [child] = useAtom(BottomModalStore.child);

  /**
   * entire modal animation: fade
   */
  const animationOpacity = useRef(new Animated.Value(0));
  const fadeInAnimation = Animated.timing(animationOpacity.current, {
    toValue: 1,
    duration: 300,
    useNativeDriver: false,
  });
  const fadeOutAnimation = Animated.timing(animationOpacity.current, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  });

  /**
   * main content animation: slide from bottom
   */
  const animationTop = useRef(new Animated.Value(0));
  const slideUpAnimation = Animated.timing(animationTop.current, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  });
  const slideDownAnimation = Animated.timing(animationTop.current, {
    toValue: Dimensions.get("screen").height,
    duration: 300,
    useNativeDriver: false,
  });

  // show modal
  const showModal = useCallback(() => {
    Animated.parallel([fadeInAnimation, slideUpAnimation]).start();
  }, []);
  useEffect(() => {
    if (visible) {
      showModal();
    }
  }, [visible]);
  // hide modal
  const hideModal = useCallback(() => {
    Animated.parallel([fadeOutAnimation, slideDownAnimation]).start(() =>
      setVisible(false)
    );
  }, []);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={hideModal}
    >
      <Pressable style={{ flex: 1 }} onPress={hideModal}>
        <Animated.View
          style={[
            styles.mask,
            {
              opacity: animationOpacity.current,
            },
          ]}
        >
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
            }}
          >
            <Animated.View
              style={[
                styles.main,
                {
                  top: animationTop.current,
                },
              ]}
            >
              {title ? (
                <View style={styles.title}>
                  <Text style={styles.titleText}>{title}</Text>
                </View>
              ) : null}
              {child}
            </Animated.View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
/**
 * style
 */
const borderRadius = 4;
const styles = StyleSheet.create({
  mask: {
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: COLOR_SHADOW,
  },
  main: {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    backgroundColor: COLOR_WHITE,
    overflow: "hidden",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 16,
  },
});
