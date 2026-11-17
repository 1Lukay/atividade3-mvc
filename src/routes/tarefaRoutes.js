
const express = require('express');
const router = express.Router();

const TarefaController = require('../controllers/TarefaController');

// Listagem e cadastro
router.get('/', TarefaController.listar);
router.get('/nova', TarefaController.novo);
router.post('/', TarefaController.cadastrar);

// Detalhes e edição
router.get('/:id/editar', TarefaController.editarFormulario);
router.post('/:id', TarefaController.atualizar);
router.get('/:id', TarefaController.detalhes);

// Conclusão e exclusão
router.patch('/:id/concluir', TarefaController.concluir);
router.delete('/:id', TarefaController.excluir);

module.exports = router;
