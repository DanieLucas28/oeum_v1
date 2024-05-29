const axios = require('axios');

const fetchGithubData = async () => {
  try {
    const response = await axios.get(`https://api.github.com/users/DanieLucas28/repos`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });
    return response.data.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      languages_url: repo.languages_url,
    }));
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return [];
  }
};

module.exports = fetchGithubData;
