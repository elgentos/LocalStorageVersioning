requirejs(['jquery','mage/cookies'], function ($) {
    "use strict";

    if ($.mage.cookies.get('mage-localstorage-cleared')) {
        return;
    }

    $.ajax({
        url: '/static/deployed_version.txt',
        type: 'get',

        success: function (deployedVersion) {
            if ($.mage.cookies.get('mage-deployed-version')) {
                if (deployedVersion > $.mage.cookies.get('mage-deployed-version')) {
                    console.log('Clearing localStorage because deployedVersion is newer than cookie');
                    localStorage.clear();
                } else if (deployedVersion < $.mage.cookies.get('mage-deployed-version')) {
                    console.log('Cookie is newer than deployedVersion; this should not happen.');
                } else {
                    console.log('Do nothing! Everything is uptodate.');
                }
            } else {
                console.log('Clearing localStorage because cookie is not found.');
                $.mage.cookies.set('mage-deployed-version', deployedVersion, {});
                localStorage.clear();
            }
        },

        error: function () {
            console.log('Clearing localStorage because no deployed version was found; static signing is probably disabled. Static signing is necessary for this extension to work.');
            $.mage.cookies.set('mage-localstorage-cleared', true, {'lifetime': 60*60*24});
            localStorage.clear();
        }
    });
});