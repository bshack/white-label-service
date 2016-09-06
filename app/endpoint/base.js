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

        }

        post() {

        }

        delete() {

        }

        patch() {

        }

        put() {

        }

    };

    module.exports = Base;

})();
