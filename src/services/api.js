import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/jobs'; // Adjust to match your controller endpoint

export const getAllJobs = () => axios.get(`${API_BASE_URL}/all`);

export const searchJobsBySkill = (skill) => 
  axios.get(`${API_BASE_URL}/search/skill`, { params: { skill } });

export const recommendJobs = (skills) => 
  axios.get(`${API_BASE_URL}/recommend/match`, { 
    params: { skills: skills.join(',') } 
  });

export const createJob = (jobData) => axios.post(`${API_BASE_URL}/create`, jobData);