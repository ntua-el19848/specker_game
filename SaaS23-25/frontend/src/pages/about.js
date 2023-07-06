/* Page that provides basic information for our website. 
   It informs the user about who we are, what our software does and which is our pricing model for credits.
   Also it includes a link to our github Repo.
*/
import React from "react";
  
const About = () => {
  return (
    <div className="about">
      <h1>
        About page MyCharts
      </h1>
      <br></br>
      <h2 style={{ textAlign:'center' }}>This software is designed and developed by Michail Tsilimigkounakis, George Sotiropoulos and Panagiotis Stefanis for the NTUA course "Τεχνολογίες Υπηρεσιών Λογισμικού" </h2>
      <br></br>
      <h2 style={{ textAlign:'center' }}>
        Via myCharts Software a user can create the charts he/she wants by uploading a csv file based on our templates.
        Each user with his/her first registration takes 10 free credits to try our App. If the user consumed these credits,
        he/she has to buy some more credits in order to store Charts in the history. 
      </h2>
      <br></br>
      <h2>
        Our pricing models is as following:
      </h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Amount of Credits</th>
              <th>Price (in Euro)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 Credit</td>
              <td>0.50</td>
            </tr>
            <tr>
              <td>2 Credits</td>
              <td>0.75</td>
            </tr>
            <tr>
              <td>5 Credits</td>
              <td>1.5</td>
            </tr>
            <tr>
              <td>10 Credits</td>
              <td>2.5</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br></br>
      <br></br>
      <p style={{ fontSize:'20px' }}>Visit our <a href="https://github.com/ntua/SaaS23-25.git">github Repo</a> for more information.</p>
    </div>
  );
};
  
export default About;