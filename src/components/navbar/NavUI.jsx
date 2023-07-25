import { useEffect } from "react";
import { API_UPLOADS } from "../feed/PostMaker";
import { useDispatch, useSelector } from "react-redux/es";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Modal } from "react-bootstrap";
import PostMaker from "../feed/PostMaker";
import { logOut } from "../../redux/actions/loggedActions";
import store from "../../redux/store/store";

const NavUI = () => {
  const navigate = useNavigate();
  // REDUX
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.logged.loggedUser);
  const currentState = store.getState();
  const u = currentState.logged.loggedUser;
  const isLogged = useSelector((state) => state.logged.isLogged);
  // STATE
  const [profileImg, setProfileImg] = useState(null);
  // MODAL
  const [masterModal, setMasterModal] = useState(false);
  const handleMasterModal = () => setMasterModal(true);
  const closeMasterModal = () => setMasterModal(false);

  // HANDLER TASTO HOME
  const handleHome = () => {
    isLogged ? navigate("/feed") : navigate("/");
  };

  useEffect(() => {
    const getProfilePic = async () => {
      try {
        const response = await fetch(API_UPLOADS + "/profile/" + u.profileImg, {
          method: "GET",
          headers: {
            "Content-Type": "blob",
            Authorization: "Bearer " + u.auth,
          },
        });
        if (response.ok) {
          const blob = await response.blob();
          setProfileImg(blob);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const handleEffect = async () => {
      if (logged) {
        getProfilePic();
      }
    };
    handleEffect();
  }, [logged]);

  useEffect(() => {}, []);

  return (
    <div className="navUi fixed-bottom d-flex align-items-center justify-content-evenly">
      <img
        src="/assets/imgs/logoAlpha2.png"
        width={60}
        onClick={() => handleHome()}
      />
      <span onClick={() => navigate("/search")}>
        <i className="fas fa-search"></i>
      </span>
      {/* ADD POST MODAL */}
      <span onClick={handleMasterModal}>
        <i className="fas fa-plus "></i>
      </span>
      <Modal
        show={masterModal}
        onHide={closeMasterModal}
        centered
        className="masterModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>CREA UN POST</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostMaker />
        </Modal.Body>
      </Modal>
      {window.location.pathname == "/me" ? (
        <Dropdown>
          {profileImg ? (
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{
                backgroundImage:
                  "url('" + URL.createObjectURL(profileImg) + "')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "transparent",
              }}
              className="w-100 h-100 border-0 rnd"
            >
              <div
                onClick={() => {
                  navigate("/me");
                }}
              />
            </Dropdown.Toggle>
          ) : (
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{
                backgroundImage:
                  "url('assets/imgs/placeholders/userPlaceholder.png')",
                backgroundSize: "cover",
                backgroundColor: "transparent",
                backgroundPosition: "center",
              }}
              className="w-100 h-100 border-0 rnd"
            >
              <div
                onClick={() => {
                  navigate("/me");
                }}
              />
            </Dropdown.Toggle>
          )}
          <Dropdown.Menu className="fs-3 text-center vw100 dropProfile">
            <Dropdown.Item
              className="p-3"
              onClick={() => {
                dispatch(logOut());

                navigate("/");

                window.location.reload();
              }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <div>
          {profileImg != null && (
            <div
              style={{
                backgroundImage:
                  "url('" + URL.createObjectURL(profileImg) + "')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="w-100 h-100 border-0 rnd"
              onClick={() => navigate("/me")}
            ></div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavUI;
