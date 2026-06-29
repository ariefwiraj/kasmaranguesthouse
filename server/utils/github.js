import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'ariefwiraj';
const GITHUB_REPO = process.env.GITHUB_REPO || 'kasmaranguesthouse-LandingPage';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

const getBaseUrl = () => `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;

const getHeaders = () => {
  return {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };
};

export const readFile = async (filePath) => {
  if (!GITHUB_TOKEN) {
    try {
      const fullPath = path.resolve(process.cwd(), filePath);
      const content = await fs.readFile(fullPath, 'utf-8');
      return { data: JSON.parse(content), sha: null };
    } catch (error) {
      return { data: null, sha: null };
    }
  }

  try {
    const response = await axios.get(`${getBaseUrl()}/${filePath}?ref=${GITHUB_BRANCH}`, {
      headers: getHeaders(),
    });
    const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
    return { data: JSON.parse(content), sha: response.data.sha };
  } catch (error) {
    if (error.response && error.response.status === 404) {
       return { data: null, sha: null }; 
    }
    console.error(`Error reading file ${filePath}:`, error.message);
    throw error;
  }
};

export const writeFile = async (filePath, content, sha, message) => {
  if (!GITHUB_TOKEN) {
    const fullPath = path.resolve(process.cwd(), filePath);
    await fs.writeFile(fullPath, JSON.stringify(content, null, 2), 'utf-8');
    return null;
  }

  try {
    const data = {
      message: message,
      content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
      branch: GITHUB_BRANCH,
    };
    if (sha) {
      data.sha = sha;
    }
    const response = await axios.put(`${getBaseUrl()}/${filePath}`, data, {
      headers: getHeaders(),
    });
    return response.data.content.sha;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error.message);
    throw error;
  }
};

export const uploadFile = async (filePath, base64Content, message) => {
  const base64Data = base64Content.replace(/^data:image\/\w+;base64,/, "");
  
  if (!GITHUB_TOKEN) {
    const fullPath = path.resolve(process.cwd(), filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, Buffer.from(base64Data, 'base64'));
    return null;
  }

  try {
     let sha = null;
     try {
       const existingFile = await axios.get(`${getBaseUrl()}/${filePath}?ref=${GITHUB_BRANCH}`, { headers: getHeaders() });
       sha = existingFile.data.sha;
     } catch (err) {}
     
     const data = {
        message: message,
        content: base64Data,
        branch: GITHUB_BRANCH
     };
     if (sha) data.sha = sha;

     const response = await axios.put(`${getBaseUrl()}/${filePath}`, data, { headers: getHeaders() });
     return response.data.content.sha;
  } catch (error) {
      console.error(`Error uploading file ${filePath}:`, error.message);
      throw error;
  }
};

export const deleteFile = async (filePath, sha, message) => {
  if (!GITHUB_TOKEN) {
    try {
      const fullPath = path.resolve(process.cwd(), filePath);
      await fs.unlink(fullPath);
      return true;
    } catch (e) {
      return false;
    }
  }

  try {
    const data = {
      message: message,
      sha: sha,
      branch: GITHUB_BRANCH,
    };
    await axios.delete(`${getBaseUrl()}/${filePath}`, {
      headers: getHeaders(),
      data: data,
    });
    return true;
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error.message);
    throw error;
  }
};
