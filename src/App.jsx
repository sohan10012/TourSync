import './App.css';
import Hero from "./components/ui/custom/Hero";
import PhotoComponent from "./components/PhotoComponent";
import Footer from './components/ui/custom/footer';
import PopularDestination from './components/ui/custom/PopularDestination';
import Features from './components/ui/custom/Features';

function App() {
  return (
    <>
      <Hero />
      <PhotoComponent />
      <Features/>
      <PopularDestination/>
      <Footer/>
    </>
  );
}

export default App;
