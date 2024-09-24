import React from 'react';
import '../styles/Shows.css';
import { useState,useEffect } from 'react';

const Shows = () => {
  let currentDate = new Date();
  const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let showDates = [];
  const [isActive, setIsActive]= useState(false);
  const handleDateClick = (e)=>{
    setIsActive(true);
    console.log(e.target);
  }
  for(let i=0;i<10;i++){    
    showDates.push(<li key={currentDate}  onClick={handleDateClick}>
      <div className='dateButtons' >
            <p className='dateText'>{currentDate.getDate()} </p>
            <p className='monthText'>{monthList[currentDate.getMonth()]}</p>
      </div>
      </li>);
    currentDate.setDate(currentDate.getDate()+1);
  }
  return (
    <div className='shows'>
      <div className='showsTitle'> Show Timings</div>
      <ul className='showDateContainer'>
        {showDates}
      </ul>
      hi
    </div>
  )
}

export default Shows
