import i18next from 'i18next';
import leoProfanity from 'leo-profanity';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import App from './components/App';
import resources from './locales/index';
import { api } from './store/api';
import createStore from './store/createStore';
import { actions, defaultChannelId, selectCurrentChannelId } from './store/ui';

import './index.css';

const init = async () => {
  const socket = io();
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const store = createStore();

  const ruDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDictionary);

  socket.on('newMessage', (payload) => {
    store.dispatch(api.util.updateQueryData('getMessages', undefined, (draftMessages) => {
      draftMessages.push(payload);
    }));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(api.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      draftChannels.push(payload);
    }));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(api.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const newChannels = draftChannels.filter((channel) => channel.id !== payload.id);
      const currentChannelId = selectCurrentChannelId(store.getState());
      if (currentChannelId === payload.id) {
        store.dispatch(actions.setCurrentChannelId(defaultChannelId));
      }
      return newChannels;
    }));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(api.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const channel = draftChannels.find((item) => item.id === payload.id);
      channel.name = payload.name;
    }));
  });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  );
};

export default init;
