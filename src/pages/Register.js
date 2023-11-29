import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fireDb, app } from "../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const userData = {
          email: user.email,
          profilePicUrl: "",
          bio: "Hi, I am using Duxgram Lite",
        };

        setDoc(doc(fireDb, "users", user.uid), userData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-screen flex justify-between flex-col overflow-hidden bg-primary">
      {/* top corner */}
      <div className="flex justify-start bg-primary">
        <div className="h-40 w-96 transform -skew-x-[25deg] -ml-10 flex justify-center items-center bg-white">
          <h1 className="text-primary text-6xl text-center font-semibold skew-x-[25deg]">
            DUX
          </h1>
        </div>
      </div>
      {/* form */}
      <div className="flex justify-center bg-primary">
        <div className="w-[420px] flex flex-col space-y-5 card p-10">
          <h1 className="text-4xl text-white font-semibold">Get---IN</h1>
          <hr />
          <input
            type="email"
            className="border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-5 bg-transparent text-gray-400"
            placeholder="email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-5 bg-transparent text-gray-400"
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-5 bg-transparent text-gray-400"
            placeholder="confirm password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              onClick={register}
              className="bg-white h-10 rounded-sm text-primary px-10"
            >
              REGISTER
            </button>
          </div>
          <hr />
          <Link to="/login" className="text-[13px] text-white">
            ALREADY REGISTERED? CLICK HERE TO LOGIN.
          </Link>
        </div>
      </div>
      {/* bottom corner */}
      <div className="flex justify-end bg-primary">
        <div className="h-40 w-96 transform skew-x-[25deg] -mr-10 flex justify-center items-center bg-white">
          <h1 className="text-primary text-6xl text-center font-semibold -skew-x-[25deg]">
            GRAM
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;
