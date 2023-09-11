const request = require('supertest');
const app = require('../../server');

describe('Teste das rotas de atletas', () => {
    it('Deve retornar a criação de um atleta', async () => {
        const res = await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(201);
        // Verifica o corpo da resposta
        expect(res.body.message).toEqual('Athlete created!');
    });

    it('Deve retornar todos os atletas', async () => {
        const res = await request(app).get('/api/v1/athletes');

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.athletes).not.toBeNull();
    });

    it('Deve retornar apenas um atleta', async () => {
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;

        const res = await request(app).get(`/api/v1/athletes/${idAthlet}`);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.athlete).not.toBeNull();
    });

    it('Deve atualizar um atleta', async () => {
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        const update = { name: "João" };
        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;

        const res = await request(app).patch(`/api/v1/athletes/${idAthlet}`).send(update);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.updatedAthlete).not.toBeNull();
    });

    it('Deve deletar um atleta', async () => {
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;

        const res = await request(app).delete(`/api/v1/athletes/${idAthlet}`);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.deletedAthlete).not.toBeNull();
    });
});
