const request = require('supertest');

const obterToken = async (usuario, senha) => {
    const responseToken = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            'username': usuario,
            'senha': senha
            })
    
    return responseToken.body.token
}

module.exports = {
    obterToken
}