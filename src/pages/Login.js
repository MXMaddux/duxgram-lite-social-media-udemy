import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { fireDb, app } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    dispatch({ type: "showLoading" });
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        getDoc(doc(fireDb, "users", user.uid)).then((user) => {
          localStorage.setItem(
            "duxgram-lite-user",
            JSON.stringify({ ...user.data(), id: user.id })
          );
          toast.success("Login Successful");
        });
        dispatch({ type: "hideLoading" });
        navigate("/");
      })
      .catch((error) => {
        toast.error("Login Failed");
        dispatch({ type: "hideLoading" });
      });
  };

  return (
    <div className="h-screen flex justify-between flex-col overflow-hidden">
      {loading && <Loader />}
      {/* top corner */}
      <div className="flex justify-start">
        <div className="h-40 bg-primary w-96 transform -skew-x-[25deg] -ml-10 flex justify-center items-center">
          <h1 className="text-white text-6xl text-center font-semibold skew-x-[25deg]">
            DUX
          </h1>
        </div>
      </div>
      {/* form */}
      <div className="flex justify-center">
        <div className="w-[420px] flex flex-col space-y-5 card p-10">
          <h1 className="text-4xl text-primary font-semibold">Get---IN</h1>
          <hr />
          <input
            type="email"
            className="border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-5"
            placeholder="email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-5"
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              onClick={login}
              className="bg-primary h-10 rounded-sm text-white px-10"
            >
              LOGIN
            </button>
          </div>
          <hr />
          <Link to="/register" className="text-[13px] text-primary">
            NOT REGISTERED YET? CLICK HERE TO REGISTER.
          </Link>
        </div>
      </div>
      {/* bottom corner */}
      <div className="flex justify-end">
        <div className="h-40 bg-primary w-96 transform skew-x-[25deg] -mr-10 flex justify-center items-center">
          <h1 className="text-white text-6xl text-center font-semibold -skew-x-[25deg]">
            GRAM
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
