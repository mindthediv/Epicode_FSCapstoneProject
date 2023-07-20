import { useEffect } from "react";
import { API_UPLOADS } from "../feed/PostMaker";
import { useSelector } from "react-redux/es";
import { useState } from "react";

const NavUI = () => {
  const logged = useSelector((state) => state.logged.loggedUser);
  const [profileImg, setProfileImg] = useState(null);

  const getProfilePic = async () => {
    try {
      const response = await fetch(
        API_UPLOADS + "/profile/" + logged.profileImg,
        {
          method: "GET",
          headers: {
            "Content-Type": "blob",
            Authorization: "Bearer " + logged.auth,
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        setProfileImg(blob);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const handleEffect = async () => {
      getProfilePic();
    };
    handleEffect();
  }, []);

  return (
    <div className="navUi fixed-bottom d-flex align-items-center justify-content-between px-4">
      <img src="/assets/imgs/logoAlpha.png" width={60} />
      <span className="btnNavUi">
        <i className="fas fa-search"></i>
      </span>
      <span className="btnNavUi">
        <i className="fas fa-plus"></i>
      </span>
      {profileImg != null && (
        <img
          src={URL.createObjectURL(profileImg)}
          alt=""
          width={50}
          height={50}
          className="rounded-circle"
        />
      )}
    </div>
  );
};

export default NavUI;
