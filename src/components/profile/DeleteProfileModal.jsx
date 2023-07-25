import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_USERS, deleteUser } from "../../redux/actions/usersActions";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/actions/loggedActions";

const DeleteProfileModal = () => {
  const navigate = useNavigate();
  // REDUX
  const logged = useSelector((state) => state.logged.loggedUser);
  const dispatch = useDispatch();

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(deleteUser(logged.id));

    toast.success("Utente eliminato! :'(", {
      position: "top-center",
      autoClose: 3000,
      onClose: () => {
        dispatch(logOut());
        navigate("/");

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
          <Col xs={12} md={8} className="d-flex flex-column align-items-center">
            <span className="small text-light text-center w-100 p-2">
              Non sarà più possibile recuperarlo.
            </span>
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

              <div className="d-flex justify-content-end w-100 m-3">
                <span
                  className=" m-auto text-light bg-danger p-1 rounded"
                  onClick={(e) => handleSubmit(e)}
                >
                  Elimina Profilo
                </span>
              </div>
            </Form>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default DeleteProfileModal;
