const request = require('supertest');
const app = require('../../server');

describe('Teste das rotas de médicos', () => {
    it('Deve retornar todos os médicos', async () => {
        const res = await request(app).get('/api/v1/medics');

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.medics).not.toBeNull();
    });

    it('Deve retornar apenas um médico', async () => {
        await request(app).post('/api/v1/medics').send({
            name: "Lucas",
            password: "12345",
            email: "lucasmedic@gmail.com"
        });

        const created = await request(app).get('/api/v1/medics');
        const idMedic = created.body.medics[0]._id;

        const res = await request(app).get(`/api/v1/medics/${idMedic}`);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.medic).not.toBeNull();
    });

    it('Deve atualizar um médico', async () => {
        await request(app).post('/api/v1/medics').send({
            name: "Lucas",
            password: "12345",
            email: "lucasmedic1@gmail.com"
        });
        const update = { name: "João" };
        const created = await request(app).get('/api/v1/medics');
        const idMedic = created.body.medics[0]._id;

        const res = await request(app).patch(`/api/v1/medics/${idMedic}`).send(update);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.updatedMedic).not.toBeNull();
    });

    it('Deve deletar um médico', async () => {
        await request(app).post('/api/v1/medics').send({
            name: "Lucas",
            password: "12345",
            email: "lucasmedic2@gmail.com"
        });
        const created = await request(app).get('/api/v1/medics');
        const idMedic = created.body.medics[0]._id;

        const res = await request(app).delete(`/api/v1/medics/${idMedic}`);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.deletedMedic).not.toBeNull();
    });
});
