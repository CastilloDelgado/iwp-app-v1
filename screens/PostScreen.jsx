import React, { useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import TrashcanIcon from "../components/icons/TrashcanIcon";
import PostCommentsList from "../components/PostCommentsList";
import PostHeader from "../components/PostHeader";
import CommentService from "../services/CommentService";
import PostService from "../services/PostService";

export default function PostScreen({ route, navigation }) {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  const modalRef = useRef(null);
  const modalCommentRef = useRef(null);

  const openModal = () => {
    modalRef.current?.open();
  };
  const closeModal = () => {
    modalRef.current?.close();
  };
  const openCommentModal = (commentId) => {
    setCommentIdToDelete(commentId);
    modalCommentRef.current?.open();
  };
  const closeCommentModal = () => {
    modalCommentRef.current?.close();
  };

  const handleDeletePost = () => {
    closeModal();
    PostService.deletePost(postData.id)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => console.log(error.response.data.message))
      .then(() => {});
  };

  const handleDeleteComment = (commentId) => {
    closeCommentModal();
    CommentService.deleteComment(commentIdToDelete)
      .then(() => {
        // navigation.navigate("Home");
      })
      .catch((error) => console.log(error.response.data.message))
      .then(() => {});
  };

  const showDeleteAlert = () => {
    Alert.alert("Delete this post?", "This post will be deleted forever!!!", [
      {
        text: "Cancel",
        onPress: closeModal,
        style: "cancel",
      },
      {
        text: "I'm sure",
        onPress: handleDeletePost,
        style: "default",
      },
    ]);
  };

  const showDeleteCommentAlert = () => {
    Alert.alert(
      "Delete this comment?",
      "This comment will be deleted forever!!!",
      [
        {
          text: "Cancel",
          onPress: closeCommentModal,
          style: "cancel",
        },
        {
          text: "I'm sure",
          onPress: handleDeleteComment,
          style: "default",
        },
      ]
    );
  };

  const fetchPost = () => {
    setLoading(true);
    PostService.getPostById(route.params.postId)
      .then((response) => {
        setPostData(response.data);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <PostCommentsList
        data={postData.comments || []}
        navigation={navigation}
        postId={route.params.postId}
        openCommentModal={openCommentModal}
        header={() => (
          <PostHeader
            route={route}
            navigation={navigation}
            data={postData}
            openModal={openModal}
            loading={loading}
          />
        )}
      />
      {/* Modal for deleting post */}
      <Modalize ref={modalRef} snapPoint={200}>
        <View style={styles.modal}>
          <Pressable style={styles.modalItem} onPress={showDeleteAlert}>
            <TrashcanIcon />
            <Text style={styles.modaltemText}>Delete post</Text>
          </Pressable>
        </View>
      </Modalize>
      {/* Modal for deleting comment */}
      <Modalize ref={modalCommentRef} snapPoint={200}>
        <View style={styles.modal}>
          <Pressable style={styles.modalItem} onPress={showDeleteCommentAlert}>
            <TrashcanIcon />
            <Text style={styles.modaltemText}>Delete comment</Text>
          </Pressable>
        </View>
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({
  modaltemText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  modal: {
    paddingHorizontal: 23,
    paddingVertical: 32,
  },
});
