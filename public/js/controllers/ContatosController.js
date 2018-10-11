angular.module('contatooh').controller('ContatosController',function($scope,$resource){
    
    $scope.filtro = '';
    $scope.contatos = [];
    $scope.mensagem = {texto:''};

    var Contato = $resource('/contatos/:id');

    function buscaContatos(){
    
        Contato.query(
            function(contatos){
                $scope.contatos = contatos;
                $scope.mensagem = {};
            },
            function(erro){
                console.log(erro);
                $scope.mensagem = {texto:'Não foi possível obter a lista'};
            }
        );
    }
    buscaContatos();

    

    $scope.remove = function (contato) {
		var promise = Contato.delete({ id: contato._id }).$promise;
		promise
			.then(buscaContatos)
			.catch(function (erro) {
				$scope.mensagem = {texto:'Não foi possível obter a lista'};
				console.log(erro);
			});
	};

    
    
});