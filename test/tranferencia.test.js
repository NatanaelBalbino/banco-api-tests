const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')

describe('Transferências', () => {
    describe('POST /transferencias', () => {
        let token;
        
        beforeEach( async () => {
            token = await obterToken('julio.lima', '123456')
        })
        
        it('Seve retornar sucesso com 201 quando o valor da tranferencia for igual ou acima de 10R$', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 11,
                    token: ""
                    })
                
                expect(response.status).to.equal(201);

        })
        
        it('Seve retornar falha com 422 quando o valor da tranferencia for abaixo de 10R$', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 7,
                    token: ""
                    })
                
                expect(response.status).to.equal(422);

        })
    })
})