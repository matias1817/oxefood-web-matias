import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { mensagemErro, notifyError, notifySuccess } from '../../views/util/util';


import axios from "axios";

export default function FormCliente() {
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [idCliente, setIdCliente] = useState();
    const [cpf, setCpf] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const { state } = useLocation();


    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        //let arrayData = dataParam.split('-');
        return dataParam[2] + '-' + dataParam[1] + '-' + dataParam[0];
    }


    useEffect(() => {
        console.log(state)
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/cliente/" + state.id)
                .then((response) => {
                    setIdCliente(response.data.id)
                    setNome(response.data.nome)
                    setEmail(response.data.email)
                    setCpf(response.data.cpf)
                    setDataNascimento(formatarData(response.data.dataNascimento))
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                })
        }
    }, [state])


    function salvar() {

        let clienteRequest = {
            nome: nome,
            cpf: cpf,
            email: email,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo
        }
        console.log(clienteRequest)
        if (idCliente != null) { //Alteração:
            axios.put("http://localhost:8080/api/cliente/" + idCliente, clienteRequest)
                .then((response) => {
                    console.log('Cliente alterado com sucesso.')
                    notifySuccess('Cliente alterado com sucesso.')
                })
                .catch((error) => {
                    console.log('Erro ao alter um cliente.')
                    if (error.response) {
                        notifyError(error.response.data.errors[0].defaultMessage)
                    } else {
                        notifyError(mensagemErro)
                    }
                })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/cliente", clienteRequest)
                .then((response) => { console.log('Cliente cadastrado com sucesso.') 
                notifySuccess('Cliente cadastrado com sucesso.')

            })
                .catch((error) => { console.log('Erro ao incluir o cliente.')
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

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idCliente === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCliente !== undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />


                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}

                                />
                                 <Form.Input
                                    required
                                    fluid
                                    label='Email'
                                    maxLength="100"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}

                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}

                                        onChange={e => setCpf(e.target.value)}

                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneCelular}

                                        onChange={e => setFoneCelular(e.target.value)}

                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneFixo}

                                        onChange={e => setFoneFixo(e.target.value)}

                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={6}

                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}

                                        onChange={e => setDataNascimento(e.target.value)}

                                    />
                                </Form.Input>

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
