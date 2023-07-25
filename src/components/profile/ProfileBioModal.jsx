import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_UPLOADS } from "../feed/PostMaker";
import { API_USERS } from "../../redux/actions/usersActions";
import { getProfilePic } from "../../redux/actions/loggedActions";
import { useNavigate } from "react-router-dom";

const ProfileBioModal = () => {
  const navigate = useNavigate();
  // REDUX
  const logged = useSelector((state) => state.logged.loggedUser);
  const dispatch = useDispatch();
  // STATE
  const [bio, setBio] = useState("");

  //PUT SULLO USER - user-profileImg
  const putSettings = async () => {
    try {
      const response = await fetch(API_USERS, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + logged.auth,
        },
        body: JSON.stringify({
          bio: bio,
          userId: logged.id,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    putSettings();

    toast.success("Bio modificata!", {
      position: "top-center",
      autoClose: 3000,
      onClose: () => {
        navigate("/me");
        window.location.reload();
      },
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Container fluid className="my-bbg">
      <Row className="justify-content-center w-100">
        {logged.username && (
          <Col xs={12} md={8} className=" m-auto w-100">
            <Form
              onSubmit={(e) => handleSubmit(e)}
              className="d-flex flex-column align-items-center w-100"
            >
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />

              {/* BIO INPUT */}

              <Form.Control
                as="textarea"
                rows={5}
                className="w-100 p-2 mt-2"
                placeholder="Scrivi qualcosa..."
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              />

              <div className="d-flex justify-content-end w-100 m-3">
                <span
                  className=" btnInterDark m-3"
                  onClick={(e) => handleSubmit(e)}
                >
                  <i className="far fa-save btnConfirm"></i>
                </span>
              </div>
            </Form>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default ProfileBioModal;
