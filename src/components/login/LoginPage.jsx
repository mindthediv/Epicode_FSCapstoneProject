import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  handlePassword,
  handleUsername,
  postLogin,
} from "../../redux/actions/registerActions";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxRegister = useSelector((state) => state.register);

  const loginDto = {
    username: reduxRegister.user.username,
    password: reduxRegister.user.password,
  };

  return (
    <Container className="m-auto " id="loginPage">
      <Row className="justify-content-center">
        <Col xs={12} lg={8} className="loginForm lfMod">
          <h3>Benvenuto ;{")"}</h3>
          <Form
            className="d-flex flex-column justify-content-center align-items-center w-50 bgForm"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(postLogin(loginDto));
              navigate("/me");
            }}
          >
            <Form.Group className="mb-3 w-100 me-4" controlId="loginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
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

export default LoginPage;
