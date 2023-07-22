import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import { API_UPLOADS } from "../feed/PostMaker";
import { API_USERS } from "../../redux/actions/usersActions";
import { getProfilePic } from "../../redux/actions/loggedActions";

const ProfilePicModal = () => {
  // REDUX
  const logged = useSelector((state) => state.logged.loggedUser);
  const dispatch = useDispatch();
  // STATE
  const [imageSrc, setImageSrc] = useState("");
  const [settingState, setSettingState] = useState({
    file: new FormData(),
    userId: logged.id,
  });

  //UPLOAD FOTO PROFILO
  const uploadFile = async () => {
    try {
      const response = await fetch(API_UPLOADS + "/profile", {
        method: "POST",
        body: settingState.file,
        headers: {
          Authorization: "Bearer " + logged.auth,
        },
      });
      if (response.ok) {
        const fileSource = await response.json();
        setSettingState({
          file: fileSource,
          userId: settingState.userId,
        });
        return fileSource;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //PUT SULLO USER - user-profileImg
  const putSettings = async () => {
    const imgPic = await uploadFile();
    try {
      const response = await fetch(API_USERS + "/profilePic", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + logged.auth,
        },
        body: JSON.stringify({
          profileImg: imgPic,
          userId: settingState.userId,
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

  //FILE INPUT HANDLER
  const handleFile = (e) => {
    e.preventDefault();
    setSettingState((current) => {
      current.file.delete("file");
      current.file.append("file", e.target.files[0]);
      console.log(current.file.get("file"));
      // IMAGE PREVIEW
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
      }
      //
      return current;
    });
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await putSettings();
    dispatch(getProfilePic(data.profileImg));
    return data;
  };

  return (
    <Container fluid className="my-bbg">
      <Row className="justify-content-center w-100">
        {logged.username && (
          <Col xs={12} md={8} className=" m-auto">
            <Form
              onSubmit={(e) => handleSubmit(e)}
              className="d-flex flex-column align-items-center"
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

              {/* FILE INPUT */}
              <Form.Group controlId="formFileMultiple" className="m-3 p-2">
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) => handleFile(e)}
                />
              </Form.Group>
              {/* IMG PREVIEW */}

              <img
                src={imageSrc}
                className="rounded-circle m-auto shadow"
                width={200}
              />

              <div className="d-flex justify-content-end w-100 m-3">
                <span className=" btnInterDark m-3" type="submit">
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
export default ProfilePicModal;
