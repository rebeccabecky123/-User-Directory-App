
import './App.css'
import Header from './components/Header'
import LoadingSpinner from './components/LoadingSpinner'
import UserCard from './components/UserCard'
import UserFormContainer from './components/UserFrom'
import HomePage from './Pages/HomePage'

function App() {
  

  return (
    <div>
      <Header/>
      <LoadingSpinner/>
      <UserCard/>
      <UserFormContainer/>
      <HomePage/>
                                                                                     
    </div>
    
  )
}

export default App
