'use strict';

/**
 * @ngdoc service
 * @name shaibaApp.SharedData
 * @description
 * # SharedData
 * Factory in the shaibaApp.
 */
angular.module('shaibaApp')
  .factory('SharedData', function () {

    return {
        validationStates: {VALID: ' נוסף בהצלחה.',
                            EMPTY: 'שייבה בז למילים ריקות.',
                            ALREADY_EXISTS: 'תודה, אבל שייבה כבר מכיר את המילה.',
                            NOT_HEBREW: 'שייבה פלופ מספיק כבר בעברית. בואו לא נחצה גבולות שפה כרגע.',
                            WHITE_SPACES: 'תפסיק לדחוף רווחים לשייבה.',
                            WRONG_LENGTH: 'אחי, תנסה שוב משהו באורך הגיוני.',
                            CONTAINS_NUMBERS: 'מה מספרים אחי, מה? תעזור לשייבה להתפקס עם אותיות בעברית.'},

        parseResponse: {SUCCESS: ' נוסף בהצלחה.',
                        FAILED: ' לא התווסף. פארס כשל.'},

        appAlertTypes: {SUCCESS: 'success',
                        WARNING: 'warning',
                        DANGER: 'danger',
                        INFO: 'info'},

        siteTitles: {MAIN: 'מחולל שייבה',
                    SETTINGS: 'הגדרות',
                    HALL: 'היכל התהילה'},

        suffixOptions: {SINGLE_MALE: '',
                        PLURAL_MALE: 'ם',
                        SINGLE_FEMALE: 'ת',
                        PLURAL_FEMALE: 'ות'},

        hebrewOptionsEnum: {SINGLE_MALE: 0,
                            PLURAL_MALE: 1,
                            SINGLE_FEMALE: 2,
                            PLURAL_FEMALE: 3}
    };
  });
