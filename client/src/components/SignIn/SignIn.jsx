import { useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
  const {
    handleSignIn,
    handleGoogleLogin,
    handleGithubLogin,
    setUser,
    setEmailValue,
    locations,
    setLocations,
  } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    handleSignIn(email, password)
      .then((result) => {
        e.target.reset();
        setUser(result?.user);
        const lastSignInTime = result?.user?.metadata?.lastSignInTime;
        const loginInfo = { email, lastSignInTime };
        fetch("https://assignment-10-b10-server.vercel.app/users/login", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              toast.success("User signin successful");
            }
          });
        if (locations) {
          navigate(locations);
        } else {
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((error) => {
        toast.error(error?.code);
      });
  };

  const handleEmail = () => {
    setEmailValue("");
    const email = emailRef.current.value;
    if (!email.includes("@") && !email == "") {
      return toast.error("Please provide a valid mail");
    } else {
      setEmailValue(email);
    }
  };

  const handleLocations = () => {
    setLocations(location.state);
  };

  return (
    <div className="flex flex-col items-center mt-10 md:mt-20">
      <Helmet>
        <title>SignIn - Visa Navigator</title>
      </Helmet>
      <h2 className="text-3xl font-bold  pb-5">
        Sign In
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="flex flex-col w-4/5 md:w-1/2 lg:w-1/4 mx-auto">
          <label>
            <span className="font-semibold">Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            ref={emailRef}
            className="py-3 rounded-full shadow-md mt-1 pl-3 dark:bg-c"
            required
          />
        </div>
        <div className="flex flex-col w-4/5 md:w-1/2 lg:w-1/4 mx-auto mt-2">
          <label>
            <span className="font-semibold">Password</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="py-3 rounded-full shadow-md mt-1 pl-3 dark:bg-c"
            required
          />
        </div>
        <button>
          <Link
            onClick={handleEmail}
            to="/forgetPassword"
            className="text-xs py-2 hover:underline"
          >
            Forget password?
          </Link>
        </button>
        <button className="bg-black py-0.5 px-6 text-white dark:bg-c rounded-full font-bold">
          Sign In
        </button>
      </form>
      <div>
        <p className="pt-2 text-center text-sm font-semibold">
          Don&apos;t have an Account?
          <Link to="/signUp" onClick={handleLocations} className="underline">
            {" "}
            Sign Up
          </Link>
        </p>
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={() => {
              handleGoogleLogin()
                .then((result) => {
                  setUser(result.user);
                  const email = result?.user?.email;
                  const lastSignInTime = result?.user?.metadata?.lastSignInTime;
                  const loginInfo = { email, lastSignInTime };
                  fetch(
                    "https://assignment-10-b10-server.vercel.app/users/login",
                    {
                      method: "PATCH",
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify(loginInfo),
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.modifiedCount) {
                        toast.success("User signin successful");
                      }
                    });
                  if (locations) {
                    navigate(locations);
                  } else {
                    navigate(location?.state ? location.state : "/");
                  }
                })
                .catch((error) => {
                  toast.error(error?.code);
                });
            }}
            className="bg-black py-2 px-6 text-white dark:bg-c rounded-full font-bold mt-5"
          >
            <i className="fa-brands fa-google text-white pr-2"></i>
            Google
          </button>
          <button
            onClick={() => {
              handleGithubLogin()
                .then((result) => {
                  setUser(result.user);
                  const email = result?.user?.email;
                  const lastSignInTime = result?.user?.metadata?.lastSignInTime;
                  const loginInfo = { email, lastSignInTime };
                  fetch(
                    "https://assignment-10-b10-server.vercel.app/users/login",
                    {
                      method: "PATCH",
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify(loginInfo),
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.modifiedCount) {
                        toast.success("User signin successful");
                      }
                    });
                  if (locations) {
                    navigate(locations);
                  } else {
                    navigate(location?.state ? location.state : "/");
                  }
                })
                .catch((error) => {
                  toast.error(error?.code);
                });
            }}
            className="bg-black py-2 px-6 text-white dark:bg-c rounded-full font-bold md:mt-5"
          >
            <i className="fa-brands fa-github text-white pr-2"></i>
            Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
