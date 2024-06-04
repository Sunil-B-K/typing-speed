import React, { useEffect, useRef, useState } from 'react'
import './style.css';
const paragrap="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aperiam obcaecati sunt voluptates. Ea molestias reprehenderit accusamus blanditiis. Voluptatibus beatae minima blanditiis aliquid ducimus asperiores esse explicabo aperiam quas tempore"

function Typingtext() {
  const inputref=useRef(null)
  const charref= useRef([])
  const maxtime=60
  const[timeout,settimeout]=useState(maxtime)
  const[mistake,setmistake]=useState(0)

  const[wpm,setwpm]=useState(0)
  const[cpm,setcpm]=useState(0)
  const[charindex,setcharindex]=useState(0)
  const[typing ,settyping]=useState(false)
 
  const[currentworng,setcurrentworng]=useState([])
  useEffect(()=>{
     inputref.current.focus()
    setcurrentworng(Array(charref.current.length).fill(''))
  },[])

  useEffect(()=>{
    let interval
    if(typing&&timeout>0){
    interval=setInterval(()=>{
      settimeout(timeout-1);
      let correntschars=charindex-mistake;
      let totalTime=maxtime-timeout;
      let cpm =correntschars*(60/totalTime)
      cpm=cpm<0|| !cpm|| cpm === Infinity ?0:cpm;
      setcpm(parseInt(cpm,10))
      let wpm=Math.round((correntschars/5/totalTime)*60)
      wpm=wpm<0 ||!wpm ||wpm===Infinity?0:wpm;
      setwpm(wpm)
    },1000);
    } else if(timeout===0){
       clearInterval(interval)
       settyping(false)
    }
    return()=>{
      clearInterval(interval)
    };

  },[typing,timeout])

  const restgame=()=>{
    settyping(false);
    settimeout(maxtime);
    setcharindex(0)
    setmistake(0)
    setcpm(0)
    setwpm(0)
   console.log("its woking")
    setcurrentworng(Array(charref.current.length).fill(''))
    inputref.current.focus()
  
  }

const handlechange=(e)=>{
  const charaters=charref.current
  let currentchar=charref.current[charindex]
  let typechar=e.target.value.slice(-1)
  if(charindex<charaters.length && timeout>0){
    if(!typing){
      settyping(true)
    }
    if(typechar==currentchar.textContent)
      {
       setcharindex( charindex+1)
       currentworng[charindex]="correct"
      }else{
        setcharindex( charindex+1)
        setmistake(mistake+1)
        currentworng[charindex]="worng"
      }
      if(charindex===charaters.length-1) settyping(false)
  }else{
settyping(false)
}

}
  return (
    <div className='container'>
      <div className="text">
        <input type="text" ref={inputref} className='inputfiled' onChange={handlechange}/>
        {paragrap.split('').map((char,index)=>(
        <span key={index} className={`char ${index===charindex?"active":""}  ${currentworng[index]}`} 
        ref={(e)=>charref.current[index]=e}>
          {char}
          </span>
       ))}
      </div>
      <div className="result">
        <p>Time left:<strong>{timeout}</strong></p>
        <p> Mistake:  <strong>{mistake}</strong></p>
        <p>WPM:      <strong>{wpm}</strong></p>
        <p>CPM:      <strong>{cpm}</strong></p>
        <button className='btn' onClick={restgame}>Try Again</button>
      </div>
    </div>
  )
}

export default Typingtext
