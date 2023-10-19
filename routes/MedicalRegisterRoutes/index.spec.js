const request = require('supertest');
const app = require('../../server');
//const mongoose = require('mongoose');

describe('Teste das rotas de registros médicos', () => {
    it('Deve retornar a criação de um registro médico', async () => {
        //Criar médico e atleta para ser possível a criação de um registro médico
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        await request(app).post('/api/v1/auth/register').send({
            name: "kaiqueivo",
            email: "kaiqueiv0@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        const res = await request(app).post('/api/v1/medicalRegisters').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: `${idAthlet}`,
            physicalExams: ["Cardio", "Vascular"]
        });

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(201);
        // Verifica o corpo da resposta
        expect(res.body.message).toEqual('Medical Register created!');
    });

    it('Deve retornar todos os registros médicos', async () => {
        const res = await request(app).get('/api/v1/medicalRegisters');

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.registers).not.toBeNull();
    });

    it('Deve retornar apenas um registro médico', async () => {
        //Criar médico e atleta para ser possível a criação de um registro médico
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        await request(app).post('/api/v1/auth/register').send({
            name: "kaiqueivo",
            email: "kaique0@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        await request(app).post('/api/v1/medicalRegisters').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: `${idAthlet}`,
            physicalExams: ["Cardio", "Vascular"]
        });

        const res = await request(app).get(`/api/v1/medicalRegisters/${idMedic}/${idAthlet}`);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.register).not.toBeNull();
    });

    it('Deve atualizar um registro médico', async () => {
        //Criar médico e atleta para ser possível a criação de um registro médico
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        await request(app).post('/api/v1/auth/register').send({
            name: "kaiqueivo",
            email: "kaique00@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        await request(app).post('/api/v1/medicalRegisters').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: `${idAthlet}`,
            physicalExams: ["Cardio", "Vascular"]
        });

        
        const update = { prescriptions: [{
            name: "remédio1",
            date: "2023-09-10",
            quantity: "2",
            time: "24 horas"
        }] };
        
        const res = await request(app).patch(`/api/v1/medicalRegisters/${idMedic}/${idAthlet}`).send(update);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.updatedRegister).not.toBeNull();
    });

    it('Deve deletar um registro médico', async () => {
        //Criar médico e atleta para ser possível a criação de um registro médico
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        await request(app).post('/api/v1/auth/register').send({
            name: "kaiqueivo",
            email: "kaique000@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        await request(app).post('/api/v1/medicalRegisters').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: `${idAthlet}`,
            physicalExams: ["Cardio", "Vascular"]
        });

        const res = await request(app).delete(`/api/v1/medicalRegisters/${idMedic}/${idAthlet}`);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.deletedRegister).not.toBeNull();
    });

    //Adicionados
    it('Deve retornar um erro ao criar registro com médico inexistente', async () => {
        
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;

        const res = await request(app).post('/api/v1/medicalRegisters').send({
            date: "2023-08-20",
            medic: "6500ed82cd64175b749752e4",
            athlete: `${idAthlet}`,
            physicalExams: ["Cardio", "Vascular"]
        });

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(404);
    });

    it('Deve retornar um erro ao criar registro com atleta inexistente', async () => {
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        const res = await request(app).post('/api/v1/medicalRegisters').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: "6500ed82cd64175b749752e4",
            physicalExams: ["Cardio", "Vascular"]
        });

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(404);
    });

    it('Deve retornar um erro ao atualizar um registro médico inexistente', async () => {

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        await request(app).post('/api/v1/medicalRegisters').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: `${idAthlet}`,
            physicalExams: ["Cardio", "Vascular"]
        });

        
        const update = { prescriptions: [{
            name: "remédio1",
            date: "2023-09-10",
            quantity: "2",
            time: "24 horas"
        }] };
        
        const res = await request(app).patch(`/api/v1/medicalRegisters/6500ed82cd64175b749752e4/${idAthlet}`).send(update);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(404);
        // Verifica o corpo da resposta
        expect(res.body.updatedRegister).toBeUndefined();
    });
    //afterEach(async () => {
        //await mongoose.connection.db.dropDatabase();
    //});
});
