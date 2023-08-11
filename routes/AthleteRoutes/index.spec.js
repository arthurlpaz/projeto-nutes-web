// const request = require('supertest');
// const app = require('../../server');

// describe('Teste das rotas de atletas', () => {
//     it('Deve retornar a criação de um atleta', async () => {
//         const res = await request(app).post('/api/v1/athletes').send({
//             name: "kaique",
//             password: "147852",
//             email: "kaique@gmail.com"
//         });

//         console.log(res.body)

//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 message: 'Athlete created!'
//             })
//         )
//     })
// })