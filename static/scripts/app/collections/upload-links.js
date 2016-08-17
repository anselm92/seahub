define([
    'underscore',
    'backbone',
    'common',
    'app/models/upload-link'
], function(_, Backbone, Common, UploadLink) {
    'use strict';

    var UploadLinkCollection = Backbone.Collection.extend({

        model: UploadLink,

        initialize: function(options) {
            if (options) {
                this.repo_id = options.repo_id;
            }
        },

        url: function() {
            if (this.repo_id) {
                return Common.getUrl({name: 'upload_links'}) + '?repo_id=' + this.repo_id;
            } else {
                return Common.getUrl({name: 'upload_links'});
            }
        }

    });

    return UploadLinkCollection;
});
