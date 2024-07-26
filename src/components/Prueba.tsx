import React, { useState, useEffect } from "react";

const TypingEffect: React.FC<{ text: string; speed?: number }> = ({
  text,
  speed = 100,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      console.log(index);
      index = index + 1;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <div>{displayedText}</div>;
};

const TypingComponentTest: React.FC = () => {
  return (
    <div>
      <h1>Typing Effect Demo</h1>
      <TypingEffect
        text="Hello, this text is being typed out character by character!"
        speed={200}
      />
    </div>
  );
};

export default TypingComponentTest;
