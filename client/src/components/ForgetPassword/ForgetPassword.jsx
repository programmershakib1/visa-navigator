import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { Helmet } from "react-helmet-async";

const ForgetPassword = () => {
  const { emailValue } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    e.target.reset();

    if (!email) {
      toast.error("Please provide a valid mail");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        toast.success("Reset email sent, please check");
        window.location.href = "https://mail.google.com";
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 md:mt-20">
      <Helmet>
        <title>Forget Password - Visa Navigator</title>
      </Helmet>
      <h2 className="text-3xl font-bold pb-10">
        Forget Password
      </h2>
      <form onSubmit={handleSubmit} action="" className="w-full">
        <div className="flex flex-col w-4/5 md:w-1/2 lg:w-1/4 mx-auto">
          <label>
            <span className="font-semibold">Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={`${emailValue ? emailValue : ""}`}
            className="py-3 rounded-full shadow-md mt-1 pl-3 dark:bg-c"
            required
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-black py-1 px-6 text-white dark:bg-c rounded-full font-bold mt-3">
            Reset Password
          </button>
        </div>
      </form>
      <button className="mt-2 text-sm font-semibold">
        Back to
        <Link to="/SignIn" className="pl-1 underline">
          Sign In
        </Link>
      </button>
    </div>
  );
};

export default ForgetPassword;
