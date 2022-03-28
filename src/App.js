import './App.css'
import Login from './components/Login.js'
function App() {
  // useEffect(() => {
  //   const start = () => {
  //     gapi.client.init({
  //       clientId: `${process.env.CLIENT_ID}`,
  //       scope: '',
  //     })
  //   }
  //   gapi.load('client:auth2', start)
  // })
  return (
    <div className='App'>
      <Login />
    </div>
  )
}

export default App
