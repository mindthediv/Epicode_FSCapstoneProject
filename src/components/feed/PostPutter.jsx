import { useEffect, useRef, useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../../redux/actions/postActions";
import { API_POSTS } from "../../redux/actions/postActions";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

export const API_UPLOADS = "http://localhost:8080/api/uploads";

const PostPutter = ({ post }) => {
  const navigate = useNavigate();
  //REDUX
  const reduxLogged = useSelector((state) => state.logged.loggedUser);
  const auth = reduxLogged.auth;
  const dispatch = useDispatch();
  // STATE
  const [imageSrc, setImageSrc] = useState("");
  const [postState, setPostState] = useState({
    text: post.text,
    file: new FormData(),
    userId: reduxLogged.id,
    title: post.title,
  });
  // MODAL
  const [masterModal, setMasterModal] = useState(false);
  const handleMasterModal = () => setMasterModal(true);
  const closeMasterModal = () => setMasterModal(false);

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
  //PUT PRINCIPALE
  const putPost = async () => {
    const postFile = await uploadFile();
    try {
      const response = await fetch(API_POSTS, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
        body: JSON.stringify({
          text: postState.text,
          filePath: postFile,
          userId: postState.userId,
          title: postState.title,
          postId: post.id,
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
      return current;
    });
  };

  // HANDLER DEL SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    let posted = false;
    posted = await putPost();
    if (posted) {
      dispatch(getAllPosts());
      toast.success("Post Modificato!", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => navigate("/feed"),
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // HANDLER DELETE
  const handleDelete = async (id) => {
    dispatch(deletePost(id));
  };

  // ref
  const imgBox = useRef();
  const fileInput = useRef();

  return (
    <div className="mt-2 bg-light PostPutter p-2">
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
            value={postState.title}
          />
        </Form.Group>
        <div>
          {/* IMG PREVIEW */}
          <img src={imageSrc} alt="" ref={imgBox} className="imgPreview" />
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
            value={postState.text}
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
            {/* SPAN-BUTTONS - PICTURE, LOCATION, SETTINGS, DELETE */}
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

            <span
              className="btnPmaker bg-danger text-dark"
              onClick={handleMasterModal}
            >
              <i className="fa fa-trash"></i>
            </span>
            <Modal
              show={masterModal}
              onHide={closeMasterModal}
              centered
              className="masterModal"
            >
              <Modal.Header closeButton>
                <Modal.Title className="text-center">
                  Eliminare il post?
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex flex-column align-items-center p-3">
                <small className="text-muted m-2">
                  Non sarà più possibile recuperarlo
                </small>
                <div>
                  <Button
                    variant="warning"
                    className="px-3 py-2 m-2"
                    onClick={() => handleDelete(post.id)}
                  >
                    Elimina
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
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

export default PostPutter;
