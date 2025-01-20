import { FirebaseMessaging } from '@capacitor-firebase/messaging';

const getToken = async () => {
  const result = await FirebaseMessaging.getToken();
  return result.token;
};

const addTokenReceivedListener = async () => {
  await FirebaseMessaging.addListener('tokenReceived', event => {
    console.log('tokenReceived', { event });
  });
};

export { getToken, addTokenReceivedListener };