
import Navbar from './Navbar.container/Navbar.components.jsx';

import './App.css';
import ItemSponsored from './Header.Slideshow.container/Item.sponsored.jsx';
import ItemHistory from './History.Slideshow.container/ItemHistory.jsx';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ItemSponsored />
      <ItemHistory />
      <p>Viridi Cervus</p>
    </div>
  );
}

export default App;
