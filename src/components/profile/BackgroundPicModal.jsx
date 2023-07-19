import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { API_UPLOADS } from "../feed/PostMaker";
import { API_USERS } from "../../redux/actions/usersActions";
import {
  getBackgroundPic,
  getProfilePic,
} from "../../redux/actions/loggedActions";

const BackgroundPicModal = () => {
  const logged = useSelector((state) => state.logged.loggedUser);
  const isLogged = useSelector((state) => state.logged.isLogged);
  const dispatch = useDispatch();
  const resetRef = useRef();
  const fileRef = useRef();
  const [settingState, setSettingState] = useState({
    file: new FormData(),
    userId: logged.id,
  });

  //Upload img background, torna nello state.file l'UUID del file sul server.
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

  //dopo l'upload del file input, ne unisce il risultato per reinviare l'settingState definitivo (da poster a getter)
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

  //handle File
  const handleFile = (e) => {
    e.preventDefault();
    setSettingState((current) => {
      current.file.delete("file");
      current.file.append("file", e.target.files[0]);
      console.log(current.file.get("file"));
      return current;
    });
  };

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await putSettings();
    dispatch(getBackgroundPic(data.backgroundImg));
    return data;
    resetRef.current.click();
  };

  return (
    <Container fluid id="profilePicModal">
      <Row className="justify-content-center w-100">
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

              {/* PROFILE IMG */}
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Immagine Profilo</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) => handleFile(e)}
                />
              </Form.Group>
              <img src="" alt="" />
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
