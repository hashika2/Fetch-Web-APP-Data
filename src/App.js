import React, { useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

import './App.css';

function App() {
  const [webPageUrl, setWebPageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);

  const fetchWebPageDetails = async () => {
    try {
      const response = await axios.get(webPageUrl);
      const html = response.data;
      const $ = cheerio.load(html);

      // Extract title
      const pageTitle = $('title').text();
      setTitle(pageTitle);

      // Extract images
      const pageImages = [];
      $('img').each((index, element) => {
        const imageUrl = $(element).attr('src');
        pageImages.push(imageUrl);
      });
      setImages(pageImages);
    } catch (error) {
      console.error('Error fetching web page details:', error);
    }
  };

  return (
    <div>
      <h1>Web Page Details</h1>
      <div>
        <input
          type="text"
          value={webPageUrl}
          onChange={(e) => setWebPageUrl(e.target.value)}
          placeholder="Enter a web page URL"
        />
        <button onClick={fetchWebPageDetails}>Fetch Details</button>
      </div>
      <div>
        <h2>Title: {title}</h2>
        <h2>Images:</h2>
        <ul>
          {images.map((image, index) => (
            <li key={index}>
              <img src={image} alt={`Image ${index}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
