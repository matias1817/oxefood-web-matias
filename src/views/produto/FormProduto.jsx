import React from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, FormGroup, Icon, Select } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormCliente() {

    const estados = [
        { key: 'PE', value: 'PE', text: 'Pernambuco' },
        { key: 'PB', value: 'PB', text: 'Paraiba' }
      ]
    return (

        <div>
  <MenuSistema />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    />
                                </Form.Input>

                                <Form.Input

                                    fluid
                                    label='RG'>
                                    <InputMask

                                        mask="99.999.999"
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Data Nascimento'

                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    required
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                    />
                                </Form.Input>

                                <Form.Input

                                    fluid
                                    label='QTD de Entregas Realizadas'>
                                    <InputMask
                                        required
                                        mask="9999"
                                    />
                                </Form.Input>

                                <Form.Input

                                    fluid
                                    label='Valor por Frete'>
                                    <InputMask
                                        required
                                        mask="999"
                                    />
                                </Form.Input>


                            </Form.Group>

                            <FormGroup>


                                <Form.Input
                                    required
                                    fluid
                                    label='Rua'
                                    maxLength="300"
                                    style={{ width: "67em" }}
                                >

                                </Form.Input>


                                <Form.Input
                                    required
                                    fluid
                                    label='número'
                                    style={{ width: "12.5em" }}
                                >
                                    <InputMask
                                        required
                                        mask="9999"
                                    />
                                </Form.Input>

                            </FormGroup>
                            <FormGroup>


                            <Form.Input
                                    required
                                    fluid
                                    label='Bairro'
                                    maxLength="300"
                                    style={{ width: "40em" }}
                                >

                                </Form.Input>
                                
                                
                                <Form.Input
                                    required
                                    fluid
                                    label='Cidade'
                                    maxLength="300"
                                    style={{ width: "30em" }}
                                >

                                </Form.Input>
                                
                                

                                <Form.Input
                                    required
                                    fluid
                                    label='CEP'
                                    style={{ width: "8.5em" }}
                                >
                                    <InputMask
                                        required
                                        mask="9999"
                                    />
                                </Form.Input>

                            </FormGroup>
                            <FormGroup>
                            <Form.Select
                        fluid
                        label='UF'
                        placeholder='UF'
                        options={estados}
                        required={true}
                        value={estados}
                        style={{width: "80.5em"}}
                    />
                            </FormGroup>

                            <FormGroup>

                                <Form.Input  required
                                    fluid
                                    label='Complemento'
                                    maxLength="100"
                                    style={{width:"80.5em"}}
                                    >
                                
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
