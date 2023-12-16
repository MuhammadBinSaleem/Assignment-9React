import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Create from './Create';
import Fetch from './Fetch';
import Update from './Update';
import Delete from './Delete';
import Main from './Main';
import Page404 from './Page404';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/create" element={<Create />} />
          <Route path="/fetch"  element={<Fetch />} />
          <Route path="/update" element={<Update />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="*" element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
