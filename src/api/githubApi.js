// src/api/githubApi.js
import axios from 'axios';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github.v3+json' },
});

export const fetchIssues = async (repoUrl) => {
  try {
    const match = repoUrl.match(/https:\/\/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) throw new Error('Invalid GitHub repository URL');
    const [_, owner, repo] = match;
    const response = await githubApi.get(`/repos/${owner}/${repo}/issues`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch issues:', error);
    throw error;
  }
};
