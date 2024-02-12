import axios from 'axios';

axios.defaults.withCredentials = true;

const createChannel = async (id, nickname, profileUrl, navigate) => {
  try {
    const url = 'http://127.0.0.1:8000/createSendBirdChannel';
    const user = {
      'counsellorId': id,
      'counsellorNickName': nickname,
      'counsellorProfileURL': 'https://example.com/profile.jpg'
    };

    const response = await axios.post(url, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const channelUrl = response.data;

      // Use the navigate function passed as a parameter
      navigate(`/chat?channelUrl=${channelUrl}`);
    } else {
      console.error('Error creating Channel in Sendbird:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export default createChannel;


