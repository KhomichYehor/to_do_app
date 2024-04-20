import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import RepoLoader from './components/RepoLoader/RepoLoader';
import IssueBoard from './components/IssueBoard/IssueBoard';

import './styles/App.scss';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <RepoLoader />
        <IssueBoard />
      </div>
    </Provider>
  );
}

export default App;
