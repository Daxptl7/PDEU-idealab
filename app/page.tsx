// src/app/page.js
import Hero from '../components/Hero';
import Stats from '../components/Stats'; // <--- Import this

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats /> {/* <--- Add this here */}
      
      {/* Rest of your page content... */}
    </div>
  );
}