import React, { useState, useEffect } from "react";

const LoggedOut = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const imageUrls = [
    "./static/DUET/hands.jpg",
    "./static/DUET/riri.jpg",
    "./static/DUET/tennis.jpg",
  ];

  useEffect(() => {
    function updateBackground() {
      setCurrentImage((currentIndex) => (currentIndex + 1) % imageUrls.length);
    }

    const intervalId = setInterval(updateBackground, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${imageUrls[currentImage]})`,
      }}
    >
      <h1 className="welcome">
        You don't have to fly Solo, <br /> find your
        <span className="duet"> DUET</span>!
      </h1>
      <p className="welcomeP">
        We are DUET! The Ultimate Events Social. Here you can find other event
        goers just like you, who wont let anything stop them from enjoying
        themselves. But let's be honest, it's always more fun with a friend.
        With DUET, you wont need to bribe your best friend or partner to see
        Taylor Swift. You can hit up, and meet other Swifties before or at the
        concert to enjoy together!
      </p>
    </div>
  );
};

export default LoggedOut;
