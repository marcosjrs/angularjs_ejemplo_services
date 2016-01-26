var module = angular.module('app', []);
 
module.service('ContactService', function () {
    //id que tendrá el contacto creado
    var uid = 1;
     
    //Lista de contactos
    var contactos = [{
        id: 0,
        'nombre': 'Prueba',
        'email': 'hello@gmail.com',
        'telefono': '123-2343-44'
    }];
     
    //Si el contacto existe, lo actualizará, sino lo incluirá
    this.save = function (contacto) {
        if (contacto.id == null) { //no existe
            contacto.id = uid++;
            contactos.push(contacto);
        } else {    // ya existía.
            //buscar y actulizar
            for (i in contactos) {
                if (contactos[i].id == contacto.id) {
                    contactos[i] = contacto;
                }
            }
        }
 
    }
 
    //Devuelve el contacto según el id
    this.get = function (id) {
        for (i in contactos) {
            if (contactos[i].id == id) {
                return contactos[i];
            }
        }
 
    }
     
    //Borrar el contacto
    this.delete = function (id) {
        for (i in contactos) {
            if (contactos[i].id == id) {
                contactos.splice(i, 1);
            }
        }
    }
 
    //Devuelve la lista de contactos
    this.list = function () {
        return contactos;
    }
});
 
module
.controller('ContactController', function ($scope, ContactService) {
 
    $scope.contactos = ContactService.list();
 
    $scope.saveContact = function () {
        ContactService.save($scope.nuevocontacto);
        $scope.nuevocontacto = {};
    }
 
 
    $scope.delete = function (id) { 
        ContactService.delete(id);
        if ($scope.nuevocontacto.id == id) $scope.nuevocontacto = {};
    }
 
 
    $scope.edit = function (id) {
        $scope.nuevocontacto = angular.copy(ContactService.get(id));
    }
})
.controller('CheckServiceController', function ($scope, ContactService) { 
    $scope.contactos = ContactService.list();
})


/* fuente original: https://jsfiddle.net/viralpatel/72vT5*/
