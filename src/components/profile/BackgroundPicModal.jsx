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
import { getBackgroundPic } from "../../redux/actions/loggedActions";

const BackgroundPicModal = () => {
  const resetRef = useRef();
  // REDUX
  const logged = useSelector((state) => state.logged.loggedUser);
  const dispatch = useDispatch();
  // STATE
  const [settingState, setSettingState] = useState({
    file: new FormData(),
    userId: logged.id,
  });

  //UPLOAD FOTO BACKGROUND
  const uploadFile = async () => {
    try {
      const response = await fetch(API_UPLOADS + "/background", {
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

  //PUT SULLO USER - user.backgroundImg
  const putSettings = async () => {
    const imgPic = await uploadFile();
    try {
      const response = await fetch(API_USERS + "/backgroundPic", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + logged.auth,
        },
        body: JSON.stringify({
          backgroundImg: imgPic,
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
      return current;
    });
  };

  //SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await putSettings();
    dispatch(getBackgroundPic(data.backgroundImg));
    return data;
  };

  return (
    <Container fluid id="profilePicModal">
      <Row className="justify-content-center w-100">
        {/* waiter */}
        {logged.username && (
          <Col xs={12} md={8} className=" m-auto">
            <Form onSubmit={(e) => handleSubmit(e)}>
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
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Immagine di Background</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) => handleFile(e)}
                />
              </Form.Group>

              {/* BUTTONS */}
              <div className="d-flex justify-content-between">
                <Button
                  variant="light"
                  className=" p-3 mb-3"
                  type="reset"
                  ref={resetRef}
                >
                  Annulla Modifiche
                </Button>

                <Button
                  variant="warning"
                  className=" btnSub p-3 mb-3 me-2"
                  type="submit"
                >
                  Salva Modifiche
                </Button>
              </div>
            </Form>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default BackgroundPicModal;
