import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const UpdateProfile = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    if (name.length > 20) {
      return toast.error("name length max 20");
    }
    const photo = e.target.photo.value;
    e.target.reset();

    updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
      .then(() => {
        const email = auth.currentUser?.email;
        const updatedUser = { email, name, photo };

        fetch("https://assignment-10-b10-server.vercel.app/users", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        })
          .then((res) => res.json())
          .then(() => {});
        toast.success("Profile update successful");
        navigate("/profile");
      })
      .catch((error) => {
        toast.error(error?.code);
      });
    setUser({ displayName: name, photoURL: photo });
  };

  return (
    <div>
      <Helmet>
        <title>Update Profile - Visa Navigator</title>
      </Helmet>
      <div className="flex flex-col items-center mt-10 md:mt-20">
        <h2 className="text-3xl font-bold pb-5">
          Update Profile
        </h2>
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col items-center w-full"
        >
          <div className="flex flex-col w-4/5 md:w-1/2 lg:w-1/4 mx-auto">
            <label>
              <span className="font-semibold">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="py-3 rounded-full shadow-md mt-1 pl-3 dark:bg-c"
              required
            />
          </div>
          <div className="flex flex-col w-4/5 md:w-1/2 lg:w-1/4 mx-auto mt-2">
            <label>
              <span className="font-semibold">Photo URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Photo url"
              className="py-3 rounded-full shadow-md mt-1 pl-3 dark:bg-c"
              required
            />
          </div>
          <button className="bg-black dark:bg-c py-0.5 px-6 text-white rounded-full font-bold mt-3">
            Update
          </button>
        </form>
        <button className="font-semibold mt-3">
          Back to{" "}
          <Link to="/profile" className="underline">
            Profile
          </Link>
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
