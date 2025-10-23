const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferências', () => {
    describe('POST /transferencias', () => {
        let token;
        
        beforeEach( async () => {
            token = await obterToken('julio.lima', '123456')
        })
        
        it('Seve retornar sucesso com 201 quando o valor da tranferencia for igual ou acima de 10R$', async () => {
            const bodyTransferencias = { ...postTransferencias }
            
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
                
                expect(response.status).to.equal(201);

        })
        
        it('Seve retornar falha com 422 quando o valor da tranferencia for abaixo de 10R$', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 7

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
                
                expect(response.status).to.equal(422);

        })
    })
})