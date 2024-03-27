import axios from 'axios'
import   {Routes,Route} from 'react-router-dom'
import Home from './view/Home'
import Login_signup from './view/Login_signup'
import Oneidea from './view/oneidea'
import Author from './view/author'

axios.defaults.baseURL='http://localhost:8000'

function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Login_signup/>}/>
      <Route path='/ideas' element={<Home />} />  
      <Route path='/idea/:id' element={<Oneidea />}/>
      <Route path='/author/:id' element={<Author />} />
    </Routes>
  )
}

export default App
