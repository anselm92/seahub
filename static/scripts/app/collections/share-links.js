define([
    'underscore',
    'backbone',
    'common',
    'app/models/share-link'
], function(_, Backbone, Common, ShareLink) {
    'use strict';

    var ShareLinkCollection = Backbone.Collection.extend({

        model: ShareLink,

        initialize: function(options) {
            if (options) {
                this.repo_id = options.repo_id;
            }
        },

        url: function() {
            if (this.repo_id) {
                return Common.getUrl({name: 'share_links'}) + '?repo_id=' + this.repo_id;
            } else {
                return Common.getUrl({name: 'share_links'});
            }
        }

    });

    return ShareLinkCollection;
});
