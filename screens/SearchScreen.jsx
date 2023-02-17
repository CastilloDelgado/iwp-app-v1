import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../settings/colors";
import { listData } from "./data";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { AntDesign } from "@expo/vector-icons";
import PostList from "../components/PostList";
import PostService from "../services/PostService";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import { PanGestureHandler } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [noPostsLeft, setNoPostsLeft] = useState(false);

  const goToNewPost = (postId) =>
    navigation.navigate("New Post", {
      postId: postId,
    });

  const fetchPosts = () => {
    setLoading(true);
    PostService.getAllPosts(page)
      .then((response) => {
        if (page == 1) {
          setData([...response.data.data]);
        } else {
          setData([...data, ...response.data.data]);
        }

        if (!response.data.next_page_url) {
          setNoPostsLeft(true);
        }
      })
      .then(() => setLoading(false));
  };

  const handleRefresh = () => {
    if (page === 1) {
      fetchPosts();
    } else {
      setPage(1);
      setNoPostsLeft(false);
    }
  };

  const handleEnd = () => {
    if (!noPostsLeft) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <View style={styles.container}>
      <PostList
        data={data}
        navigation={navigation}
        refreshing={loading}
        handleRefresh={handleRefresh}
        handleEnd={handleEnd}
        noPostsLeft={noPostsLeft}
        page={page}
      />
      <Pressable style={styles.addIcon} onPress={goToNewPost}>
        <AntDesign name="plus" size={24} color={colors.addIconColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },

  addIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.addIconBackgroundColor,
    position: "absolute",
    bottom: 20,
    right: 12,
  },
});
