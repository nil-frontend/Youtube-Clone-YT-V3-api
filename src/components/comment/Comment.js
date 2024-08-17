import React from "react";
import moment from "moment";
import "./_comment.scss";

import {
  RiThumbUpLine,
  RiThumbUpFill,
  RiThumbDownLine,
  RiThumbDownFill,
} from "react-icons/ri";
import { useRef } from "react";

const Comment = ({ comment,noLikeBtn }) => {
     const {
        authorDisplayName,
        authorProfileImageUrl,
        publishedAt,
        textDisplay,
     } = comment || {}

  const nonlikeRef = useRef(null);
  const likeRef = useRef(null);
  const nondislikeRef = useRef(null);
  const dislikeRef = useRef(null);

  const like = () =>{
    if (nonlikeRef.current && likeRef.current && nonlikeRef.current && likeRef.current ){
      nonlikeRef.current.classList.toggle("none");
      likeRef.current.classList.toggle("none");

      nondislikeRef.current.classList.remove("none");
      dislikeRef.current.classList.add("none");

    }
  };

  const dislike = () =>{
    if (nonlikeRef.current && likeRef.current && nonlikeRef.current && likeRef.current){
      nondislikeRef.current.classList.toggle("none");
      dislikeRef.current.classList.toggle("none");

      nonlikeRef.current.classList.remove("none");
      likeRef.current.classList.add("none");
    }
  };

  //when it is the single comment shown for mobile devices the comment will be in 1 line comment
  const lineOne = noLikeBtn && ("line-clamp-1");

  return (
    <div className="py-2 comment d-flex">
      <img
        src={authorProfileImageUrl}
        alt=""
        className="mr-3 rounded-circle"
      />
      <div className="comment__body">
        <p className="mb-1 comment__header">
          {authorDisplayName} • {moment(publishedAt).fromNow()}                       {/* commenter name & time */}
        </p>
        <p className={`mb-0 ${lineOne}`}>{textDisplay}</p>                                         {/* the comment text */}
      {!noLikeBtn && (
        <div className=" d-flex ">
          <span className="comlikes" onClick={like}>
            <span className="" ref={nonlikeRef}>
              <RiThumbUpLine />
            </span>
            <span className=" none" ref={likeRef}>
              <RiThumbUpFill />
            </span>
          </span>
          <span className="comlikes" onClick={dislike}>
            <span className="" ref={nondislikeRef}>
              <RiThumbDownLine />
            </span>
            <span className=" none" ref={dislikeRef}>
              <RiThumbDownFill />
            </span>
          </span>
        </div>
      )}
      </div>
    </div>
  );
};

export default Comment;
