import { atom, useAtom, useSetAtom } from "jotai";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { COLOR_SHADOW, COLOR_WHITE } from "../styles/const";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const BottomModalStore = {
  visible: atom(false),
  title: atom<string | undefined>(undefined),
  // only allow one child component
  child: atom<JSX.Element | null>(null),
};

export function useShowBottomModal(): [
  (child: JSX.Element, title?: string) => void,
  () => void
] {
  const setBottomModalVisible = useSetAtom(BottomModalStore.visible);
  const setBottomModalTitle = useSetAtom(BottomModalStore.title);
  const setBottomModalChild = useSetAtom(BottomModalStore.child);

  return [
    // showBottomModal
    (child: JSX.Element, title?: string) => {
      setBottomModalVisible(true);
      setBottomModalTitle(title);
      setBottomModalChild(child);
    },
    // hideBottomModal
    () => {
      setBottomModalVisible(false);
      setBottomModalTitle(undefined);
      setBottomModalChild(null);
    },
  ];
}

export default function BottomModal() {
  /**
   * @ATTENTION `visible` is only a flag!
   * whenever `visible` change, useEffect will play animations and
   * call `setRealVisible` to control Modal according to `visible`
   */
  const [visible, setVisible] = useAtom(BottomModalStore.visible);
  const [realVisible, setRealVisible] = useState(false);
  const [title] = useAtom(BottomModalStore.title);
  const [child] = useAtom(BottomModalStore.child);

  /**
   * entire modal animation: fade
   */
  const duration = 250;
  const animationOpacity = useRef(new Animated.Value(0));
  const fadeInAnimation = Animated.timing(animationOpacity.current, {
    toValue: 1,
    duration,
    useNativeDriver: false,
  });
  const fadeOutAnimation = Animated.timing(animationOpacity.current, {
    toValue: 0,
    duration,
    useNativeDriver: false,
  });

  /**
   * main content animation: slide from bottom
   */
  const animationTop = useRef(new Animated.Value(0));
  const slideUpAnimation = Animated.timing(animationTop.current, {
    toValue: 0,
    duration: duration - 50,
    useNativeDriver: false,
  });
  const slideDownAnimation = Animated.timing(animationTop.current, {
    toValue: Dimensions.get("screen").height,
    duration: duration - 50,
    useNativeDriver: false,
  });

  const showModal = () => {
    setRealVisible(true);
    Animated.parallel([fadeInAnimation, slideUpAnimation]).start();
  };
  const hideModal = () => {
    Animated.parallel([fadeOutAnimation, slideDownAnimation]).start(() =>
      setRealVisible(false)
    );
  };

  // setVisible => animation + setRealVisible
  useEffect(() => {
    if (visible) {
      showModal();
    } else {
      hideModal();
    }
  }, [visible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={realVisible}
      onRequestClose={() => setVisible(false)}
    >
      <Pressable style={{ flex: 1 }} onPress={() => setVisible(false)}>
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
                  <Text style={{ fontSize: 16 }}>{title}</Text>
                  <Pressable
                    onPress={hideModal}
                    style={{
                      marginLeft: "auto",
                    }}
                  >
                    <MaterialIcons
                      style={{
                        transform: [{ rotate: "90deg" }],
                      }}
                      size={16}
                      name="arrow-forward-ios"
                    ></MaterialIcons>
                  </Pressable>
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
    paddingHorizontal: 24,
  },
});
