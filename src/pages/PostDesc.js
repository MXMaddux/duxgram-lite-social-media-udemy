import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { fireDb } from "../firebaseConfig";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineClose,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

const PostDesc = () => {
  const currentUser = JSON.parse(localStorage.getItem("duxgram-lite-user"));
  const [post, setPost] = useState(null);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserName = (text) => {
    const email = text;
    // const username = email.substring(0, email.length - 10);
    const username = email.split("@")[0];
    console.log(username);
    return username;
  };

  const getData = () => {
    dispatch({ type: "showLoading" });
    getDoc(doc(fireDb, "posts", params.id))
      .then((response) => {
        setPost({ ...response.data(), id: response.id });
        if (response.data().likes.find((user) => user.id === currentUser.id)) {
          setAlreadyLiked(true);
        } else {
          setAlreadyLiked(false);
        }
        dispatch({ type: "hideLoading" });
      })
      .catch(() => {
        dispatch({ type: "hideLoading" });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const likeOrUnlikePost = () => {
    let updatedLikes = post.likes;

    if (alreadyLiked) {
      updatedLikes = post.likes.filter((user) => user.id !== currentUser.id);
    } else {
      updatedLikes.push({
        id: currentUser.id,
        email: currentUser.email,
      });
    }

    setDoc(doc(fireDb, "posts", post.id), { ...post, likes: updatedLikes })
      .then(() => {
        getData();
        toast.success("Post liked successfully");
      })
      .catch(() => {
        toast.error("An error occurred");
      });
  };

  const addComment = () => {
    let updatedComments = post.comments;

    updatedComments.push({
      id: currentUser.id,
      email: currentUser.email,
      commentText,
      createdOn: moment().format("MM-DD-YYYY"),
    });

    setDoc(doc(fireDb, "posts", post.id), {
      ...post,
      comments: updatedComments,
    })
      .then(() => {
        getData();
        setCommentText("");
      })
      .catch(() => {
        toast.error("An error occurred");
      });
  };

  return (
    <DefaultLayout>
      <div className="flex w-full justify-center space-x-5">
        {post && (
          <>
            {/* likes display purpose */}
            {showLikes && (
              <div className="w-96">
                <div className="flex justify-between">
                  <h1 className="text-xl font-semibold text-gray-500">
                    Liked By
                  </h1>
                  <AiOutlineClose
                    color="gray"
                    className="cursor-pointer"
                    onClick={() => setShowLikes(false)}
                  />
                </div>
                <hr />
                {post.likes.map((like) => {
                  return (
                    <div className="flex item items-center card-sm p-2 mt-2">
                      <div className="h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center text-white mr-2">
                        <span className="text-2xl">
                          {getUserName(like.email)[0]}
                        </span>
                      </div>
                      <span>{getUserName(like.email)}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* post info purpose */}
            <div className="cursor-pointer h-[550px] w-[550px]">
              <div className="flex item items-center card-sm p-2">
                <div className="h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center text-white mr-2">
                  <span className="text-2xl">
                    {getUserName(post.user.email)[0]}
                  </span>
                </div>
                <span>{getUserName(post.user.email)}</span>
              </div>
              <div className="w-full text-center flex justify-center card-sm">
                <img src={post.imageURL} alt="" className="h-full w-full" />
              </div>
              <div className="card-sm p-2 flex w-full items-center space-x-5">
                <div className="flex space-x-2 items-center">
                  <AiFillHeart
                    size={25}
                    onClick={likeOrUnlikePost}
                    color={alreadyLiked ? "red" : "gray"}
                  />
                  <h1
                    className="underline font-semibold cursor-pointer"
                    onClick={() => setShowLikes(true)}
                  >
                    {post.likes.length}
                  </h1>
                </div>
                <div className="flex space-x-2 items-center">
                  <AiOutlineComment size={25} />
                  <h1
                    className="underline text-xl cursor-pointer"
                    onClick={() => setShowComments(true)}
                  >
                    {post.comments.length}
                  </h1>
                </div>
                <div>
                  <AiOutlineShareAlt
                    onClick={() => navigate(`/sharepost/${post.id}`)}
                    size={25}
                    color="gray"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* comments info purpose */}
            {showComments && (
              <div className="w-96">
                <div className="flex justify-between">
                  <h1 className="text-xl font-semibold text-gray-500">
                    Comments
                  </h1>
                  <AiOutlineClose
                    color="gray"
                    className="cursor-pointer"
                    onClick={() => setShowComments(false)}
                  />
                </div>
                {post.comments.map((comment) => {
                  return (
                    <div className="card-sm mt-2 p-2">
                      <h1 className="text-xl text-gray-700">
                        {comment.commentText}
                      </h1>
                      <hr />
                      <h1 className="text-right text-md">
                        By <b>{getUserName(comment.email)}</b> On{" "}
                        {comment.createdOn}
                      </h1>
                    </div>
                  );
                })}
                <div className="flex flex-col">
                  <textarea
                    className="border-dashed border-gray-500 border-2  md:w-full my-5 p-5 w-full"
                    rows="2"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>

                  <button
                    className="bg-primary h-10 rounded-sm text-white px-5 mt-2 w-20 text-center"
                    onClick={addComment}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default PostDesc;
