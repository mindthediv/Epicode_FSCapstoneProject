import { useEffect, useRef, useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/actions/postActions";
import { API_POSTS } from "../../redux/actions/postActions";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const API_UPLOADS = "http://localhost:8080/api/uploads";

const PostMaker = () => {
  const navigate = useNavigate();
  //REDUX
  const reduxLogged = useSelector((state) => state.logged.loggedUser);
  const auth = reduxLogged.auth;
  const dispatch = useDispatch();
  // STATE
  const [imageSrc, setImageSrc] = useState("");
  const [postState, setPostState] = useState({
    text: "",
    file: new FormData(),
    userId: reduxLogged.id,
    title: "",
  });

  //SUB POST DELL'INPUT FILE (si implementerà nella post principale)
  const uploadFile = async () => {
    try {
      const response = await fetch(API_UPLOADS, {
        method: "POST",
        body: postState.file,
        headers: {
          Authorization: "Bearer " + auth,
        },
      });
      if (response.ok) {
        const fileSource = await response.json();
        setPostState({
          text: postState.text,
          file: fileSource,
          userId: postState.userId,
          title: postState.title,
        });
        return fileSource;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //POST PRINCIPALE
  const postAPost = async () => {
    const postFile = await uploadFile();
    try {
      const response = await fetch(API_POSTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
        body: JSON.stringify({
          text: postState.text,
          filePath: postFile,
          userId: postState.userId,
          title: postState.title,
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

  // HANDLER FILE INPUT
  const handleFile = (e) => {
    e.preventDefault();
    setPostState((current) => {
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

  // HANDLER DEL SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    postAPost();

    dispatch(getAllPosts());
    toast.success("Nuovo Post Creato!", {
      position: "top-center",
      autoClose: 3000,
      onClose: () => window.location.reload(),
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // ref
  const fileInput = useRef();

  return (
    <div className="mt-2 bg-light postMaker p-2">
      {/* TEXT AREA */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-1">
          <Form.Control
            type="text"
            placeholder="Titolo"
            className="p-2"
            onChange={(e) =>
              setPostState({
                text: postState.text,
                file: postState.file,
                userId: postState.userId,
                title: e.target.value,
              })
            }
          />
        </Form.Group>
        <div>
          {/* IMG PREVIEW */}
          <img src={imageSrc} alt="" className="imgPreview" />
        </div>
        <Form.Group className="mb-1" controlId="postTextInput">
          <Form.Control
            as="textarea"
            rows={5}
            className="postTextArea p-2"
            placeholder="Scrivi qualcosa..."
            onChange={(e) =>
              setPostState({
                text: e.target.value,
                file: postState.file,
                userId: postState.userId,
                title: postState.title,
              })
            }
          />
        </Form.Group>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => handleFile(e)}
              className="hidden"
              ref={fileInput}
            />
            {/* SPAN-BUTTONS X PICTURE, LOCATION, SETTINGS */}
            <span
              className="btnAddPostPic btnPmaker"
              onClick={() => fileInput.current.click()}
            >
              <i className="fa fa-images"></i>
            </span>

            <span className="btnPmaker btnPostLoc">
              <i className="fa fa-map-marker-alt"></i>
            </span>

            <span className="btnPmaker btnPostSett">
              <i className="fa fa-ellipsis-h"></i>
            </span>
          </div>
          <div className="d-flex align-items-coneter">
            {/* SUBMIT BUTTON */}
            <Button className="btnPmaker btnPostSub" type="submit">
              <i className="fa fa-paper-plane"></i>
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PostMaker;
