import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleEmail,
  handleFirstName,
  handleLastName,
  handlePassword,
  handleUsername,
  postRegister,
  postLogin,
} from "../../redux/actions/registerActions";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";
import { logIn } from "../../redux/actions/loggedActions";

const RegisterPage = () => {
  const resetRef = useRef();
  const navigate = useNavigate();
  //REDUX
  const dispatch = useDispatch();

  const reduxRegister = useSelector((state) => state.register);

  const loginDto = {
    username: reduxRegister.user.username,
    password: reduxRegister.user.password,
  };

  return (
    <Container
      fluid
      id="registerPage"
      className="d-flex justify-content-center align-items-center p-4 "
    >
      <Row className="d-flex align-items-center">
        {/* REGISTER FORM */}
        <Col className="registerForm p-4">
          {/* ON SUBMIT */}
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(postRegister(reduxRegister.user));
              toast.success("Utente registrato con successo! ", {
                position: "top-center",
                autoClose: 500,
                onClose: () => navigate("/login"),
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              resetRef.current.click();
            }}
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
            {/* FIRSTNAME */}
            <div className="d-flex justify-content-between">
              <Form.Group
                id="loginFirstName"
                className="mb-3 midSize w-50 me-4"
                controlId="registerFirstName"
              >
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nome"
                  onChange={(e) => {
                    dispatch(handleFirstName(e.target.value));
                  }}
                />
              </Form.Group>
              {/* LASTNAME */}
              <Form.Group className="mb-3  w-50 " controlId="registerLastName">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Cognome"
                  onChange={(e) => {
                    dispatch(handleLastName(e.target.value));
                  }}
                />
              </Form.Group>
            </div>
            {/* USERNAME */}
            <div className="d-flex justify-content-between">
              <Form.Group
                className="mb-3 w-50 me-4"
                controlId="registerUsername"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    dispatch(handleUsername(e.target.value));
                  }}
                />
              </Form.Group>
              {/* EMAIL */}
              <Form.Group className="mb-3 w-50 " controlId="registerEmail">
                <Form.Label>Indirizzo email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    dispatch(handleEmail(e.target.value));
                  }}
                />
              </Form.Group>
            </div>
            {/* PASSWORD */}
            <Form.Group className="mb-3 w-50" controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  dispatch(handlePassword(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Text className="small d-block mb-3">
              Non temere, non condivideremo le tue informazioni con nessuno e
              saranno protette con massima sicurezza.
            </Form.Text>
            {/* BUTTONS */}
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary-outline border  border-secondary"
                className=" p-3 mb-3"
                type="reset"
                ref={resetRef}
              >
                Resetta i campi
              </Button>

              <Button
                variant="light"
                className=" btnSub p-3 mb-3 me-2"
                type="submit"
              >
                Iscriviti!
              </Button>
            </div>
          </Form>
        </Col>
        {/* LOGIN FORM */}
        <Col className="loginForm p-4">
          <h3>Già iscritto? ;{")"}</h3>
          <Form
            className="d-flex flex-column justify-content-center align-items-center"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(postLogin(loginDto));
              navigate("/me");
            }}
          >
            <Form.Group className="mb-3 w-100 me-4" controlId="loginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  dispatch(handleUsername(e.target.value));
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3 w-100" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  dispatch(handlePassword(e.target.value));
                }}
              />
            </Form.Group>
            <Button
              variant="transparent"
              className="p-3 px-4 mb-3 btnLogin"
              type="submit"
            >
              Accedi!
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
