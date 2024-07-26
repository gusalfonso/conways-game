// import { useState, useRef, useEffect } from "react";
// import "../styles/Monitor.css";
// import Board from "./Board";

// const Monitor: React.FC = () => {
//   const [powerOn, setPowerOn] = useState(false);
//   const [showBoard, setShowBoard] = useState(false);
//   const screenRef = useRef<HTMLDivElement>(null);
//   const timersRef = useRef<number[]>([]);

//   const handlePowerButtonClick = () => {
//     setPowerOn((prev) => !prev);
//     const powerLed = document.querySelector(".power-led");
//     const screen = screenRef.current;
//     if (!powerLed || !screen) return;

//     powerLed.classList.toggle("on");

//     if (powerLed.classList.contains("on")) {
//       timersRef.current.forEach((timer) => clearTimeout(timer));
//       timersRef.current = [];
//       screen.classList.remove("off");
//       startTyping(["cd game-of-life", "npm install", "npm run dev"]);
//     } else {
//       screen.innerHTML = "";
//       timersRef.current.forEach((timer) => clearTimeout(timer));
//       timersRef.current = [];
//       screen.classList.add("off");
//       setTimeout(() => {
//         setShowBoard(false);
//       }, 2500);
//     }
//   };

//   const startTyping = (texts: string[]) => {
//     let wait = 750;
//     const screen = screenRef.current;
//     if (!screen) return;

//     screen.innerHTML = "$ ";
//     texts.forEach((text) => {
//       wait += 750;
//       for (let i = 0; i < text.length; i++) {
//         const timer = setTimeout(() => {
//           if (screen) screen.innerHTML += text[i];
//         }, wait);
//         timersRef.current.push(timer);
//         wait += 50 + ~~(Math.random() * 50);
//       }

//       wait += 750;

//       const timer = setTimeout(() => {
//         if (screen) screen.innerHTML += "<br>$ ";
//       }, wait);
//       timersRef.current.push(timer);
//     });

//     const showBoardTimer = setTimeout(() => {
//       setShowBoard(true);
//     }, wait + 1500);
//     timersRef.current.push(showBoardTimer);
//   };

//   useEffect(() => {
//     return () => {
//       timersRef.current.forEach((timer) => clearTimeout(timer));
//     };
//   }, []);

//   return (
//     <div className="container">
//       <div className="computer-container">
//         <div className="monitor">
//           <div className="monitor-inner">
//             <div className="screen-container">
//               <div className="screen" ref={screenRef}>
//                 {showBoard ? <Board /> : ""}
//               </div>
//             </div>
//           </div>
//           <div className="monitor-bottom">
//             <div className="power-switch">
//               <div className="button" onClick={handlePowerButtonClick}></div>
//             </div>
//             <div className="power-led standby"></div>
//           </div>
//         </div>
//         <div className="monitor-base">
//           <div className="wheels-parent">
//             <div className="wheel"></div>
//             <div className="wheel"></div>
//           </div>
//         </div>
//         <div className="monitor-holder-container">
//           <div className="monitor-holder">
//             <div className="monitor-holder-inner"></div>
//             <div className="monitor-holder-inner-front"></div>
//             <div className="monitor-holder-inner-front bottom"></div>
//           </div>
//           <div className="monitor-holder-front"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Monitor;

import React, { useState, useRef, useEffect } from "react";
import "../styles/Monitor.css";
import Board from "./Board";

function Monitor() {
  const [powerOn, setPowerOn] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  function handlePowerButtonClick() {
    const powerLed = document.querySelector(".power-led");
    const screen = screenRef.current;
    if (!powerLed || !screen) return;

    powerLed.classList.toggle("on");

    if (powerLed.classList.contains("on")) {
      setPowerOn(true);
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
      screen.classList.remove("off");
      startTyping(["cd game-of-life", "npm install", "npm run dev"]);
      console.log(showBoard);
    } else {
      setPowerOn(false);
      screen.innerHTML = "";
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
      screen.classList.add("off");
      console.log(showBoard);
    }
  }

  function startTyping(texts: string[]) {
    let wait = 750;
    const screen = screenRef.current;
    if (!screen) return;

    screen.innerHTML = "$ ";
    texts.forEach((text) => {
      wait += 750;
      for (let i = 0; i < text.length; i++) {
        const timer = setTimeout(() => {
          if (screen) screen.innerHTML += text[i];
        }, wait);
        timersRef.current.push(timer);
        wait += 50 + ~~(Math.random() * 50);
      }

      wait += 750;

      const timer = setTimeout(() => {
        if (screen) screen.innerHTML += "<br>$ ";
      }, wait);
      timersRef.current.push(timer);
    });

    const clearScreenTimer = setTimeout(() => {
      if (screen) screen.innerHTML = "";
      setShowBoard(true);
    }, wait + 1500);
    timersRef.current.push(clearScreenTimer);
  }

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="container">
      <div className="computer-container">
        <div className="monitor">
          <div className="monitor-inner">
            <div className="screen-container">
              <div
                className={`screen ${!powerOn ? "off" : ""}`}
                ref={screenRef}
              >
                {showBoard ? <Board /> : ""}
              </div>
            </div>
          </div>
          <div className="monitor-bottom">
            <div className="power-switch">
              <div className="button" onClick={handlePowerButtonClick}></div>
            </div>
            <div className="power-led standby"></div>
          </div>
        </div>
        <div className="monitor-base">
          <div className="wheels-parent">
            <div className="wheel"></div>
            <div className="wheel"></div>
          </div>
        </div>
        <div className="monitor-holder-container">
          <div className="monitor-holder">
            <div className="monitor-holder-inner"></div>
            <div className="monitor-holder-inner-front"></div>
            <div className="monitor-holder-inner-front bottom"></div>
          </div>
          <div className="monitor-holder-front"></div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;
