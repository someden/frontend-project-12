import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';

const ChatPage = () => {
  const auth = useAuth(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    axios.get(routes.data(), {
      headers: auth.getAuthHeader(),
    }).then((response) => {
      setState(response.data);
    });
  }, [auth]);

  return state;
};

export default ChatPage;
