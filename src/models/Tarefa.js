
let tarefas = [];
let proximoId = 1;

class Tarefa {
    static listar(filtro = 'todas') {
        if (filtro === 'todas') {
            return tarefas;
        }

        return tarefas.filter(tarefa => tarefa.status === filtro);
    }

    static buscarPorId(id) {
        return tarefas.find(tarefa => tarefa.id === Number(id));
    }

    static cadastrar(dados) {
        const tarefa = {
            id: proximoId++,
            titulo: dados.titulo,
            descricao: dados.descricao || '',
            disciplina: dados.disciplina,
            status: 'pendente'
        };

        tarefas.push(tarefa);

        return tarefa;
    }

    static editar(id, dados) {
        const tarefa = this.buscarPorId(id);

        if (!tarefa) {
            return null;
        }

        tarefa.titulo = dados.titulo;
        tarefa.descricao = dados.descricao || '';
        tarefa.disciplina = dados.disciplina;

        return tarefa;
    }

    static concluir(id) {
        const tarefa = this.buscarPorId(id);

        if (!tarefa) {
            return null;
        }

        tarefa.status = 'concluida';

        return tarefa;
    }

    static excluir(id) {
        const indice = tarefas.findIndex(
            tarefa => tarefa.id === Number(id)
        );

        if (indice === -1) {
            return false;
        }

        tarefas.splice(indice, 1);

        return true;
    }
}

module.exports = Tarefa;
