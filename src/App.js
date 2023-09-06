import logo from './logo.svg';
import './App.css';
import Home from './views/home/home';
import FormProduto from './views/produto/FormProduto';
import Rotas from './rotas';
import { Segment } from 'semantic-ui-react';

function App() {
  return (
  
    <div className="App">

    <Rotas />

    <div style={{marginTop: '6%'}}>
      <Segment vertical color='grey' size='tiny' textAlign='center'>
        &copy; 2023 - Projeto WEB III - IFPE Jaboatão dos Guararapes
      </Segment>
    </div>

  </div>

  );
}

export default App;
