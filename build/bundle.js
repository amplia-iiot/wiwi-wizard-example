webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function (app) {
    'use strict';

    // Use Application configuration module to register a new module
    app.registerModule('wiwi.wizard', ['adf.provider', 'wizard']);
}(ApplicationConfiguration));

__webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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

__webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

(function () {
    'use strict';

    var _wizard = angular.module('wiwi.wizard');

    _wizard.controller('wizardExampleController', ['$scope', '$uibModalInstance', '$controller', 'toastr', 'stepsWizardService', 'datastreamServiceProvider', '$window',
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

            //src/config/wizard.config.js
            var isEdit = $scope.config._event === 'edit';
            var isCreate = $scope.config._event === 'create';

            $scope.isEditMode = function () {
                //original: return Object.keys($scope.$resolve.updateData).length > 1;
                return isEdit;
            };

            if ($scope.isEditMode()) {
                //src/config/wizard.config.js
                var updateData = $scope.config.updateData;
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


            var _this = this;
            _this.error = {
                message: 'Error on wizard'
            };

            //example
            function failOrSuccess() {
                $window.setTimeout(function () {
                    if (Math.random() % 2 === 0) {
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
                if (Math.random() % 2 === 0) {
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
                if (Math.random() % 2 === 0) {
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
            //**ohters (init services, events, load combos...**/
            $scope.$on('destroy', function () {

            });
        }
    ]);
}());

__webpack_require__(4);
__webpack_require__(5);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

(function () {
    'use strict';

    var _wizard = angular.module('wiwi.wizard');

    _wizard.factory('stepsWizardService', [function () {

        var stepAdminController = function ($scope) {

            //Configure buttons
            $scope.show_next = $scope.getEnabledSteps().length > 1;
            $scope.show_previous = false;

            //src/config/wizard.config.js
            var updateData = $scope.config.updateData || {};
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
                },
                {
                    "type": "submit",
                    "style": "btn-info",
                    "title": "OK"
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
                //src/config/wizard.config.js
                $scope.config.updateData = updateData || {};
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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var v1='<fieldset class=wiwi-step-admin><div class=col-xs-12><form sf-schema=schema sf-form=form sf-model=model sf-options=sfOptions></form></div><wizard-log class=col-xs-12 bar=progressLog></wizard-log></fieldset>';
angular.module('wiwi.wizard').run(['$templateCache', function ($templateCache) {$templateCache.put('src/views/step.admin.view.html', v1);}]);
module.exports=v1

/***/ })
],[0]);