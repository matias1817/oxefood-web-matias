import React, { useState } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, FormGroup, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import axios from "axios";

export default function FormEntregador() {
    
    

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [foneCelular, setFoneCelular] = useState('');
    const [foneFixo, setFoneFixo] = useState('');
    const [qtdEntregas, setQtdEntregas] = useState('');
    const [valorFrete, setValorFrete] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [complemento, setComplemento] = useState('');
    const [selectedEstado, setSelectedEstado] = useState('PE');
    const [ativo, setAtivo] = useState(true);
    
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

        const entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            bairro: bairro,
            cep: cep,
            uf: selectedEstado,
            ativo: ativo,
            cidade: cidade,
            qtdEntregas: qtdEntregas,
            valorFrete: valorFrete,
            rua: rua,
            complemento: complemento,
            numero: numero
        };

        console.log()
        axios.post("http://localhost:8080/api/entregador", entregadorRequest)
            .then((response) => {
                console.log('Entregador cadastrado com sucesso.')
            })
            .catch((error) => {
                console.log('Erro ao incluir o um entregador.')
            })
    }

    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: '3%' }}>
            <Container textAlign='justified'>
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
                                            value={nome}
                                            onChange={e => setNome(e.target.value)}
                                        />

                            <Form.Input
                                        required
                                        fluid
                                        label='CPF'>
                                        <InputMask
                                            value={cpf}
                                            onChange={e => setCpf(e.target.value)}
                                            mask="999.999.999-99"
                                            />
                            </Form.Input>
                            
                            <Form.Input               
                                        fluid
                                        label='RG'>
                                        <InputMask
                                            value={rg}
                                            onChange={e => setRg(e.target.value)}
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
                                    value={dataNascimento}
                                    onChange={e => setDataNascimento(e.target.value)}
                                />
                                    
                            </Form.Input>

                            <Form.Input
                                 fluid
                                required
                                label='Fone Celular'
                                    width={6} >
                                <InputMask
                                value={foneCelular}
                                onChange={e => setFoneCelular(e.target.value)}
                                    mask="(99) 9999.9999"
                                />
                            </Form.Input>

                            <Form.Input fluid
                                label='Fone Fixo'
                                width={6} 
                                >
                                    <InputMask
                                    value = {foneFixo}
                                    onChange={e => setFoneFixo(e.target.value)}
                                    mask="(99) 9999.9999"/>

                            </Form.Input>
                            <Form.Input fluid label='QTD de Entregas Realizadas'>
                                <InputMask value={qtdEntregas}
                                    onChange={e => setQtdEntregas(e.target.value)} required mask="9999" />
                            </Form.Input>

                            <Form.Input fluid label = 'Valor por Frete'>
                                        <InputMask value={valorFrete} onChange={e => setValorFrete(e.target.value)} required mask="999"/>
                            </Form.Input>
                        </Form.Group>

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

                        <FormGroup>

                                <Form.Checkbox
                                    label='Ativo'
                                    checked={ativo}
                                    onChange={e => setAtivo(true)}
                                    toggle
                                />
                                <Form.Checkbox
                                    label='Inativo'
                                    checked={!ativo}
                                    onChange={e => setAtivo(false)}
                                    toggle
                                />

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