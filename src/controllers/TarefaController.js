
const Tarefa = require('../models/Tarefa');

class TarefaController {

    // Lista as tarefas e aplica os filtros
    static listar(req, res) {
        const filtro = req.query.status || 'todas';

        const filtrosValidos = ['todas', 'pendente', 'concluida'];

        const filtroAtual = filtrosValidos.includes(filtro)
            ? filtro
            : 'todas';

        const tarefas = Tarefa.listar(filtroAtual);

        res.render('tarefas/index', {
            tarefas,
            filtroAtual
        });
    }

    // Exibe o formulário de cadastro
    static novo(req, res) {
        res.render('tarefas/formulario', {
            tarefa: null,
            erro: null
        });
    }

    // Cadastra uma tarefa
    static cadastrar(req, res) {
        const { titulo, descricao, disciplina } = req.body;

        const erro = TarefaController.validar(
            titulo,
            descricao,
            disciplina
        );

        if (erro) {
            return res.status(400).render('tarefas/formulario', {
                tarefa: { titulo, descricao, disciplina },
                erro
            });
        }

        Tarefa.cadastrar({
            titulo: titulo.trim(),
            descricao: (descricao || '').trim(),
            disciplina: disciplina.trim()
        });

        res.redirect('/');
    }

    // Exibe os detalhes de uma tarefa
    static detalhes(req, res) {
        const tarefa = Tarefa.buscarPorId(req.params.id);

        if (!tarefa) {
            return res.status(404).send('Tarefa não encontrada.');
        }

        res.render('tarefas/detalhes', { tarefa });
    }

    // Exibe o formulário de edição
    static editarFormulario(req, res) {
        const tarefa = Tarefa.buscarPorId(req.params.id);

        if (!tarefa) {
            return res.status(404).send('Tarefa não encontrada.');
        }

        res.render('tarefas/formulario', {
            tarefa,
            erro: null
        });
    }

    // Atualiza uma tarefa
    static atualizar(req, res) {
        const { titulo, descricao, disciplina } = req.body;

        const erro = TarefaController.validar(
            titulo,
            descricao,
            disciplina
        );

        const tarefaAtual = Tarefa.buscarPorId(req.params.id);

        if (!tarefaAtual) {
            return res.status(404).send('Tarefa não encontrada.');
        }

        if (erro) {
            return res.status(400).render('tarefas/formulario', {
                tarefa: {
                    ...tarefaAtual,
                    titulo,
                    descricao,
                    disciplina
                },
                erro
            });
        }

        Tarefa.editar(req.params.id, {
            titulo: titulo.trim(),
            descricao: (descricao || '').trim(),
            disciplina: disciplina.trim()
        });

        // Redireciona para a rota correta dos detalhes
        res.redirect(`/${req.params.id}`);
    }

    // Conclui uma tarefa
    static concluir(req, res) {
        const tarefa = Tarefa.concluir(req.params.id);

        if (!tarefa) {
            return res.status(404).send('Tarefa não encontrada.');
        }

        res.redirect('/');
    }

    // Exclui uma tarefa
    static excluir(req, res) {
        const excluida = Tarefa.excluir(req.params.id);

        if (!excluida) {
            return res.status(404).send('Tarefa não encontrada.');
        }

        res.redirect('/');
    }

    // Valida os campos da tarefa
    static validar(titulo, descricao, disciplina) {
        if (!titulo || !titulo.trim()) {
            return 'O título é obrigatório.';
        }

        if (titulo.trim().length < 3 || titulo.trim().length > 100) {
            return 'O título deve ter entre 3 e 100 caracteres.';
        }

        if (descricao && descricao.length > 500) {
            return 'A descrição deve ter no máximo 500 caracteres.';
        }

        if (!disciplina || !disciplina.trim()) {
            return 'A disciplina é obrigatória.';
        }

        if (disciplina.trim().length < 2 || disciplina.trim().length > 80) {
            return 'A disciplina deve ter entre 2 e 80 caracteres.';
        }

        return null;
    }
}

module.exports = TarefaController;
