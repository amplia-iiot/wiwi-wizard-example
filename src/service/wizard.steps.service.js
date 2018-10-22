(function () {
    'use strict';

    var _wizard = angular.module('wiwi.wizard');

    _wizard.factory('stepsWizardService', [function () {

        var stepAdminController = function ($scope) {

            //Configure buttons
            $scope.show_next = $scope.getEnabledSteps().length > 1;
            $scope.show_previous = false;

            var updateData = $scope.$resolve.updateData || {};
            console.log('UPDATE_DATA: ' + updateData);

            if ($scope.isEditMode()) {
                $scope.show_execute = false;
                $scope.show_update = true;
            } else {
                $scope.show_execute = true;
                $scope.show_update = false;
            }

            //http://schemaform.io/examples/bootstrap-example.html
            //Configure form
            $scope.form = [
                "name",
                "email",
                {
                    "key": "comment",
                    "type": "textarea",
                    "placeholder": "Make a comment"
                }
            ];
            //Configure schema
            $scope.schema = {
                "type": "object",
                "title": "Comment",
                "properties": {
                    "name": {
                        "title": "Name",
                        "type": "string"
                    },
                    "email": {
                        "title": "Email",
                        "type": "string",
                        "pattern": "^\\S+@\\S+$",
                        "description": "Email will be used for evil."
                    },
                    "comment": {
                        "title": "Comment",
                        "type": "string",
                        "maxLength": 20,
                        "validationMessage": "Don't be greedy!"
                    }
                },
                "required": [
                    "name",
                    "email"
                ]
            };
            //Configure schema form options
            $scope.sfOptions = {
                validateOnRender: true,
                setSchemaDefaults: true,
                pristine: {
                    errors: true,
                    success: false
                }
            };

            //Logic of step
            function build() {
                $scope.$resolve.updateData = updateData || {};
                console.log('MODEL: ' + JSON.stringify($scope.model));
            }

            //Configure button execute
            $scope.execute = function () {
                build();
                return $scope.executeCreate();
            };

            //Configure button update
            $scope.update = function () {
                build();
                return $scope.executeUpdate();
            };

            //Configure button update
            $scope.next = function () {
                build();
                return true;
            };

            //Configure validation of step
            $scope.exitValidation = function () {
                if ($scope.isEditMode()) {
                    build();
                }
                return true;
            };
        };


        // configure all steps of wizard
        var _steps = {
            'StepAdminController': {
                title: 'HEADER.WIZARD.ENTITY.ADMIN.TITLE',
                name: 'HEADER.WIZARD.ENTITY.ADMIN.NAME',
                description: 'HEADER.WIZARD.ENTITY.ADMIN.DESCRIPTION',
                body: 'src/views/step.admin.view.html',
                popoverInfo: 'info-admin',
                order: 1,
                controller: stepAdminController
            }
        };

        return {
            getStepController: function (name) {
                return _steps[name];
            },
            getStepsController: function () {
                return _steps;
            }
        };
    }]);
}());
