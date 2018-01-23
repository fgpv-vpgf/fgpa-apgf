import * as moment from 'moment-timezone';

/**
 * @name version
 * @memberof app.core
 * @constant
 * @description
 *
 * The 'version' constant service provides current version numbers and the timestap.
 */
angular
    .module('app.core')
    .constant('version', {
        major: AVersion.major,
        minor: AVersion.minor,
        patch: AVersion.patch,
        hash: AVersion.gitHash.substring(0, 9),
        get timestamp() {
            return moment.tz(AVersion.timestamp, moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss');
        }
    });
