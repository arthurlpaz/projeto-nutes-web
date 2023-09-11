const request = require('supertest');
const app = require('../../server');

describe('Teste das rotas de registros médicos', () => {
    it('Deve retornar a criação de um registro de lesão', async () => {
        //Criar médico e atleta para ser possível a criação de um registro de lesão
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        await request(app).post('/api/v1/auth/register').send({
            name: "kaiqueivo",
            email: "kaiqueiv1@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        const res = await request(app).post('/api/v1/injuryRegisters').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: `${idAthlet}`,
            diagnosis: "Rompimento no ligamento do joelho"
        });

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(201);
        // Verifica o corpo da resposta
        expect(res.body.message).toEqual('Injury Register created!');
    });

    it('Deve retornar todos os registros de lesão', async () => {
        const res = await request(app).get('/api/v1/injuryRegisters');

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.injuries).not.toBeNull();
    });

    it('Deve retornar apenas um registro de lesão', async () => {
        //Criar médico e atleta para ser possível a criação de um registro de lesão
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        await request(app).post('/api/v1/auth/register').send({
            name: "kaiqueivo",
            email: "kaique11@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        await request(app).post('/api/v1/injuryRegisters').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: `${idAthlet}`,
            diagnosis: "Rompimento no ligamento do joelho"
        });

        const res = await request(app).get(`/api/v1/injuryRegisters/${idMedic}/${idAthlet}`);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.injury).not.toBeNull();
    });

    it('Deve atualizar um registro de lesão', async () => {
        //Criar médico e atleta para ser possível a criação de um registro de lesão
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        await request(app).post('/api/v1/auth/register').send({
            name: "kaiqueivo",
            email: "kaique111@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        await request(app).post('/api/v1/injuryRegisters').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: `${idAthlet}`,
            diagnosis: "Rompimento no ligamento do joelho"
        });

    
        const update = { prescribedTreatments: [
            "Sessões de fisioterapia",
            "Repouso"
        ] };
        
        const res = await request(app).patch(`/api/v1/injuryRegisters/${idMedic}/${idAthlet}`).send(update);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.updatedInjury).not.toBeNull();
    });

    it('Deve deletar um registro de lesão', async () => {
        //Criar médico e atleta para ser possível a criação de um registro de lesão
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        await request(app).post('/api/v1/auth/register').send({
            name: "kaiqueivo",
            email: "kaique1111@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        await request(app).post('/api/v1/injuryRegisters').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: `${idAthlet}`,
            diagnosis: "Rompimento no ligamento do joelho"
        });

        const res = await request(app).delete(`/api/v1/medicalRegisters/${idMedic}/${idAthlet}`);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.deletedInjury).not.toBeNull();
    });
})