import { fetchGifs, fetchPhotos, fetchVideos } from './api/Api'
import './App.css'
import StaticLandingPage from './pages/LandingPage'

function App() {

  function getPhotos(){
    const data = fetchPhotos('cat');
    console.log(data);
  }
  function getVideos(){
    const data = fetchVideos('cat');
    console.log(data);
  }
  function getGifs(){
    const data = fetchGifs('cat');
    console.log(data);
  }
return (
    <>
    {/* <StaticLandingPage/> */}
    <button className='w-xl bg-black text-white' onClick={getPhotos}>search</button>
    <button className='w-xl bg-black text-white' onClick={getVideos}>search</button>
    <button className='w-xl bg-black text-white' onClick={getGifs}>search</button>
    </>
  )
}

export default App
