const request = require('supertest');
const app = require('../../server');

describe('Testes para as rotas de autenticação', () => {
    it('Deve registrar um médico', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            name: "kaiqueivo",
            email: "kaiqueiv@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(201);
        // Verifica o corpo da resposta
        expect(res.body.message).toEqual('User created!');
    });

    it('Deve efetuar o login de um médico', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: "kaiqueiv@gmail.com",
            password: "12345",
        })

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.token).not.toBeNull();
    });

    it('Deve retornar os dados do médico logado', async () => {
        await request(app).post('/api/v1/auth/register').send({
            name: "kaique",
            email: "kaiqueivo@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });
        const res = await request(app).post('/api/v1/auth/login').send({
            email: "kaiqueivo@gmail.com",
            password: "12345",
        });
        const res2 = await request(app).get('/api/v1/auth/me').set({
            Authorization: `Bearer ${res.body.token}`
        });

        // Verifica o código de status da resposta
        expect(res2.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res2.body.medic).not.toBeNull();
    });
})