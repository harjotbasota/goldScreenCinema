import React from 'react';
import '../styles/Footer.css';
import Copyright from '@mui/icons-material/Copyright';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className='footer'>
      <div className='copyright'> <Copyright/> {year} All rights reserved</div>
      <div className='socialMediaLinks'>
        <img onClick={()=>window.open('https://www.facebook.com', '_blank')} src='images/mediaIcons/facebook.svg' />
        <img onClick={()=>window.open('https://www.instagram.com', '_blank')} src='images/mediaIcons/instagram.svg' />
        <img onClick={()=>window.open('https://www.youtube.com', '_blank')} src='images/mediaIcons/youtube.svg' />
        <img onClick={()=>window.open('https://www.twitter.com', '_blank')} src='images/mediaIcons/twitter.svg' />
      </div>
      <div className='certifications'>
      <img src='images/mediaIcons/certificate1.webp' />
      <img src='images/mediaIcons/certificate2.avif' />
      </div>
    </div>
  )
}

export default Footer
