// Update your JSX
import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import "./index.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioFiles, setAudioFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Making a POST request to generate audio
      const generateResponse = await axios.post(
        "http://localhost:3000/api/generate",
        {
          phrase: prompt,
        }
      );

      // If POST request is successful, make a subsequent GET request
      const recuperateResponse = await axios.get(
        "http://localhost:3000/api/recuperate"
      );

      // Extract audio files from the response
      const { audioFiles } = recuperateResponse.data;

      setAudioFiles(audioFiles);
      setPrompt("")
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="text-center mt-5" style={{ maxWidth: "50vw" }}>
      <h1>Text to Speech</h1>
      <p className="mb-4">
        Enter a text and click 'Submit' to generate audio.
      </p>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="formPrompt" className="mb-3">          
          <Form.Control
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}as="textarea" // Use textarea for multiline input
            rows={4} // Set the initial number of rows                      
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>

      {audioFiles.length > 0 && (
  <div className="mt-5">
    <h2 className="mb-3">Converted text</h2>{" "}
    <audio
      controls
      key={audioFiles.sort((a, b) => {
        const timestampA = parseInt(a.split(".")[0]);
        const timestampB = parseInt(b.split(".")[0]);                
        return timestampB - timestampA;
      })[0]}  // Use a unique identifier, maybe the first audio file
      className="audio-control"
    >
      <source
        src={`http://localhost:3000/${audioFiles[0]}`}
        type="audio/wav"
      />
      Your browser does not support the audio tag.
    </audio>
    {audioFiles.length>1 && <h2 className="mb-3 mt-5">Previous conversions</h2>}
    <div className="mt-6">
      {audioFiles        
        .slice(1)
        .map((audio) => (
          <audio controls key={audio} className="audio-control">
            <source
              src={`http://localhost:3000/${audio}`}
              type="audio/wav"
            />
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
