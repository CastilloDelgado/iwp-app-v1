import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import colors from "../settings/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import DotsIcons from "../components/icons/DotsIcons";
import ProfileImageBadge from "../components/ProfileImageBadge";
import PostEngagementInfo from "../components/PostEngagementInfo";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import { format } from "date-fns";
import { AuthContext } from "../context/AuthProvider";
import ImageSlider from "../components/ImageSlider";
import { STORAGE_SERVER_URL } from "../constants";

export default function PostHeader({ navigation, data, loading, openModal }) {
  const { user } = useContext(AuthContext);

  const goToProfileScreen = () =>
    navigation.navigate("Profile Screen", { profileId: data.user.id });

  const createdAtDate = new Date(data?.created_at || null);

  let images = [];
  if (data.images) {
    images = data?.images.map((image) => ({
      uri: `${STORAGE_SERVER_URL}/${image.url}`,
    }));
  }

  return (
    <>
      {loading ? (
        <CustomActivityIndicator alwaysOn />
      ) : (
        <>
          <ImageSlider images={[...images]} />
          <View style={styles.container}>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                style={styles.flexRow}
                onPress={goToProfileScreen}
              >
                <ProfileImageBadge image={data?.user?.avatar} />
                <View>
                  <Text style={styles.postUsername}>{data?.user?.name}</Text>
                  <Text
                    style={styles.postUsertag}
                  >{`@${data?.user?.usertag}`}</Text>
                </View>
              </TouchableOpacity>
              {user.id === data.user?.id ? (
                <TouchableOpacity onPress={openModal}>
                  <DotsIcons />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.postContentContainer}>
              <Text style={styles.postTitle}>{data?.title}</Text>
              <Text style={styles.postDescription}>{data?.description}</Text>
              <View style={styles.timeContainer}>
                <Text style={styles.timeItem}>
                  {format(createdAtDate, "h:mm a")}
                </Text>
                <Text style={styles.timeItem}>
                  {format(createdAtDate, "d MMM yyyy")}
                </Text>
              </View>
            </View>

            {/* ENGAGEMENT DATA */}
            <View style={styles.postEngagementContainer}>
              <PostEngagementInfo item={data} />
            </View>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },

  timeContainer: {
    flexDirection: "row",
    marginTop: 10,
  },

  timeItem: {
    color: colors.profileUsertagColor,
    marginRight: 10,
  },

  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },

  flexRow: {
    flexDirection: "row",
  },

  postUsername: {
    fontWeight: "bold",
    color: colors.postItemNameColor,
  },
  postUsertag: {
    color: colors.postItemUsertagColor,
  },

  postContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.separatorColor,
  },

  postTitle: {
    textAlign: "justify",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    color: colors.postItemDescriptionColor,
  },
  postDescription: {
    textAlign: "justify",
    fontSize: 16,
    color: colors.postItemDescriptionColor,
  },

  postEngagementContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.separatorColor,
  },
});
