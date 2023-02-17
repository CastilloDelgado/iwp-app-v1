import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import PostItem from "./PostItem";
import colors from "../settings/colors";
import CustomActivityIndicator from "./CustomActivityIndicator";

export default function PostList({
  data,
  navigation,
  header,
  refreshing,
  handleRefresh,
  handleEnd,
  noPostsLeft,
  page,
}) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <PostItem navigation={navigation} item={item} />
      )}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => (
        <View style={styles.smallPostSeparator}></View>
      )}
      ListHeaderComponent={header ? header : null}
      refreshing={refreshing}
      onRefresh={() => {
        handleRefresh();
      }}
      onEndReached={handleEnd}
      onEndReachedThreshold={0}
      ListFooterComponent={() =>
        !noPostsLeft && page !== 1 ? (
          <CustomActivityIndicator loading={refreshing} />
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  smallPostSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.separatorColor,
  },
});
