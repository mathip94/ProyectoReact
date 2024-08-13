import './App.css';
import ContenedorAgregarEvento from './componentes/ContenedorAgregarEvento';
import ContenedorDashboard from './componentes/ContenedorDashboard';
import ContenedorLogin from './componentes/ContenedorLogin';
import ContenedorRegistro from './componentes/ContenedorRegistro';
import {store} from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ContenedorLogin/>} />
          <Route path='registro' element={<ContenedorRegistro/>}/>
          <Route path='dashboard' element={<ContenedorDashboard/>}/> 
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
