// Update your JSX
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Spinner, Card } from 'react-bootstrap';
import './index.css'

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
    <Container className="text-center mt-5" style={{ maxWidth: '50vw' }}>
    <h1>Text to Speech</h1>
    <p className="mb-4">Enter a prompt and click 'Submit' to generate and play audio.</p>

    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="formPrompt" className="mb-3">
        <Form.Label>Enter Prompt:</Form.Label>
        <Form.Control
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            Loading...
          </>
        ) : (
          'Submit'
        )}
      </Button>
    </Form>

    {audioFiles.length > 0 && (
      <div className="mt-4">
        <h2 className="mb-3">Converted text</h2> {/* Added subtitle for historic audios section */}
        {/* Displaying the first audio file differently */}
        <audio controls key={audioFiles[0]} className="audio-control">
          <source src={`http://localhost:3000/${audioFiles[0]}`} type="audio/wav" />
          Your browser does not support the audio tag.
        </audio>

        <h2 className="mb-3">Previous conversions</h2> {/* Added subtitle for historic audios section */}
        {/* Displaying the rest of the audio files */}
        <div className="mt-4">
          {audioFiles.slice(1).map((audio, index) => (
            <audio controls key={index + 1} className="audio-control">
              <source src={`http://localhost:3000/${audio}`} type="audio/wav" />
              Your browser does not support the audio tag.
            </audio>
          ))}
        </div>
      </div>
    )}
  </Container>
  );
}

export default App;
