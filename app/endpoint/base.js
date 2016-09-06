(() => {

    'use strict';

    const Base = class {

        constructor(settings) {

            if (settings && typeof settings.table === 'string') {
                this.table = settings.table;
            } else {
                this.table = undefined;
            }

        }

        get() {
            return {};
        }

        post() {
            return {};
        }

        delete() {
            return {};
        }

        patch() {
            return {};
        }

        put() {
            return {};
        }

    };

    module.exports = Base;

})();
