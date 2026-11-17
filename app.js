
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');

const tarefaRoutes = require('./src/routes/tarefaRoutes');

const app = express();

const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', tarefaRoutes);

app.use((req, res) => {
    res.status(404).send('Página não encontrada.');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
