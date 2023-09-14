import React, {useState}from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, FormGroup, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import axios from "axios";

export default function FormProduto() {

    const [titulo, SetTitulo] = useState('')
    const [codigo, SetCodigo] = useState('')
    const [descricao, SetDescricao] = useState('')
    const [valorUnitario, SetValorUnitario] = useState('')
    const [tempoMax, SetTempoMax] = useState('')
    const [tempoMin, SetTempoMin] = useState('')

    function salvar() {

		let produtoRequest = {
		     titulo: titulo,
		     codigo: codigo,
		     descricao: descricao,
		     valorUnitario: valorUnitario,
		     tempoEntregaMaximo: tempoMax,
             tempoEntregaMinimo: tempoMin
		}
	console.log()
		axios.post("http://localhost:8080/api/produto", produtoRequest)
		.then((response) => {
            
		     console.log('produto cadastrado com sucesso.')
		})
		.catch((error) => {
		     console.log('Erro ao incluir o produto.')
		})
	}

    return (
        <div>
  <MenuSistema />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Titulo'
                                    maxLength="100"
                                    value={titulo}
                                    onChange={e => SetTitulo(e.target.value)}

                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Codigo de Produto'>
                                    <InputMask
                                        required
                                        mask="9999"
                                        value={codigo}
                                        onChange={e => SetCodigo(e.target.value)}
    
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.TextArea
                                    fluid
                                    label='Descricao'
                                    style={{ width: "80.5em" }}
                                    value={descricao}
                                    onChange={e => SetDescricao(e.target.value)}

                                >
                                </Form.TextArea>

                            </Form.Group>

                            <FormGroup>




                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unítario'
                                    style={{ width: "26em" }}

                                >
                                    <InputMask
                                        required
                                        mask="9999"
                                        value={valorUnitario}
                                        onChange={e => SetValorUnitario(e.target.value)}
    
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Tempo de Entrega Minimo em Minutos'
                                    style={{ width: "26em" }}
                                >
                                    <InputMask
                                        required
                                        value={tempoMin}
                                        onChange={e => SetTempoMin(e.target.value)}
    
                                        mask="99"
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Tempo de Entrega Maximo em Minutos'
                                    style={{ width: "26.5em" }}
                                >
                                    <InputMask
                                        required
                                        value={tempoMax}
                                        onChange={e => SetTempoMax(e.target.value)}
    
                                        mask="99"
                                    />
                                </Form.Input>

                            </FormGroup>


                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}
