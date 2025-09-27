const request = require('supertest');
const { expect } = require('chai')

describe('Transferências', () => {
    describe('POST /transferencias', () => {
        it('Seve retornar sucesso com 201 quando o valor da tranferencia for igual ou acima de 10R$', async () => {
            const responseToken = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                    })
            const token = responseToken.body.token

            const response = await request('http://localhost:3000')
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
            const responseToken = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                    })
            const token = responseToken.body.token

            const response = await request('http://localhost:3000')
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