
import Navbar from './Navbar.container/Navbar.components.jsx';

import './App.css';
import ItemSponsored from './Header.Slideshow.container/Item.sponsored.jsx';
import Category from './Category.container/Category.jsx';
import ItemHistory from 'E:/Shopping website/website/viridi-cervus/src/History.Slideshow.container/ItemHistory.jsx';
import Footer from './Footer.container/Footer.jsx';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ItemSponsored />
      <ItemHistory />
      <Category />
      <Footer />
    </div>
  );
}

export default App;
