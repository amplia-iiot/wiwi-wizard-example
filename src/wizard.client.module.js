(function (app) {
    'use strict';

    // Use Application configuration module to register a new module
    app.registerModule('wiwi.wizard', ['adf.provider', 'wizard']);
}(ApplicationConfiguration));

require('./config/wizard.config');
