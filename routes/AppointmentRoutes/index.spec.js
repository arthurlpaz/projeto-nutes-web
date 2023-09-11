const request = require('supertest');
const app = require('../../server');

describe('Teste das rotas de agendamento', () => {
    it('Deve retornar a criação de um agendamento', async () => {
        //Criar médico e atleta para ser possível a criação de um agendamento
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        await request(app).post('/api/v1/auth/register').send({
            name: "kaiqueivo",
            email: "kaiqueiv2@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        const res = await request(app).post('/api/v1/appointments').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: `${idAthlet}`,
            type: "Consulta"
        });

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(201);
        // Verifica o corpo da resposta
        expect(res.body.message).toEqual('Appointment created!');
    });

    it('Deve retornar todos os agendamentos', async () => {
        const res = await request(app).get('/api/v1/appointments');

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.appointments).not.toBeNull();
    });

    it('Deve retornar apenas um agendamento', async () => {
        //Criar médico e atleta para ser possível a criação de um agendamento
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        await request(app).post('/api/v1/auth/register').send({
            name: "kaiqueivo",
            email: "kaique22@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        await request(app).post('/api/v1/appointments').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: `${idAthlet}`,
            type: "Consulta"
        });

        const res = await request(app).get(`/api/v1/appointments/${idMedic}/${idAthlet}`);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.appointment).not.toBeNull();
    });

    it('Deve atualizar um agendamento', async () => {
        //Criar médico e atleta para ser possível a criação de um agendamento
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        await request(app).post('/api/v1/auth/register').send({
            name: "kaiqueivo",
            email: "kaique222@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        await request(app).post('/api/v1/appointments').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: `${idAthlet}`,
            type: "Consulta"
        });

        const update = { description: 
            "Raio-x às 16h no dia tal"
        };
        
        const res = await request(app).patch(`/api/v1/appointments/${idMedic}/${idAthlet}`).send(update);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.updatedAppointment).not.toBeNull();
    });

    it('Deve deletar um agendamento', async () => {
        //Criar médico e atleta para ser possível a criação de um agendamento
        await request(app).post('/api/v1/athletes').send({
            name: "Pedro",
            age: "17",
            gender: "Homem",
            height: "1.7",
            weight: "66"
        });
        await request(app).post('/api/v1/auth/register').send({
            name: "kaiqueivo",
            email: "kaique2222@gmail.com",
            password: "12345",
            confirmPassword: "12345"
        });

        const created = await request(app).get('/api/v1/athletes');
        const idAthlet = created.body.athletes[0]._id;
        const created1 = await request(app).get('/api/v1/medics');
        const idMedic = created1.body.medics[0]._id;

        await request(app).post('/api/v1/appointments').send({
            date: "2023-08-20",
            medic: `${idMedic}`,
            athlete: `${idAthlet}`,
            type: "Consulta"
        });

        const res = await request(app).delete(`/api/v1/appointments/${idMedic}/${idAthlet}`);

        // Verifica o código de status da resposta
        expect(res.statusCode).toEqual(200);
        // Verifica o corpo da resposta
        expect(res.body.deletedAppointment).not.toBeNull();
    });
});