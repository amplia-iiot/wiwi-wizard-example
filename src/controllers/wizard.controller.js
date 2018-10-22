(function () {
    'use strict';

    var _wizard = angular.module('wiwi.wizard');

    _wizard.controller('exampleWizardController', ['$scope', '$uibModalInstance', '$controller', 'toastr', 'stepsWizardService', 'datastreamServiceProvider', '$window',
        function ($scope, $uibModalInstance, $controller, toastr, stepsWizardService, datastreamServiceProvider, $window) {

            //***Configuration of wizard***
            var wizard_type = $scope.wizard_type = 'example';

            //**configuration of steps**
            $scope.defaultWizardSteps = stepsWizardService.getStepsController();

            //**configuration of step custom**
            $scope._datastreamService = datastreamServiceProvider.getInstance();

            //**init the wizard and steps**
            $controller('WizardController', {
                $scope: $scope,
                $uibModalInstance: $uibModalInstance
            });

            //**configure wizard defaults with logic of wizard (for all steps)**
            var configWizard = {
                title: 'HEADER.WIZARD.EXAMPLE.TITLE',
                disable: false,
                type: wizard_type,
                name: 'exampleWizardForm'
            };
            $scope.show_reset = false;

            $scope.isEditMode = function () {
                return Object.keys($scope.$resolve.updateData).length > 1;
            };

            if ($scope.isEditMode()) {
                var updateData = $scope.$resolve.updateData;
                console.log('UPDATE_DATA: ' + JSON.stringify(updateData));
                configWizard.disable = false;
                configWizard.editMode = true;
                $scope.configureWizard(configWizard);
                $scope.show_update = true;

            } else {
                $scope.configureWizard(configWizard);
                $scope.show_update = false;
            }

            /*Configure log*/
            $scope.progressLog = {
                title: 'LOG.ENTITY_PROCESS',
                max: 100,
                value: 0,
                type: 'info',
                show: false,
                actions: []
            };

            $scope.clearProgressLog = function () {
                $scope.progressLog.show = false;
                $scope.progressLog.value = 0;
                $scope.progressLog.type = 'info';
                $scope.progressLog.actions.splice(0, $scope.progressLog.actions.length);
            };

            $scope.changeProgressLog = function (_value, _type, _action) {
                $scope.progressLog.show = true;
                $scope.progressLog.value = _value;
                $scope.progressLog.type = _type;
                $scope.progressLog.actions.push(_action);
            };

            function _random() {
                var max = 10;
                var min = 0;
                var r = Math.floor(Math.random() * (max - min)) + min;
                console.log(r);
                return r;
            }


            var _this = this;
            _this.error = {
                message: 'Error on wizard'
            };

            //example
            function failOrSuccess() {
                $window.setTimeout(function () {
                    if (_random() % 2 === 0) {
                        $scope.changeProgressLog(100, 'success', {
                            msg: 'LOG.FINISH',
                            type: 'success'
                        });
                        $scope.completeWizard({
                            returnData: $scope.model
                        });
                    } else {
                        $scope.changeProgressLog(75, 'warning', {
                            msg: _this.error.message,
                            type: 'warning'
                        });
                        $scope.disableWizard(false);
                    }
                    $scope.$apply();
                }, 3000);
            }

            //**Configure logic of wizard create if neccesary. Other way is configure button execute on every step**/
            $scope.executeCreate = function () {
                $scope.clearProgressLog();
                $scope.disableWizard(true);
                $scope.changeProgressLog(25, 'info', {
                    msg: 'LOG.VALIDATING',
                    type: 'info'
                });

                //example
                if (_random() % 2 === 0) {
                    $scope.changeProgressLog(50, 'info', {
                        msg: 'LOG.SENDING',
                        type: 'info'
                    });
                    failOrSuccess();
                } else {
                    $scope.changeProgressLog(75, 'warning', {
                        msg: _this.error.message,
                        type: 'warning'
                    });
                    $scope.disableWizard(false);
                }
            };

            //**Configure logic of wizard update if neccesary. Other way is configure button update on every step**/
            $scope.executeUpdate = function () {
                $scope.clearProgressLog();
                $scope.disableWizard(true);
                $scope.changeProgressLog(25, 'info', {
                    msg: 'LOG.VALIDATING',
                    type: 'info'
                });
                //example
                if (_random() % 2 === 0) {
                    $scope.changeProgressLog(50, 'info', {
                        msg: 'LOG.SENDING',
                        type: 'info'
                    });
                    failOrSuccess();
                } else {
                    toastr.warning(_this.error.message);
                    $scope.disableWizard(false);
                }
            };

            //***Ohter logic of controller***
            $scope.model = {};
            //**ohters (init services, events, load combos...**/
            $scope.$on('destroy', function () {

            });
        }
    ]);
}());

require('../service/wizard.steps.service');
require('../views/step.admin.view.html');
