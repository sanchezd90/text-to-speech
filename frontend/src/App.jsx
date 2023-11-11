import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioFiles, setAudioFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Making a POST request to generate audio
      const generateResponse = await axios.post('http://localhost:3000/api/generate', {
        phrase: prompt,
      });

      // If POST request is successful, make a subsequent GET request
      const recuperateResponse = await axios.get('http://localhost:3000/api/recuperate');

      // Extract audio files from the response
      const { audioFiles } = recuperateResponse.data;

      setAudioFiles(audioFiles);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Prompt:
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {audioFiles.length > 0 && (
        <div>
          {/* Displaying the first audio file differently */}
          <audio controls key={audioFiles[0]}>
            <source src={`http://localhost:3000/${audioFiles[0]}`} type="audio/wav" />
            Your browser does not support the audio tag.
          </audio>

          {/* Displaying the rest of the audio files */}
          <div>
            {audioFiles.slice(1).map((audio, index) => (
              <audio controls key={index + 1}>
                <source src={`http://localhost:3000/${audio}`} type="audio/wav" />
                Your browser does not support the audio tag.
              </audio>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
