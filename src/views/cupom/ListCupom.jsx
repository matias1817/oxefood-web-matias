import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {Button, Container, Divider, Icon, Table, Header, Modal} from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListCupom () {

    const {state} = useLocation()
   const [lista, setLista] = useState([]);
   const [openModal, setOpenModal] = useState(false);
   const [idRemover, setIdRemover] = useState();

   
   function confirmaRemover(id) {
    setOpenModal(true)
    setIdRemover(id)
}


   useEffect(() => {
       carregarLista();
   }, [])

   function carregarLista() {

       axios.get("http://localhost:8080/api/cupomdesconto")
       .then((response) => {
           setLista(response.data)
       })
   }
   function formatarData(dataParam) {

    if (dataParam === null || dataParam === '' || dataParam === undefined) {
        return ''
    }

   // let arrayData = dataParam.split('-');
    return dataParam[2] + '/' + dataParam[1] + '/' + dataParam[0];
}
async function remover() {

    await axios.delete('http://localhost:8080/api/cupomdesconto/' + idRemover)
    .then((response) => {

        console.log('cupom removido com sucesso.')

        axios.get("http://localhost:8080/api/cupomdesconto")
        .then((response) => {
            setLista(response.data)
        })
    })
    .catch((error) => {
        console.log('Erro ao remover um cupom.')
    })

    setOpenModal(false)
}


return(
    <div>
        <MenuSistema />
        <div style={{marginTop: '3%'}}>

            <Container textAlign='justified' >

                <h2> Cupom </h2>
                <Divider />

                <div style={{marginTop: '4%'}}>
                    <Button
                        label='Novo'
                        circular
                        color='orange'
                        icon='clipboard outline'
                        floated='right'
                        as={Link}
                        to='/form-cupom'
                    />
                       
                       <br/><br/><br/>
                  
                  <Table color='orange' sortable celled>

                      <Table.Header>
                          <Table.Row>
                          <Table.HeaderCell>Codigo de Desconto</Table.HeaderCell>
                            
                              <Table.HeaderCell>Percentual de Desconto</Table.HeaderCell>
                              <Table.HeaderCell>Valor de Desconto</Table.HeaderCell>
                              <Table.HeaderCell>Valor Minimo</Table.HeaderCell> 
                              <Table.HeaderCell>Quantidade Maxima</Table.HeaderCell>
                              <Table.HeaderCell>Inicio Vigencia</Table.HeaderCell>
                              <Table.HeaderCell>Fim da Vigencia</Table.HeaderCell>
                              
                              <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                          </Table.Row>
                      </Table.Header>
                 
                      <Table.Body>

                          { lista.map(cupom => (

                              <Table.Row key={cupom.id}>
                                <Table.Cell>{cupom.codigoDesconto}</Table.Cell>
                                
                                  <Table.Cell>{cupom.percentualDesconto}</Table.Cell>
                                  <Table.Cell>{cupom.valorDesconto}</Table.Cell> 
                                  <Table.Cell>{cupom.valorMinimoPedidoPermitido}</Table.Cell>
                                  <Table.Cell>{cupom.quantidadeMaximaUso}</Table.Cell>
                                  <Table.Cell>{formatarData(cupom.inicioVigencia)}</Table.Cell>
                                  <Table.Cell>{formatarData(cupom.fimVigencia)}</Table.Cell>
                                  
                                  <Table.Cell textAlign='center'>

                                      <Button
                                          inverted
                                          circular
                                          color='green'
                                          title='Clique aqui para editar os dados deste cupom'
                                          icon>
                                             <Link to="/form-cupom" state={{ id: cupom.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                      </Button> &nbsp;

                                      <Button
                                               inverted
                                               circular
                                               color='red'
                                               title='Clique aqui para remover este cupom'
                                               onClick={e => confirmaRemover(cupom.id)}
                                               icon>
                                                   <Icon name='trash' />
                                           </Button>

                                       </Table.Cell>
                                   </Table.Row>
                               ))}

                           </Table.Body>
                       </Table>
                   </div>
               </Container>
               <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
           </div>

       </div>
   )
}
