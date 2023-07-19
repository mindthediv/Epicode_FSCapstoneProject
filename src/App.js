import "./sass/styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/HomePage";
import NavbarApp from "./components/navbar/NavbarApp";
import FooterApp from "./components/footer/FooterApp";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/login/RegisterPage";
import FeedPage from "./components/feed/FeedPage";
import ProfilePage from "./components/profile/ProfilePage";
import "react-toastify/dist/ReactToastify.css";
import CrAreaPage from "./components/crAreas/CrArea";
import ProfileSettings from "./components/profile/ProfileSettings";
import UserProfile from "./components/profile/users/UserProfile";
function App() {
  return (
    <BrowserRouter>
      <div className="App" id="App">
        <Container fluid>
          <header className="sticky-top">
            <Row>
              <Col>
                <NavbarApp />
              </Col>
            </Row>
          </header>
          <main>
            <Row>
              <Col>
                <Routes>
                  <Route path="/" element={<Home id="homeBody" />}></Route>
                  <Route path="/register" element={<RegisterPage />}></Route>
                  <Route path="/login" element={<LoginPage />}></Route>
                  <Route path="/me" element={<ProfilePage />}></Route>
                  <Route
                    path="/profileSettings"
                    element={<ProfileSettings />}
                  ></Route>
                  <Route path="/feed" element={<FeedPage />}></Route>
                  <Route path="/crArea/:area" element={<CrAreaPage />}></Route>
                  <Route
                    path="/users/:userId"
                    element={<UserProfile />}
                  ></Route>
                </Routes>
              </Col>
            </Row>
          </main>
          <footer>
            <Row>
              <Col>
                <FooterApp />
              </Col>
            </Row>
          </footer>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
