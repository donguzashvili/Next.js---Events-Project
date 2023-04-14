import { useContext, useEffect, useState } from "react";

import CommentList from "./commentList";
import NewComment from "./newComment";
import classes from "./comments.module.css";
import { commentPropType } from "@/types/commentType";
import NotificationContext from "@/store/notificationContext";

function Comments({ eventId }: { eventId: string }) {
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState<commentPropType[]>([]);
  const [isFetchingComments, setIsFetchingComments] = useState<boolean>(false);
  const [reloadContent, setReloadContent] = useState<boolean>(false);
  const { showNotification } = useContext(NotificationContext);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler({ email, name, text }: commentPropType) {
    showNotification({ message: "Loading...", title: "Please wait!", status: "pending" });

    // send data to API
    const reqBody = JSON.stringify({
      email,
      name,
      text,
    });
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: reqBody,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        showNotification({ message: "Comment added", title: "Success", status: "success" });
        setReloadContent(!reloadContent);
      })
      .catch((err) => {
        showNotification({ message: err.message || "Something went wrong!", title: "Error!", status: "error" });
      });
  }

  useEffect(() => {
    // showNotification({ message: "Loading...", title: "Please wait!", status: "pending" });
    setIsFetchingComments(true);
    fetch(`/api/comments/${eventId}`)
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        // showNotification({ message: "Comments loaded", title: "Success", status: "success" });
        setIsFetchingComments(false);

        setCommentList(data.comments);
      })
      .catch((err) => {
        showNotification({ message: err.message || "Something went wrong!", title: "Error!", status: "error" });
        setIsFetchingComments(false);
      });
  }, [reloadContent]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? "Hide" : "Show"} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList comments={commentList} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
