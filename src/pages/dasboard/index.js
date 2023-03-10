import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ReactPhotoSphereViewer,
  MarkersPlugin,
} from "react-photo-sphere-viewer";
import "./styled.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "95%",
    bottom: "auto",
    height: "100%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
    backgroundColor: "transparent",
    border: "none",
  },
};

const images = [
  "milan.jpeg",
  "test_pano.jpeg",
  "pana_01.jpeg",
  "pano_02.jpeg",
  "test_pano.jpeg",
  "pana_01.jpeg",
  "pano_02.jpeg",
  "test_pano.jpeg",
  "pana_01.jpeg",
  "pano_02.jpeg",
];
const PanoModal = ({ modalIsOpen, closeModal, img }) => {
  const pSRef = React.createRef();

  const handleReady = (instance) => {
    const markersPlugs = instance.getPlugin(MarkersPlugin);
    if (!markersPlugs) return;
    console.log(markersPlugs);
    // markersPlugs.addMarker({
    //   id: "imageLayer2",
    //   imageLayer: "drone.png",
    //   size: { width: 220, height: 220 },
    //   position: { yaw: "130.5deg", pitch: "-0.1deg" },
    //   tooltip: "Image embedded in the scene"
    // });
    markersPlugs.addEventListener("select-marker", () => {
      console.log("asd");
    });
  };

  const plugins = [
    [
      MarkersPlugin,
      {
        // list of markers
        markers: [
          {
            // image marker that opens the panel when clicked
            id: "image",
            position: { yaw: "0.33deg", pitch: "0.1deg" },
            image: "pin-blue.png",
            anchor: "bottom center",
            size: { width: 32, height: 32 },
            tooltip: "Mountain peak. <b>Click me!</b>",
          },
          {
            // image marker rendered in the 3D scene
            id: "imageLayer",
            imageLayer: "drone.png",
            size: { width: 220, height: 220 },
            position: { yaw: "13.5deg", pitch: "-0.1deg" },
            tooltip: "Image embedded in the scene",
          },
        ],
      },
    ],
  ];

  const handleClick = (data) => {
    console.log(data);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modal-container">
        <img
          onClick={() => closeModal()}
          className="close-btn"
          src="close.svg"
          alt="close_modal"
        />

        <ReactPhotoSphereViewer
          ref={pSRef}
          src={img}
          height={"100vh"}
          width={"100%"}
          littlePlanet={false}
          onClick={handleClick}
          onReady={handleReady}
        ></ReactPhotoSphereViewer>
      </div>
    </Modal>
  );
};
const Dashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("ID")) {
        navigate("/signin");
    }
  }, [])
  return (
    <div>
      <PanoModal
        img={selectedImage}
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
      <div className="dashboard">
        {images?.map((img) => (
          <img
            onClick={() => {
              setModalIsOpen(true);
              setSelectedImage(img);
            }}
            src={img}
            alt="pano"
          />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
