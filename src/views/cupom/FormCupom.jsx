import React, {useState, useEffect}from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, FormGroup, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import axios from "axios";
import { Link, useLocation  } from "react-router-dom";
import {mensagemErro, notifyError, notifySuccess } from '../../views/util/util';


export default function FormProduto() {

    const [codigoDesconto, SetCodigoDesconto] = useState('')
    const [percentualDesconto, SetPercentualDesconto] = useState('')
    const [valorDesconto, SetValorDesconto] = useState('')
    const [valorMinimoPedidoPermitido, SetValorMinimoPedidoPermitido] = useState('')
    const [quantidadeMaximaUso, SetQuantidadeMaximaUso] = useState('')
    const [inicioVigencia, SetInicioVigencia] = useState('')
    const [fimVigencia, SetFimVigencia] = useState('')
    const [idCupom, setIdCupom] = useState()
    const { state } = useLocation();
    



    
    useEffect(() => {
        console.log(state)
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/cupomdesconto/" + state.id)
                .then((response) => {
                    SetCodigoDesconto(response.data.codigoDesconto)
                    SetPercentualDesconto(response.data.percentualDesconto)
                    SetValorDesconto(response.data.valorDesconto)
                    SetValorMinimoPedidoPermitido(response.data.valorMinimoPedidoPermitido)
                    SetQuantidadeMaximaUso(response.data.quantidadeMaximaUso)
                    SetInicioVigencia(response.data.inicioVigencia)
                    SetFimVigencia(response.data.fimVigencia)
                    setIdCupom(response.data.id)
                })
        }

    }, [state])


    function salvar() {

		let cupomRequest = {
            
            codigoDesconto: codigoDesconto,
		    percentualDesconto: percentualDesconto,
		    valorDesconto: valorDesconto,
		    valorMinimoPedidoPermitido: valorMinimoPedidoPermitido,
		    quantidadeMaximaUso: quantidadeMaximaUso,
            inicioVigencia: inicioVigencia,
            fimVigencia: fimVigencia
		}
	console.log(idCupom)

    if (idCupom != undefined) { 
		axios.put("http://localhost:8080/api/cupomdesconto/" + idCupom, cupomRequest)
		.then((response) => {
            
		     console.log('cupom cadastrado com sucesso.')
             notifySuccess('Cupom alterado com sucesso.')

             window.location.replace("/list-cupom")

		})
		.catch((error) => {

		     console.log('Erro ao incluir o cupom.')
             if (error.response) {
                notifyError(error.response.data.errors[0].defaultMessage)
                } else {
                notifyError(mensagemErro)
                } 
                
		})
    } else {
      console.log(cupomRequest)
        axios.post("http://localhost:8080/api/cupomdesconto" ,cupomRequest)
		.then((response) => {
            
		     console.log('cupom cadastrado com sucesso.')
             notifySuccess('Cupom cadastrado com sucesso.')

             window.location.replace("/list-cupom")
		})
		.catch((error) => {
		     console.log('Erro ao incluir o cupom.')
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

                <Container textAlign='justified' >

                { idCupom === undefined &&
    <h2> <span style={{color: 'darkgray'}}> Cupom &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
}
{ idCupom !== undefined &&
    <h2> <span style={{color: 'darkgray'}}> Cupom &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
}

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Codigo'
                                    maxLength="100"
                                    style={{ width: "36em" }}
                                    value={codigoDesconto}
                                    onChange={e => SetCodigoDesconto(e.target.value)}

                                />

                                <Form.Input
                                    
                                    fluid
                                    label='Percentual de desconto'>
                                    <InputMask
                                        required
                                        mask="99"
                                        value={percentualDesconto}
                                        onChange={e => SetPercentualDesconto(e.target.value)}
    
                                    />
                                </Form.Input>

                                
                                <Form.Input
                                
                                    fluid
                                    label='Valor Desconto'
                                    style={{ width: "24em" }}

                                >
                                    <InputMask
                                        required
                                        mask="99"
                                        value={valorDesconto}
                                        onChange={e => SetValorDesconto(e.target.value)}
    
                                    />
                                </Form.Input>
                            </Form.Group>


                            <FormGroup>




                                <Form.Input
                                    
                                    fluid
                                    label='Valor Minimo para o pedido'
                                    style={{ width: "40em" }}

                                >
                                    <InputMask
                                        required
                                        mask="99"
                                        value={valorMinimoPedidoPermitido}
                                        onChange={e => SetValorMinimoPedidoPermitido(e.target.value)}
    
                                    />
                                </Form.Input>

                                <Form.Input
                                    
                                    fluid
                                    label='Quantidade maxima de uso por cliente'
                                    style={{ width: "39.2em" }}
                                >
                                    <InputMask
                                        required
                                        value={quantidadeMaximaUso}
                                        onChange={e => SetQuantidadeMaximaUso(e.target.value)}
    
                                        mask="9"
                                    />
                                </Form.Input>

            

                            </FormGroup>
                            <FormGroup>

                                      
                            <Form.Input
                                    fluid
                                label='Inicio da Vigencia'

                                width={6}
                            >
                                <InputMask
                                    mask="99/99/9999"
                                        maskChar={null}
                                    placeholder="Ex: 20/03/1985"
                                    value={inicioVigencia}
                                    onChange={e => SetInicioVigencia(e.target.value)}
                                />
                                    
                            </Form.Input>
                            <Form.Input
                                    fluid
                                label='Fim da vigencia'

                                width={6}
                            >
                                <InputMask
                                    mask="99/99/9999"
                                        maskChar={null}
                                    placeholder="Ex: 20/03/1985"
                                    value={fimVigencia}
                                    onChange={e => SetFimVigencia(e.target.value)}
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
                                <Link to={'/list-cupom'}>Voltar</Link>

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
