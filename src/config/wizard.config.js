(function () {
    'use strict';

    angular
        .module('wiwi.wizard')
        /*.config(function (dashboardProvider) {
          dashboardProvider
            .widget('exampleWizard', {
              title: 'Example wizard',
              description: 'This widget is an example of wiwi of type wizard',
              template: require('{widgetsPath}/opengate-web/modules/wizard/client/views/entity/entitywizard.client.view.html'),
              controller: 'wizardExampleController',
              category: 'Wizards',
              show_modal_footer: false,
              show_reload_config: false
            });
        })*/

        .run(function ($doActions) {
            $doActions.listener('exampleWizard', function (updateData) {
                return (new ParserConfig(updateData)).parse();
            });

            function ParserConfig(_data) {
                this.parse = function () {
                    switch (_data._event) {
                        case 'createExampleWizard':
                            return {
                                _event: 'create'
                            };
                        case 'editExampleWizard':
                            return {
                                updateData: _data,
                                _event: 'edit'
                            };
                        default:
                            break;
                    }
                };
            }
        });

}());

require('../controllers/wizard.controller');
