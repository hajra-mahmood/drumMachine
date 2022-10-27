import {useState, useEffect} from 'react';
import './App.scss';
const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];
function App() {
  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState("");
  const [speed, setSpeed] = useState(0.5);
  const playRecording = () => {
    let recordArray = recording.split(" ");
    let index = 0;
    const interval = setInterval(
      () => {
        const audioTag = document.getElementById(recordArray[index]);
        audioTag.currentTime = 0;
        audioTag.volume = volume;
        audioTag.play();
        index++;
      }, speed * 600);
    setTimeout(() => clearInterval(interval), speed * 600 * recordArray.length - 1);
  };
  return (
    <div className="App">
      <h2 data-shadow='My Drum Machine!' className ="text-center">My Drum Machine!</h2> <br/>
     <div className = "container">
      {audioClips.map(clip => <Pad key = {clip.id} clip = {clip} volume = {volume} setRecording = {setRecording}/> )}
     <br/>
     <div className = "text-center volume-box">
     <h4 className='volume-heading'>Volume</h4>
     <br />
     <input onChange = {(e) => {setVolume(e.target.value)}} className = "range-style vRange" type = "range" step = "0.01" value ={volume} min = "0" max = "1.2" />
     </div><br/>
     <div className = "text-center speed-box"> <h4 className = "speed-heading">Speed</h4>
     <br/>
     <input onChange = {(e) => {setSpeed(e.target.value)}} className = "range-style sRange" type = "range" step = "0.01" value ={speed} min = "0.1" max = "1.2" />
     <br/></div>
    
     </div>
     <div  className = "arrayBox">
      
      
     <br/>
     
    {recording && 
    <><br/><div className ="recordingList">
     <h3>You played : {recording}</h3></div><div className = "buttonBox"><button onClick = {playRecording} className = "btn playB">Play</button>
    <button onClick = {() => setRecording("")}className = "btn clearB">Clear</button></div></>}
    
    </div>
    </div>
  );
}
function Pad({clip, volume, setRecording}) {
  const [active, setActive] = useState(false)
  const playSound =  () => {
  const audioTag = document.getElementById(clip.keyTrigger);
  audioTag.currentTime = 0;
  audioTag.volume = volume;
  setActive(true);
  setTimeout(() => setActive(true), 200)
  audioTag.play();
  setRecording((prev) => prev + clip.keyTrigger + " ")
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
  }
  
});
const handleKeyPress = (e) => {
  if (e.keyCode === clip.keyCode)
  playSound();
}
return (
  <div className = "pads-container">
  <div onClick = {playSound} className = {`pads btn btn-secondary m-3 ${active && "btn-warning"}`}>
    <audio id = {clip.keyTrigger} className = "clip" src = {clip.url} />{clip.keyTrigger}</div>
    </div>)
}

export default App;
