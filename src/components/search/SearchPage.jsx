import { Col, Container, Form, Row } from "react-bootstrap";
import NavUI from "../navbar/NavUI";
import { useSelector } from "react-redux";
import { API_USERS } from "../../redux/actions/usersActions";
import { useState } from "react";
import UserLabel from "./UserLabel";

const SearchPage = () => {
  // REDUX
  const logged = useSelector((state) => state.logged);
  // STATE
  const [srcState, setSrcState] = useState([]);

  //  OTTIENE LO USER CHE INIZIA CON Il DIGITATO (onChange)
  const getUserbyStart = async (value) => {
    if (value != "") {
      try {
        let resp = await fetch(API_USERS + "?value=" + value, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + logged.loggedUser.auth,
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (resp.ok) {
          let searchList = await resp.json();
          return searchList;
        } else {
          alert("Errore nella ricerca");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // INPUT HANDLER
  const handleChange = async (u) => {
    if (logged.loggedUser.auth) {
      let data = await getUserbyStart(u);
      setSrcState(data);
    }
  };

  return (
    <Container id="searchPage" className="vh100scroll">
      <Row>
        <Col>
          <Form className="p-3">
            <Form.Control
              type="text"
              id="searchInput"
              placeholder="Cerca"
              className="py-2"
              onChange={(e) => handleChange(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row className="flex-column">
        {srcState &&
          srcState.map((el, i) => {
            return (
              <Col>
                <UserLabel user={el} />
              </Col>
            );
          })}
      </Row>
      <Row>
        <Col>
          <NavUI />
        </Col>
      </Row>
    </Container>
  );
};
export default SearchPage;
