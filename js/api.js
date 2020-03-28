// Abstração do Fetch inspirada na lib Axios - because of reasons
const http = () => {
  return {
    async get(url) {
      const response = await fetch(url);

      const data = await response.json();

      return data;
    },
    async post(url, payload) {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      return data;
    }
  };
};

const api = http();
