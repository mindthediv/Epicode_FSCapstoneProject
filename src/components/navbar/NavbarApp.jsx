import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT, logOut } from "../../redux/actions/loggedActions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PostMaker, { API_UPLOADS } from "../feed/PostMaker";
import Modal from "react-bootstrap/Modal";

const NavbarApp = () => {
  const isLogged = useSelector((state) => state.logged.isLogged);
  const logged = useSelector((state) => state.logged.loggedUser);
  const [pImg, setPImg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [masterModal, setMasterModal] = useState(false);
  const handleMasterModal = () => setMasterModal(true);
  const closeMasterModal = () => setMasterModal(false);

  const handleHome = () => {
    let sign;
    isLogged ? (sign = "/feed") : (sign = "/");
    return sign;
  };
  //FETCH DELL'IMMAGINE PROFILO
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
        setPImg(blob);
        console.log(blob);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   if (isLogged) {
  //     let gpp = async () => {
  //       await getProfilePic();
  //     };
  //     gpp();
  //   }
  // }, [isLogged]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary p-0" id="navbarApp">
      <Container fluid>
        <Navbar.Brand href={handleHome()}>
          <img
            width={60}
            src="assets/imgs/myLogo2.png"
            className="border rounded me-3"
          />
        </Navbar.Brand>
        {/* Dropdown */}
        {logged ? (
          <div className="d-flex me-3">
            <NavDropdown
              title={
                <span>
                  {pImg && (
                    <Image
                      src={URL.createObjectURL(pImg)}
                      alt="Logo"
                      width={60}
                      height={60}
                      className="rounded-circle"
                      onClick={navigate("/me")}
                    />
                  )}
                  Profilo
                </span>
              }
              id="navbarScrollingDropdown"
              className="dropbottom me-3"
            >
              {/* Loggato ? menu : login */}
              {isLogged ? (
                <div className="text-center">
                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(logOut());
                      navigate("/");
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/me">Me</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/profileSettings">
                    Impostazioni
                  </NavDropdown.Item>
                </div>
              ) : (
                <NavDropdown.Item
                  className="me-3"
                  onClick={() => navigate("/login")}
                >
                  Login
                </NavDropdown.Item>
              )}
            </NavDropdown>

            {/* ADD POST MODAL */}
            <span onClick={handleMasterModal}>
              <i className="fa fa-plus "></i>
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
          </div>
        ) : (
          <NavDropdown.Item onClick={() => navigate("/login")}>
            Login
          </NavDropdown.Item>
        )}
        {/* Searchbar */}
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Cerca..."
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Cerca</Button>
        </Form>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-between">
          <Nav
            className="my-2 my-lg-0 "
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* <Nav.Link href="#action1">Home</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarApp;
