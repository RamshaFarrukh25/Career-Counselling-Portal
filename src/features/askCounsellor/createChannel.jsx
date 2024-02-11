// const createChannel = async (id, nickname, profileUrl, user_id) => {
//   try {

//     const url = 'http://localhost:8000/createSendBirdChannel';
//     const user = {
//       counsellorId: id,
//       counsellorNickName: nickname,
//       counsellorProfileURL: 'https://example.com/profile.jpg',
//       user_id :user_id
//     };
// const response = await fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(user),
// });


// if (response.status === 200) {
//   const channelUrl = await response.text();
//   window.location.href = `/chat?channelUrl=${channelUrl}`;
// } else {
//   console.error('Error creating Channel in Sendbird:', response.status);
// }
// } catch (error) {
//     console.error('Error:', error);
//   }
// }
// export default createChannel;

// createChannel.js
const createChannel = async (id, nickname, profileUrl, user_id, navigate) => {
  try {
    const url = 'http://localhost:8000/createSendBirdChannel';
    const user = {
      counsellorId: id,
      counsellorNickName: nickname,
      counsellorProfileURL: 'https://example.com/profile.jpg',
      user_id: user_id,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.status === 200) {
      const channelUrl = await response.text();

      // Store user_id and isLogin in local storage
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('isLogin', 'true');

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

