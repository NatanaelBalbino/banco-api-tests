const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferências', () => {
        let token;
        
        beforeEach( async () => {
            token = await obterToken('julio.lima', '123456')
        })
    
    describe('POST /transferencias', () => {
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

    describe('GET /transferencias/{id}', () => {
        it('Deve retornar com sucesso 200 e dados iguais ao registro de tranferencia contido no banco de dads quando o ID for válido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/1')
                .set('Authorization', `Bearer ${token}`)
                
                expect(resposta.status).to.equal(200)
                expect(resposta.body.id).to.equal(1)
                expect(resposta.body.id).to.be.a('number')
                expect(resposta.body.conta_origem_id).to.equal(1)
                expect(resposta.body.conta_destino_id).to.equal(2)
                expect(resposta.body.valor).to.equal(11.00)

        })
    })

    describe('GET /transferencias', () => {
        it('Deve retornar 10 elementos na páginação quando informar limite de 10 registros', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200)
            expect(resposta.body.limit).to.equal(10)
            expect(resposta.body.transferencias).to.have.lengthOf(10)
        })
    })
})