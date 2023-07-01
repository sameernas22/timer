import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Timer() {
  const [percentage, setPercentage] = useState(60);
  const [mval, setMval] = useState(60)
  const [added, setadded] = useState(false)
  const [skipped, setskipped] = useState(false)
  const [subbed, setsubbed] = useState(false)
  
  useEffect(() => {
    const tm = setTimeout(() => {
      if (percentage > 0 && skipped === false) {
        setPercentage(percentage - 1);
      }
      
    }, 1000);
    if(added === true){
        setadded(false)
        clearTimeout(tm)
        setMval(mval+10)
        setPercentage(percentage+10)
    }
    if(subbed === true){
        setsubbed(false)
        clearTimeout(tm)
       
        setPercentage(Math.abs(percentage-10))
    }
    if(skipped === true){
        setskipped(false)
        clearTimeout(tm)
        setPercentage(0)
        setMval(60)
    }
  },[percentage]);

  var mins = ""
  var secs = ""
  
  if(Math.floor(percentage/60)>9){
    mins = Math.floor(percentage/60)
  }else{
    mins = "0" + Math.floor(percentage/60)
  }
  if((percentage- Math.floor(percentage/60)*60)>9){
    secs = (percentage- Math.floor(percentage/60)*60)
  }else{
    secs = "0" + (percentage- Math.floor(percentage/60)*60)
  }
  return (
     <div >
        <CircularProgressbar value={percentage} maxValue={mval} text={`${mins}:${secs}`} />
        <div>
        <button onClick={()=>{
            setadded(true)
        }}>+10 Sec</button>
        <button onClick={()=>{
            setsubbed(true)
        }} >-10 Sec</button>
        </div>
        <button onClick={()=>{
            setskipped(true)
        }} >Skip</button>
        <button onClick={()=> {window.location.reload(false)}}>Next</button>
      </div>
  );
}

export default Timer;