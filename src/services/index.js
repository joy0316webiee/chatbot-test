import { apiUrl } from 'config';
import axios from 'axios';

export const apiSendMessage = async message => {
  const payload = { message };
  try {
    const response = await axios.post(apiUrl, payload);
    return response.data;
  } catch (err) {
    console.log(err);
    return new Error('server error!');
  }
};
