import React from "react";
import axios from "axios";


const CommunityPage = () => {
  return (
    <div>
    <h2>Playcay Ventures</h2>
    <form>
      <label htmlFor="commtitle">Venture Location:</label><br/>
      <input id="commtitle" type="text" placeholder="Where'd you go?"/><br/><br/>

      <label htmlFor="commbody">Venture Story:</label><br/>
      <textarea id="commtitle" type="text" placeholder="Share your experience" /><br/><br/>
      
      <label htmlFor="comm">Venture Snapshot:</label><br/>
      <input id="commtitle" type="file"></input><br/><br/>
      
      <input type="submit" value="Post Venture" />
    </form>
    </div>
  )
}

export default CommunityPage;
