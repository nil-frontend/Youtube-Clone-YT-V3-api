import React, { useEffect, useState } from "react";
import "./_comments.scss";
import Comment from "../comment/Comment";
// import { MdFilterList } from "react-icons/md";
import { BsFilterLeft } from "react-icons/bs";
import { FaRegFaceLaughBeam } from "react-icons/fa6";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getCommentsOfVideoById } from "../../redux/actions/comments.action";
import { RxCross1 } from "react-icons/rx";

const Comments = ({ videoId, totalComments }) => {

  const dispatch = useDispatch()

  const [text, setText] = useState('')

  useEffect(()=>{
    dispatch(getCommentsOfVideoById(videoId))
  },[videoId, dispatch])

  const comments = useSelector(state=>state.commentList.comments)
  const _comments = comments?.map(Comment=>Comment.snippet.topLevelComment.snippet)


  const handleComment = e => {
    e.preventDefault();                   //so that page don't refresh on submit the comment only for this line.
    if(text.length=== 0) return

    dispatch(addComment(videoId, text))
    setText('')
  };

  const emjRef = useRef(null);

  const clk = () => {
    if (emjRef.current) {
      emjRef.current.classList.add("block");
    }
  };
  // const emj = document.getElementById('emoji');
  // const cominp = document.getElementById('cominp');

  // cominp.addEventListener("click", ()=>{
  //   emj.style.display = "flex";
  // });

  // const clk = () =>{
  //   emj.style.display = "block";
  // }

  // const emj = document.getElementById('emoji');
  // const clk = () =>{
  //   emj.classList.add("block");
  // }

  const {photoURL} = useSelector(state => state.auth?.user)

  // const latestComment = useSelector(state=> state.commentList?.comments[0]?.snippet?.topLevelComment?.snippet)

  const commentsSec = document.querySelector(".comments")
  const fastComment = document.querySelector("#fastComment")
  const showComments = () => {
    commentsSec.style.height="auto";
    commentsSec.style.scale="1";
    fastComment.classList.add("d-none")
  };
  const hideComments = () => {
    commentsSec.style.height="0";
    // commentsSec.style.scale="0.9";
    fastComment.classList.remove("d-none")
  };

  return (
    <>
    <div id="fastComment" className="px-3 py-2 pl-4 rounded-2xl bg-yt-light-black none" onClick={showComments}>
      <div className="flex flex-row items-center">
        <p className="text-base font-bold text-yt-white mr-1">Comments </p>
        <p>{` ${totalComments}`}</p>
      </div>
      <div>
        {totalComments !== "0"? (
          <>
        {comments?(
          <Comment comment={comments[0]?.snippet?.topLevelComment?.snippet} noLikeBtn/>
          ):(
            <h1>Loading...</h1>
          )}
          </>
          ):(
            <h1>Add a Comment...</h1>
            )}
      </div>
    </div>
    
    <div className="comments">
      <div className=" mb--6 flex flex-row items-center text-yt-white">
        <p className=" mr-8 block text-xl font-bold my-3">{totalComments} comments</p>
        {/* <p><MdFilterList /></p> */}
        <p className=" text-3xl mr-2 font-light">
          <BsFilterLeft />
        </p>
        <p className=" text-base font-extrabold">Sort by</p>
        <RxCross1 size={25} className="comCross ml-auto mr-1 none" onClick={hideComments}/>
      </div>
      <div className="comments__form d-flex w-100 my-2 mb-3">
        <img
          src={photoURL}
          alt="user_logo"
          className="rounded-circle mr-3 mt-2"
        />
        <div className="w-full">
          <form onSubmit={handleComment} className="d-flex flex-grow-1">
            <input
              type="text"
              className="flex-grow-1"
              id="cominp"
              placeholder="Add a comment..."
              onClick={clk}
              value={text}
              onChange={e=>setText(e.target.value)}
            />
            <span className="bar"></span>
            <button className="border-0 p-2 px-3">Comment</button>
          </form>
          <span className="emoji" id="emoji" ref={emjRef}>
            <FaRegFaceLaughBeam />
          </span>
        </div>
      </div>
      <div className="comments__list">
        {_comments?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Comments;
