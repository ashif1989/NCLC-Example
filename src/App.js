import React, { useState, useRef } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import Draggable from "react-draggable";
import { Card } from "antd";
import "react-resizable/css/styles.css";
import EngineXpresslogo from "./EngineXpress-logo.png";
import logo from "./pwlogo 1.png";

const techLevels = [
  { id: 1, text: "No Tech" },
  { id: 2, text: "Low Tech" },
  { id: 3, text: "Tech" },
];

const Button = ({ text, onClick }) => (
  <button
    onClick={() => onClick(text)}
    className="p-2 bg-blue-500 text-white rounded"
    style={{
      width: "120px",
      textAlign: "center",
      margin: "5px",
      cursor: "pointer",
    }}
  >
    {text}
  </button>
);

const App = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [selectedTech, setSelectedTech] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [showImage, setShowImage] = useState(false); // Visibility state
  const nodeRef = React.useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleToggleChange = (event) => {
    setShowImage(event.target.checked);
  };

  const handleLoginClick = (message) => {
    setShowLogin(true);
    setLoginMessage(message);
  };

  const closeLoginCard = () => {
    setShowLogin(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setBackgroundImage(`url(${e.target.result})`);
      reader.readAsDataURL(file);
    }
  };

  const handleDragStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const DraggableImage = () => {
    const nodeRef = React.useRef(null);

    return (
      <Draggable nodeRef={nodeRef} position={position} onStop={handleDragStop}>
        <div ref={nodeRef} style={{ cursor: "move" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="Draggable"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                cursor: "move",
              }}
            />
          </div>
        </div>
      </Draggable>
    );
  };

  const getStyles = () => {
    switch (selectedTech) {
      case "No Tech":
        return {
          bg: "rgb(183,169,154)",
          left: "US and Non-US persons",
          center: "Technical Data/Information strictly prohibited",
          right: "US and Non-US persons",
          footerText:
            "Pratt & Whitney Proprietary: No-Technical Data. All Rights Reserved.",
        };
      case "Low Tech":
        return {
          bg: "rgb(239,182,97)",
          left: "US and Non-US persons",
          center: "Low Technical Data/Information Only",
          right: "US and Non-US persons",
          footerText:
            "Pratt & Whitney Proprietary: Low-Technical Data. All Rights Reserved.",
        };
      case "Tech":
        return {
          bg: "rgb(123,167,188)",
          left: "US Persons Only",
          center: "Technical Data/Information Permitted",
          right: "US Persons Only",
          footerText:
            "Pratt & Whitney Proprietary: High-Technical Data. All Rights Reserved.",
        };
      default:
        return { bg: "white", left: "", center: "", right: "", footerText: "" };
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust opacity
          zIndex: -1, // Send it behind content
        }}
      ></div>
      <div style={{ display: "flex", flex: 1, width: "100%" }}>
        {/* Sidebar */}
        <div
          style={{
            flex: "0 0 200px",
            padding: "20px",
            border: "1px solid gray",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h3>
            <strong>Login Options</strong>
          </h3>
          <Button
            text="Login via Ping"
            onClick={() => handleLoginClick("Login via Ping")}
          />
          <Button
            text="Login via Azure"
            onClick={() => handleLoginClick("Login via Azure")}
          />

          <h3>
            <strong>Banners</strong>
          </h3>
          {techLevels.map((btn) => (
            <Button key={btn.id} text={btn.text} onClick={setSelectedTech} />
          ))}

          <h3>
            <strong>Background Image</strong>
          </h3>
          <input
            type="file"
            accept="image/*"
            id="upload-button"
            onChange={handleFileChange}
          />
          <label htmlFor="upload-button">
            <button>Upload Image</button>
          </label>

          <FormControlLabel
            control={
              <Switch checked={showImage} onChange={handleToggleChange} />
            }
            label="Show Image"
          />
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "20px",
            backgroundImage: backgroundImage,
            backgroundSize: "cover", // Ensures it covers the full area
            backgroundRepeat: "no-repeat", // Prevents repetition
            backgroundPosition: "center", // Centers the image
            opacity: 1,
          }}
        >
          {/* Banner Display */}
          {selectedTech && (
            <div
              style={{
                padding: "10px",
                backgroundColor: getStyles().bg,
                color: "black",
                fontWeight: "bold",
                borderRadius: "5px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "20px",
                paddingRight: "20px",
                width: "100%",
              }}
            >
              <span>{getStyles().left}</span>
              <span style={{ fontWeight: "bold" }}>{getStyles().center}</span>
              <span>{getStyles().right}</span>
            </div>
          )}
          {showImage && <DraggableImage />}

          {/* Footer */}
          {selectedTech && (
            <div
              style={{
                padding: "10px",
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                borderRadius: "5px",
                marginTop: "auto",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              {getStyles().footerText}
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div
          onClick={closeLoginCard} // Click outside to close
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
            style={{
              width: 400,
              textAlign: "center",
              padding: "30px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              background: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img
                src={EngineXpresslogo}
                alt="Logo"
                style={{
                  width: "100px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <button
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  width: "180px",
                  textAlign: "center",
                }}
              >
                {loginMessage}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default App;
