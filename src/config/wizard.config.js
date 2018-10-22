(function () {
    'use strict';

    angular
        .module('wiwi.wizard')
        .run(function ($enabledWizards) {
            //Configuración (opcional) del wizard en servicio que provee y lanza los wizards
            $enabledWizards.wizards.exampleWizard = $enabledWizards.getCommonConfig({
                //Podmeos sobre-escribir el template (html base del wizard)
                //Por defecto
                //template: 'modules/wizard/client/views/wizard.client.view.html',
                controller: 'exampleWizardController',
                windowClass: 'exampleWizard-wizard',
                //Podmeos sobre-escribir el tamaño del wizard, posibles valores:  el, sm, lg
                //Por defecto
                //size: 'el'
            });

            /**
             * Si esta configuración no se definiera, el servicio lanzaría un wizard con la siguiente configuración
             * {
             *      template: 'modules/wizard/client/views/wizard.client.view.html',
             *      controller:  name_of_wizard + 'Controller',
             *      windowClass: name_of_wizard + '-wizard'
             * }
             * 
             * Donde name_of_wizard es: meta-widget.json -> actions[nombre_de_acción][nombre_de_widget]
             */
        });

}());

require('../controllers/wizard.controller');
