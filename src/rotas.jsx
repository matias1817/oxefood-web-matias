import React from 'react';
import { Route, Routes } from "react-router-dom";
import ListCliente from './views/cliente/ListCliente';
import FormCliente from './views/cliente/FormCliente';
import Home from './views/home/home';
import FormProduto from './views/produto/FormProduto';
import FormEntregador from './views/entregador/FormEntregador';
import ListEntregador from './views/entregador/ListEntregador';
import ListProduto from './views/produto/ListProduto';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />

                <Route path="form-cliente" element={ <FormCliente/> } />
                
                <Route path="form-produto" element={ <FormProduto/> } />

                <Route path="form-entregador" element={ <FormEntregador/> } />

                <Route path="list-cliente" element={ <ListCliente/> } />

                <Route path="list-entregador" element={ <ListEntregador/> } />

                <Route path="list-produto" element={ <ListProduto/> } />
            </Routes>
        </>
    )
}

export default Rotas
