import './Header.Slideshow.container/Header.Slideshow.jsx';
import Navbar from './Navbar.container/Navbar.components.jsx';  
import './App.css';
import SlidingWindow from './Header.Slideshow.container/Header.Slideshow.jsx';



function App() {
  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ];
  return (
    <div className="App">
      <Navbar />
      <SlidingWindow items={items} windowSize={3} />
    </div>
  );
}

export default App;
