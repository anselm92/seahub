define([
    'jquery',
    'underscore',
    'backbone',
    'common',
    'moment'
], function($, _, Backbone, Common, Moment) {
    'use strict';

    var View = Backbone.View.extend({
        tagName: 'tr',

        template: _.template($('#repo-shared-link-tmpl').html()),

        events: {
            'mouseenter': 'highlight',
            'mouseleave': 'rmHighlight',
            'click .rm-link': 'removeLink'
        },

        initialize: function(options) {
            this.link_type = options['link_type'];
        },

        render: function() {
            var data = this.model.toJSON();
            var icon_size = Common.isHiDPI() ? 96 : 24;
            var icon_url = this.model.getIconUrl(icon_size);

            _.extend(data, {
                'link_type': this.link_type,
                'icon_url': icon_url,
                'dirent_url': this.model.getWebUrl(),
                'time': data['expire_date'] ? Moment(data['expire_date']).format('YYYY-MM-DD') : ''
            });

            this.$el.html(this.template(data));
            return this;
        },

        highlight: function() {
            this.$el.addClass('hl').find('.op-icon').removeClass('vh');
        },

        rmHighlight: function() {
            this.$el.removeClass('hl').find('.op-icon').addClass('vh');
        },

        removeLink: function() {
            var url = Common.getUrl({
                name: this.link_type == 'download' ? 'share_link' : 'upload_link',
                token: this.model.get('token')
            });
            var _this = this;
            $.ajax({
                url: url,
                type: 'delete',
                dataType: 'json',
                beforeSend: Common.prepareCSRFToken,
                success: function() {
                    _this.remove();
                },
                error: function(xhr) {
                    var err_msg;
                    if (xhr.responseText) {
                        err_msg = $.parseJSON(response.responseText).error_msg;
                    } else {
                        err_msg = gettext('Please check the network.');
                    }
                    _this.data.$error.html(err_msg).show();
                }
            });

            return false;
        }

    });

    return View;
});
