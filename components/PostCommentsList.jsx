import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import colors from "../settings/colors";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const PostCommentsList = ({
  data,
  header,
  navigation,
  postId,
  openCommentModal,
}) => {
  return (
    <FlatList
      data={data || []}
      renderItem={({ item }) => (
        <CommentItem
          item={item}
          navigation={navigation}
          openCommentModal={openCommentModal}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => (
        <View style={styles.smallPostSeparator}></View>
      )}
      ListHeaderComponent={header ? header : null}
      ListFooterComponent={() => <CommentForm postId={postId} />}
    />
  );
};

export default PostCommentsList;

const styles = StyleSheet.create({
  smallPostSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.separatorColor,
  },
});
