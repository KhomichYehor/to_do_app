import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setIssues } from '../../features/issuesSlice';
import { fetchIssues } from '../../api/githubApi';

import './RepoLoader.scss';

function RepoLoader() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const loadIssues = async () => {
    setError('');
    try {
      const issues = await fetchIssues(url);
      dispatch(setIssues(issues));
    } catch (error) {
      setError('Failed to load issues. Please check the repository URL.');
    }
  };

  return (
    <div className="repo-loader">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Enter GitHub Repository URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button variant="primary" onClick={loadIssues}>
          Load
        </Button>
      </InputGroup>
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
}

export default RepoLoader;
