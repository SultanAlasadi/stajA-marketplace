import { useEffect, useState } from "react";
import classes from "./userProfile.module.css";
const url = "https://staja-marketplace-zjsp.onrender.com";
import axios from "../../api/axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Breadcrumbs from "../../components/ui/Breadcrumb";
import Adresses from "./Adresses";
import { CircularProgress } from "@mui/material";
import DropdownAddress from "../../components/Check/DropdownAddress";

const UserProfile = () => {
  const { register, handleSubmit } = useForm({});
  const { loading, setloadig } = useState();
  const [showAddress, setShowAddress] = useState(false);
  const [showAddressCards, setShowAddressCards] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const onSubmit = (data) => {
    console.log("data", data);
  };
  const signOut = useSignOut();
  const redict = useNavigate();

  const loggout = () => {
    signOut();
    redict("/login");
  };
  const userImage = `https://staja-marketplace-zjsp.onrender.com${userData?.image}`;

  const auth = useAuthUser();
  const fetchUserProfile = async () => {
    try {
      // setloadig(true);
      const response = await axios.get(`/userprofile`);
      setUserData(response.data.user);
      setShowAddress(response.data.user.addresses);
      console.log("response", response.data);
      // setloadig(false);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("responsssse", showAddress);

  useEffect(() => {
    fetchUserProfile();
  }, []);
  if (!userData || !userData.addresses) {
    return (
      <div className="container d-flex gap-2 justify-content-center p-5">
        {" "}
        <CircularProgress />
        <h2>Loading...</h2>
      </div>
    );
  }
  const address1 =
    userData.addresses.length > 0 ? userData.addresses[0].addressline1 : "";

  const handleDelete = async (address) => {
    try {
      const response = await axios.delete(`/addresses/${address}`);
      fetchUserProfile();
    } catch (error) {
      console.error(error);
    }
  };
  const addressadd = showAddressCards && showAddress.length === 0 && (
    <>
      <div className="alert alert-info">You have no address saved</div>
      <DropdownAddress onSubmit={fetchUserProfile()} />
    </>
  );

  return (
    <div className="user-profile">
      {" "}
      <div className={`${classes.userHeader} container`}>
        <Breadcrumbs />
        <div className="card shadow-sm container mt-5 p-0 ">
          <div
            className={`${classes.header} card-header  py-3 d-flex justify-content-between`}
          >
            <h4>
              Welcome <span> {auth?.name}</span>
            </h4>
            <button
              className="btn btn-dark"
              onClick={() => setShowAddressCards(!showAddressCards)}
            >
              My Address
            </button>
          </div>
          <div className="card-body">
            <div className={classes.hero_profile}>
              <img
                src={userImage ? userImage : "https://via.placeholder.com/150"}
                alt="profile"
                className={`${classes.profile_img}  rounded-circle shadow-sm p-1 bg-white border border-2 border-red`}
              />

              <div className={classes.profile_info}>
                <h4 className="">{auth?.name}</h4>
                <p>{userData?.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className={classes.profile_form}>
                <form onSubmit={handleSubmit(onSubmit)} className="">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        {...register("firstName", {
                          required: true,
                          maxLength: 20,
                        })}
                        className=" d-flex w-100"
                        defaultValue={userData?.name}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        {...register("lastName", {
                          required: true,
                          maxLength: 20,
                        })}
                        className=" d-flex w-100"
                        defaultValue={userData?.lastname}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="email">Email</label>
                      <input
                        {...register("email")}
                        className=" d-flex w-100"
                        defaultValue={userData?.email}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="address">Address</label>
                      <input
                        {...register("address")}
                        className=" d-flex w-100"
                        defaultValue={address1}
                      />
                    </div>
                  </div>{" "}
                  <div className="row">
                    <div className="col">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        {...register("phone")}
                        className=" d-flex w-100"
                        defaultValue={userData?.phone}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="address">Address 2</label>
                      <input
                        {...register("address")}
                        className=" d-flex w-100"
                        defaultValue={userData?.name}
                      />
                    </div>
                  </div>{" "}
                  <input type="submit" />
                </form>
              </div>
            </div>{" "}
            <div className="d-flex justify-content-end gap-3 ">
              {" "}
              <a
                onClick={() => loggout()}
                className="btn btn-dark"
                href="/login"
              >
                LoggOut
              </a>
            </div>
          </div>
        </div>
        <div className="container mt-5 p-0  gap-3">
          <div>{showAddressCards && <h2>My Address</h2>}</div>

          {addressadd}
          <div className="d-flex gap-2">
            {showAddressCards &&
              showAddress.length > 0 &&
              showAddress.map((address) => (
                <div
                  className="card mb-3 py-2 px-3"
                  key={address._id}
                  style={{ width: "18em" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Name: {address.name}</h5>
                    <p className="card-text">
                      Addressline1: {address.addressline1}
                    </p>
                    <p className="card-text">
                      Addressline2: {address.addressline2}
                    </p>{" "}
                    <p className="card-text">Country: {address.country}</p>
                    <p className="card-text">City: {address.state}</p>
                    <p className="card-text">zipcode: {address.zipcode}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(address._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
