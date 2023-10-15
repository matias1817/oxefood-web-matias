import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, FormGroup, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import axios from "axios";
import {mensagemErro, notifyError, notifySuccess } from '../../views/util/util';

import { Link, useLocation} from "react-router-dom";

export default function FormEndereco() {
    
    const {state} = useLocation()
    
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [complemento, setComplemento] = useState('');
    const [selectedEstado, setSelectedEstado] = useState('PE');
    const [idEnd, setIdEnd] = useState()
  

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }
    
       // let arrayData = dataParam.split('-');
        return dataParam[2] + '/' + dataParam[1] + '/' + dataParam[0];
    }
    
    

    useEffect(() => {
        
       
        if (state != null && state.id != null) {
           setIdEnd(state.id)
        }
    }, [state])


    
    const estados = [
        { key: 'AC', value: 'AC', text: 'Acre' },
        { key: 'AL', value: 'AL', text: 'Alagoas' },
        { key: 'AP', value: 'AP', text: 'Amapá' },
        { key: 'AM', value: 'AM', text: 'Amazonas' },
        { key: 'BA', value: 'BA', text: 'Bahia' },
        { key: 'CE', value: 'CE', text: 'Ceará' },
        { key: 'DF', value: 'DF', text: 'Distrito Federal' },
        { key: 'ES', value: 'ES', text: 'Espírito Santo' },
        { key: 'GO', value: 'GO', text: 'Goiás' },
        { key: 'MA', value: 'MA', text: 'Maranhão' },
        { key: 'MT', value: 'MT', text: 'Mato Grosso' },
        { key: 'MS', value: 'MS', text: 'Mato Grosso do Sul' },
        { key: 'MG', value: 'MG', text: 'Minas Gerais' },
        { key: 'PA', value: 'PA', text: 'Pará' },
        { key: 'PB', value: 'PB', text: 'Paraíba' },
        { key: 'PR', value: 'PR', text: 'Paraná' },
        { key: 'PE', value: 'PE', text: 'Pernambuco' },
        { key: 'PI', value: 'PI', text: 'Piauí' },
        { key: 'RJ', value: 'RJ', text: 'Rio de Janeiro' },
        { key: 'RN', value: 'RN', text: 'Rio Grande do Norte' },
        { key: 'RS', value: 'RS', text: 'Rio Grande do Sul' },
        { key: 'RO', value: 'RO', text: 'Rondônia' },
        { key: 'RR', value: 'RR', text: 'Roraima' },
        { key: 'SC', value: 'SC', text: 'Santa Catarina' },
        { key: 'SP', value: 'SP', text: 'São Paulo' },
        { key: 'SE', value: 'SE', text: 'Sergipe' },
        { key: 'TO', value: 'TO', text: 'Tocantins' }
    ];

    function salvar() {

        const clienteRequest = {
            
            enderecoBairro: bairro,
            enderecoCep: cep,
            enderecoUf: selectedEstado,
            enderecoCidade: cidade,
            enderecoRua: rua,
            enderecoComplemento: complemento,
            enderecoNumero: numero
        };

        console.log()
        if (state.id != null){
            axios.put("http://localhost:8080/api/cliente/endereco/" + state.id, clienteRequest)
		.then((response) => {
		     console.log('entregador cadastrado com sucesso.')
             notifySuccess('entregador alteradado com sucesso.')

             window.location.replace("/list-cliente")
		})
		.catch((error) => {
		     console.log(error)
             if (error.response) {
                notifyError(error.response.data.errors[0].defaultMessage)
                } else {
                notifyError(mensagemErro)
                } 
                
		})

        } else {
             axios.post("http://localhost:8080/api/cliente/endereco/", clienteRequest)
            .then((response) => {
                console.log('Entregador cadastrado com sucesso.')
                setBairro('')
         
   
                setBairro('')
                setCidade('')
   

                setRua('')
                setComplemento('')
                setNumero('')
                setCep('')
        
                notifySuccess('entregador cadastrado com sucesso.')

                
                window.location.replace("/list-cliente")
})
            .catch((error) => {
                console.log('Erro ao incluir o cliente.')
                if (error.response) {
                    notifyError(error.response.data.errors[0].defaultMessage)
                    } else {
                    notifyError(mensagemErro)
                    } 
                    
            })
        }

       
    }

    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: '3%' }}>
            <Container textAlign='justified'>

            { idEnd === undefined &&
    <h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro de Endereco</h2>
}
{ idEnd !== undefined &&
    <h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteracao de Endereco</h2>
}
                <Divider />

                <div style={{ marginTop: '4%' }}>

                    <Form>


                        <Form.Group>
                           <Form.Input
                                required
                                fluid
                                label='Rua'
                                maxLength="300"
                                style={{ width: "67em" }}
                                value={rua}
                                onChange={e => setRua(e.target.value)}
                                />
                          <Form.Input
                                    required
                                    fluid
                                    label='número'
                                    style={{ width: "12.5em" }}>
                                <InputMask
                                    required
                                    mask="9999"
                                    value={numero}
                                    onChange={e => setNumero(e.target.value)}
                             
                                />
                            </Form.Input>
                        </Form.Group>
                        <Form.Group>
                                
                            <Form.Input
                                required
                                fluid
                                label='Bairro'
                                maxLength="300"
                                style={{ width: "40em" }}
                                value={bairro}
                                
                                onChange={e => setBairro(e.target.value)}/>
                            
                            <Form.Input
                                required
                                fluid
                                label='Cidade' maxLength="300"
                                style={{ width: "30em" }}
                                onChange={e => setCidade(e.target.value)}
                                value={cidade} />
                        <Form.Input
                                    required
                                    fluid
                                    label='CEP'
                                    style={{ width: "8.5em" }}>
                                <InputMask
                                    required
                                    mask="9999-999"
                                    value={cep}
                                    onChange={e => setCep(e.target.value)}
                             
                                />
                            </Form.Input>

                        </Form.Group>
                        <Form.Group>
                            <Form.Select label='UF'
                            placeholder='UF'
                            options={estados}
                            required={true}
                                    value={selectedEstado}
                                    style={{width: "80.5em"}}
                                    onChange={(e, { value }) => setSelectedEstado(value)}>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            
                        <Form.Input  required fluid
                                    label='Complemento'
                                maxLength="100"
                                    style={{width:"80.5em"}}
                                value={complemento}
                                onChange={e => setComplemento(e.target.value)}
                                />
                        </Form.Group>

                     
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
                                <Link to={'/list-cliente'}>Voltar</Link>
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