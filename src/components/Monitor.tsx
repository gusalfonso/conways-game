// import { useState, useRef, useEffect } from "react";
// import "../styles/Monitor.css";
// import Board from "./Board"; // Importa tu componente Board

// const Monitor: React.FC = () => {
//   const [powerOn, setPowerOn] = useState(false);
//   const screenRef = useRef<HTMLDivElement>(null);
//   const timersRef = useRef<number[]>([]);

//   const handlePowerButtonClick = () => {
//     setPowerOn(!powerOn);
//     const powerLed = document.querySelector(".power-led");
//     const screen = screenRef.current;
//     if (!powerLed || !screen) return;

//     powerLed.classList.toggle("on");

//     if (powerLed.classList.contains("on")) {
//       timersRef.current.splice(0);
//       screen.classList.remove("off");
//       startTyping(["cd game-of-life", "npm install", "npm run dev"]);
//     } else {
//       screen.innerHTML = "";
//       timersRef.current.forEach((timer) => clearTimeout(timer));
//       timersRef.current.splice(0);
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
//   };

//   return (
//     <div className="container">
//       <div className="computer-container">
//         <div className="monitor">
//           <div className="monitor-inner">
//             <div className="screen-container">
//               <div className="screen" ref={screenRef}>
//                 <Board />
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

// import { useState, useRef, useEffect } from "react";
// import "../styles/Monitor.css";
// import Board from "./Board"; // Importa tu componente Board

// const Monitor: React.FC = () => {
//   const [powerOn, setPowerOn] = useState(false);
//   const [showBoard, setShowBoard] = useState(false); // Añadido para controlar la visibilidad del Board
//   const screenRef = useRef<HTMLDivElement>(null);
//   const timersRef = useRef<number[]>([]);

//   const handlePowerButtonClick = () => {
//     setPowerOn(!powerOn);
//     const powerLed = document.querySelector(".power-led");
//     const screen = screenRef.current;
//     if (!powerLed || !screen) return;

//     powerLed.classList.toggle("on");

//     if (powerLed.classList.contains("on")) {
//       timersRef.current.splice(0);
//       screen.classList.remove("off");
//       startTyping(["cd game-of-life", "npm install", "npm run dev"]);
//     } else {
//       screen.innerHTML = "";
//       timersRef.current.forEach((timer) => clearTimeout(timer));
//       timersRef.current.splice(0);
//       setShowBoard(false); // Oculta el Board si se apaga el monitor
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

//     // Espera 1000 milisegundos y luego muestra el Board
//     const showBoardTimer = setTimeout(() => {
//       setShowBoard(true); // Muestra el Board
//     }, wait + 1000); // Añade 1000ms al final del tiempo total
//     timersRef.current.push(showBoardTimer);
//   };

//   return (
//     <div className="container">
//       <div className="computer-container">
//         <div className="monitor">
//           <div className="monitor-inner">
//             <div className="screen-container">
//               <div className="screen" ref={screenRef}>
//                 {showBoard && <Board />}{" "}
//                 {/* Muestra el Board si showBoard es true */}
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

import { useState, useRef, useEffect } from "react";
import "../styles/Monitor.css";
import Board from "./Board"; // Importa tu componente Board

const Monitor: React.FC = () => {
  const [powerOn, setPowerOn] = useState(false);
  const [showBoard, setShowBoard] = useState(false); // Controla la visibilidad del Board
  const screenRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  const handlePowerButtonClick = () => {
    setPowerOn((prev) => !prev);
    const powerLed = document.querySelector(".power-led");
    const screen = screenRef.current;
    if (!powerLed || !screen) return;

    powerLed.classList.toggle("on");

    if (powerLed.classList.contains("on")) {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
      screen.classList.remove("off");
      setShowBoard(false);
      startTyping(["cd game-of-life", "npm install", "npm run dev"]);
    } else {
      screen.innerHTML = "";
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
      setShowBoard(false);
    }
  };

  const startTyping = (texts: string[]) => {
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

    // Espera 1000 milisegundos después de terminar de teclear el texto antes de mostrar el Board
    const showBoardTimer = setTimeout(() => {
      setShowBoard(true); // Muestra el Board
    }, wait + 1000); // Añade 1000ms al tiempo total de tipeo
    timersRef.current.push(showBoardTimer);
  };

  useEffect(() => {
    return () => {
      // Limpia los temporizadores cuando el componente se desmonte
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="container">
      <div className="computer-container">
        <div className="monitor">
          <div className="monitor-inner">
            <div className="screen-container">
              <div className="screen" ref={screenRef}>
                {showBoard && <Board />}{" "}
                {/* Muestra el Board si showBoard es true */}
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
};

export default Monitor;
