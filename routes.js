

module.exports = function(swagger) {

	var userController = require('./controllers/users') (swagger);

	swagger.addGet(userController.index);
	swagger.addGet(userController.read);
	swagger.addPut(userController.update);
	swagger.addDelete(userController.delete);
	swagger.addPost(userController.create);
}