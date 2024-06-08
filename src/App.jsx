import { useState } from "react";

const App = () => {
  const [time, setTime] = useState({ milliSec: "00", sec: "0", min: "0" });
  const [status, setStatus] = useState("");
  const [lap, setLap] = useState([]);
  const [toggleStart, setToggleStart] = useState(true);
  const [toggleReset, setToggleReset] = useState(true);
  let { milliSec, sec, min } = time;

  const handleStart = () => {
    setStatus(setInterval(myFun, 10));
    setToggleStart(!toggleStart);
    setToggleReset(true);
  };

  const handleReset = () => {
    clearInterval(status);
    setTime({ milliSec: "00", sec: "0", min: "0" });
    setLap([]);
    setToggleReset(!toggleReset);
  };
  const handleStop = () => {
    clearInterval(status);
    setToggleStart(!toggleStart);
    setToggleReset(!toggleReset);
  };
  const handleLap = () => {
    const lapObj = {
      lapMin: time.min,
      lapSec: time.sec,
      lapMilliSec: time.milliSec,
    };
    setLap([...lap, lapObj]);
  };

  const myFun = () => {
    if (milliSec === 100) {
      milliSec = 0;
      sec++;
    }
    if (sec === 60) {
      sec = 0;
      min++;
    }
    milliSec++;
    setTime({ milliSec: milliSec, sec: sec, min: min });
  };
  return (
    <div className=" bg-[#22196c] flex font-sans text-white min-h-screen ">
      <div className="w-[400px] min-h-[600px]  bg-[#120d3a]  px-5 py-5 m-auto flex flex-col items-center">
        <div>
          <h5 className=" font-bold mt-14">STOPWATCH</h5>
        </div>
        <div className=" flex my-16 text-7xl">
          <div>{time.min < 10 ? "0" + time.min : time.min}</div>:
          <div>{time.sec < 10 ? "0" + time.sec : time.sec}</div>:
          <div>{time.milliSec}</div>
        </div>
        <div className="text-black flex justify-around w-full text-lg mb-8 font-semibold">
          <div>
            {toggleReset ? (
              <button
                onClick={handleLap}
                className="bg-[#333333] text-[#ffffff] px-6 py-4 rounded-full ">
                Lap
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="bg-[#333333] text-[#ffffff] px-6 py-4 rounded-full ">
                Reset
              </button>
            )}
          </div>
          <div>
            {toggleStart ? (
              <button
                onClick={handleStart}
                className="bg-[#0a2a12] text-[#30d158] px-6 py-4 rounded-full ">
                Start
              </button>
            ) : (
              <button
                onClick={handleStop}
                className="bg-[#330e0c] text-[#fe453b] px-6 py-4 rounded-full ">
                Stop
              </button>
            )}
          </div>
        </div>
        <div className="w-full">
          <div>
            {lap.map((item, i) => {
              return (
                <div className="flex justify-around text-xl" key={i}>
                  <div className="me-5">Lap {i + 1}</div>
                  <div>
                    {item.lapMin < 10 ? "0" + item.lapMin : item.lapMin}:
                    {item.lapSec < 10 ? "0" + item.lapSec : item.lapSec}:
                    {item.lapMilliSec}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
