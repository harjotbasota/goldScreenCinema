import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className='about'>
      <div className='cinemasTitle'> <p> About Us</p> </div>
      <div className='theCompany'>
        <div className='theCompanyLeft'>
          <h3> The Company</h3>
          <p>Welcome to GoldScreenCinema, the largest and most premium film exhibitor in the United States with 1756 screens across 113 locations in New York and California, boasting an aggregate seating capacity of 3.62 lakh seats. Over the years, we have consistently increased our screen count, both organically and inorganically, through strategic investments and acquisitions, including the purchase of 'SilverScreen Theatres' in November 2012, 'GoldenState Cinemas' in May 2016, and 'Pacific Theatres' in August 2018. We recently completed the merger with GoldenState Entertainment Limited, which has added to our storied history of becoming game changers in the film exhibition industry for over 25 years and transforming the out of home entertainment in the country. Our mission is to advance and reimagine the movie-going experience by continuing to reinvent ourselves in keeping up with the times and the ever-changing entertainment landscape to make our brand aspirational and accessible. We take pride in our strategically located cinemas in the heart of New York and California, and we continuously invest in introducing premium formats, comfortable seating, sound, projection, ambience, and food & beverage to meet evolving consumer expectations so that our patrons have a memorable experience every time they visit our cinemas. We serve as a conduit between consumers and the film industry on one hand and the retail industry and real estate development on the other. As a leading player in the film exhibition industry, our company is spearheading the establishment of a robust ecosystem that brings together key partners, including filmmakers, studios, content providers, equipment and concession manufacturers, data and technology companies, all of whom rely on the strength of our business and the communities we serve. We engage with multiple channels to connect with our over 180 million patrons through research, loyalty, online, digital, and offline modes to provide a platform to showcase film and non-film content and identifying new trends in the film exhibition industry. Our diversified revenue stream comes mainly from box office and non-box office, which primarily includes revenue from Sale of Food and Beverages, advertisement income, convenience fees, and income from movie distribution, among others. Our leadership across key operating metrics and robust financial position is backed by experienced Promoters, Key Managerial Personnel, and a senior management team with an established track record. Thank you for choosing GoldScreenCinema for your entertainment needs. We look forward to welcoming you to our cinemas</p>
        </div>
        <div className='theCompanyRight'>
          <img src='images/cinemaPics/002.jpg' />
        </div>
      </div>
      <div className='ourJourney'>
          <h3> Our Journey</h3>
          <ul>
            <li><span style={{fontWeight:700}}>2012:</span> Acquired 'SilverScreen Theatres', marking our entry into the film exhibition industry</li>
            <li><span style={{fontWeight:700}}>2016:</span> Expanded our presence with the acquisition of 'GoldenState Cinemas', further strengthening our foothold in California</li>
            <li><span style={{fontWeight:700}}>2018:</span> Acquired 'Pacific Theatres', solidifying our position as a leading player in the film exhibition industry</li>
            <li><span style={{fontWeight:700}}>Recent:</span> Completed the merger with GoldenState Entertainment Limited, adding to our storied history of innovation and transformation in the out-of-home entertainment industry</li>
          </ul>
      </div>
    </div>
  )
}

export default About
