

import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
