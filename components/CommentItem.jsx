import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import colors from "../settings/colors";
import ProfileImageBadge from "./ProfileImageBadge";
import { formatDistanceToNowStrict } from "date-fns";
import DotsIcon from "./icons/DotsIcons";
import { AuthContext } from "../context/AuthProvider";

export default function CommentItem({ item, navigation, openCommentModal }) {
  const { user } = useContext(AuthContext);

  const goToProfile = (profileId) =>
    navigation.navigate("Profile Screen", {
      profileId: profileId,
    });

  return (
    <View style={styles.smallPostContainer}>
      <Pressable onPress={() => goToProfile(item?.user?.id)}>
        <ProfileImageBadge image={item?.user?.avatar} />
      </Pressable>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          style={[styles.flexRow, styles.smallPostUserInfoContainer]}
          onPress={() => goToProfile(item?.user?.id)}
        >
          <Text numberOfLines={1} style={styles.smallPostName}>
            {item.user?.name}
          </Text>
          <Text numberOfLines={1} style={styles.usertag}>
            {`@${item.user?.usertag}`}
          </Text>
          <Text>&middot; </Text>
          <Text numberOfLines={1} style={styles.timestamp}>
            {formatDistanceToNowStrict(new Date(item.created_at))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToPostScreen(item.id)}>
          <Text style={styles.smallPostDescription}>{item.text}</Text>
        </TouchableOpacity>
      </View>
      {user.id === item.user.id ? (
        <TouchableOpacity onPress={() => openCommentModal(item.id)}>
          <DotsIcon />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  smallPostContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomColor: colors.smallPostBorderColor,
    backgroundColor: colors.appBackgroundColor,
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  smallPostName: {
    fontWeight: "bold",
    marginRight: 6,
    color: colors.profileNameColor,
  },

  smallPostTitle: {
    fontWeight: "bold",
    marginRight: 6,
    textAlign: "justify",
  },

  smallPostUserInfoContainer: {
    // marginBottom: 6,
  },

  usertag: {
    color: colors.profileUsertagColor,
    marginRight: 6,
  },

  timestamp: {
    color: colors.profileUsertagColor,
  },

  smallPostContent: {
    marginTop: 4,
  },

  infoContainer: {
    flex: 1,
  },

  smallPostDescription: {
    textAlign: "justify",
    lineHeight: 20,
    color: colors.profileNameColor,
  },
});
