import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import ProfileImageBadge from "./ProfileImageBadge";
import { TouchableOpacity } from "react-native-gesture-handler";
import PostEngagementInfo from "./PostEngagementInfo";
import colors from "../settings/colors";
import { formatDistanceToNowStrict } from "date-fns";
import ImageSlider from "./ImageSlider";
import { STORAGE_SERVER_URL } from "../constants";

export default function PostItem({ item, navigation }) {
  const goToProfile = (profileId) =>
    navigation.navigate("Profile Screen", {
      profileId: profileId,
    });

  const goToPostScreen = (postId) =>
    navigation.navigate("Post Screen", { postId });

  const images = item.images?.map((image) => ({
    uri: `${STORAGE_SERVER_URL}/${image.url}`,
  }));

  return (
    <View>
      <ImageSlider images={[...images]} />
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
            <Text style={styles.smallPostTitle}>{item.title}</Text>
            <Text style={styles.smallPostDescription}>{item.description}</Text>
          </TouchableOpacity>

          {/* ENGAGEMENT DATA */}
          <PostEngagementInfo item={item} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  smallPostContainer: {
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 8,
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
    color: colors.postItemNameColor,
  },

  smallPostTitle: {
    fontWeight: "bold",
    marginRight: 6,
    textAlign: "justify",
    color: colors.postItemDescriptionColor,
  },

  smallPostUserInfoContainer: {
    marginBottom: 6,
  },

  usertag: {
    color: colors.postItemUsertagColor,
    marginRight: 6,
  },

  timestamp: {
    color: colors.postItemUsertagColor,
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
    color: colors.postItemDescriptionColor,
  },
});
