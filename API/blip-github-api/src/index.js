const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com/orgs/takenet/repos';

exports.handler = async (event) => {
  try {
    // Faz a requisição para a API pública do GitHub
    const {data} = await axios.get(GITHUB_API_URL, {
      params: {
        q: 'lang:C#',
        per_page: 5, 
      }
    });

    const carouselItems = data.map(repo => ({
      title: repo.full_name.replace('takenet/', ''), 
      subtitle: repo.description,
      imageUrl: repo.owner.avatar_url
    }));
  // Converte os itens para string para envio ao chatbot
  const carouselString = JSON.stringify(carouselItems);

  return {
    statusCode: 200,
    body: carouselString,  
  };
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao buscar repositórios' }),
    };
  }
};
