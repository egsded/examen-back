const express = require('express');
const sequelize = require('./config/database');
const Colonia = require('./models/Colonia');
const authenticateToken = require('./middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Domicilio = require('./models/Domicilio');
const Cliente = require('./models/Cliente');
const cors = require('cors');

Colonia.hasMany(Domicilio, { foreignKey: 'idColonia' });
Domicilio.belongsTo(Colonia, { foreignKey: 'idColonia' });
Domicilio.hasMany(Cliente, { foreignKey: 'idDomicilio' });
Cliente.belongsTo(Domicilio, { foreignKey: 'idDomicilio' });

const app = express();
app.use(cors());
app.use(express.json());

sequelize.sync().then(() => console.log('Database synced'));

// Crear JWT
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = { email };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

//   ---------------------------------------------Colonia------------------------------------------------------
// Crear Colonia
app.post('/colonia/crear', authenticateToken, async (req, res) => {
    try {
        const colonia = await Colonia.create(req.body);
        res.json(colonia);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar Colonias
app.get('/colonias', authenticateToken, async (req, res) => {
    try {
        const colonias = await Colonia.findAll();
        res.json(colonias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Colonia por ID
app.get('/colonia/:id', authenticateToken, async (req, res) => {
    try {
        const colonia = await Colonia.findByPk(req.params.id);
        if (colonia) {
            res.json(colonia);
        } else {
            res.status(404).json({ error: 'No se encontro la colonia' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Editar Colonia
app.put('/colonia/editar/:id', authenticateToken, async (req, res) => {
    try {
        const colonia = await Colonia.findByPk(req.params.id);
        if (colonia) {
            await colonia.update(req.body);
            res.json(colonia);
        } else {
            res.status(404).json({ error: 'No se encontro la colonia' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar Colonia
app.delete('/colonia/eliminar/:id', authenticateToken, async (req, res) => {
    try {
        const colonia = await Colonia.findByPk(req.params.id);
        if (colonia) {
            await colonia.destroy();
            res.json({ message: 'Colonia borrada' });
        } else {
            res.status(404).json({ error: 'No se encontro la colonia' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// -----------------------------------------------------Domicilio----------------------------------------------
// Crear Domicilio
app.post('/domicilio/crear', authenticateToken, async (req, res) => {
    try {
        const domicilio = await Domicilio.create(req.body);
        res.json(domicilio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar Domicilio
app.get('/domicilios', authenticateToken, async (req, res) => {
    try {
        const domicilio = await Domicilio.findAll({
            include: Colonia,
        });
        res.json(domicilio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Domicilio por ID
app.get('/domicilio/:id', authenticateToken, async (req, res) => {
    try {
        const domicilio = await Domicilio.findByPk(req.params.id, {
            include: Colonia,
        });
        if (domicilio) {
            res.json(domicilio);
        } else {
            res.status(404).json({ error: 'No se encontro el domicilio' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Editar Domicilio
app.put('/domicilio/editar/:id', authenticateToken, async (req, res) => {
    try {
        const domicilio = await Domicilio.findByPk(req.params.id);
        if (domicilio) {
            await domicilio.update(req.body);
            res.json(domicilio);
        } else {
            res.status(404).json({ error: 'No se encontro el domicilio' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar Domicilio
app.delete('/domicilio/eliminar/:id', authenticateToken, async (req, res) => {
    try {
        const domicilio = await Domicilio.findByPk(req.params.id);
        if (domicilio) {
            await domicilio.destroy();
            res.json({ message: 'Domicilio borrado' });
        } else {
            res.status(404).json({ error: 'No se encontro el domicilio' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// -----------------------------------------------------Clientes----------------------------------------------
// Crear Cliente
app.post('/cliente/crear', authenticateToken, async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        res.json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar Cliente
app.get('/clientes', authenticateToken, async (req, res) => {
    try {
        const cliente = await Cliente.findAll({
            include: Domicilio,
        });
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cliente por ID
app.get('/cliente/:id', authenticateToken, async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id, {
            include: Domicilio,
        });
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ error: 'No se encontro el cliente' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Editar Cliente
app.put('/cliente/editar/:id', authenticateToken, async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (cliente) {
            await cliente.update(req.body);
            res.json(cliente);
        } else {
            res.status(404).json({ error: 'No se encontro el cliente' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar Cliente
app.delete('/cliente/eliminar/:id', authenticateToken, async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (cliente) {
            await cliente.destroy();
            res.json({ message: 'Cliente borrado' });
        } else {
            res.status(404).json({ error: 'No se encontro el cliente' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));