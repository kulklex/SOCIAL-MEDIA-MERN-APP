import React from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";

const Likes = ({ user, likes }) => {
  if (likes.length > 0) {
    return likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) 
    ? (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;
        {likes.length > 2
          ? `You and ${likes.length - 1} others`
          : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;{likes.length} {likes.length === 1 ? "like" : "likes"}
      </>
    );
  }

  return (
    <>
      <ThumbUpAltOutlined fontSize="small" />
      &nbsp;
    </>
  );
};

export default Likes;
