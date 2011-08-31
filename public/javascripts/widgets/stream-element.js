(function() {
  var StreamElement = function() {
    var self = this;

    this.subscribe("widget/ready", function(evt, element) {
      self.postGuid = element.attr("id");

      $.extend(self, {
        commentForm: self.instantiate("CommentForm", element.find("form.new_comment")),
        commentStream: self.instantiate("CommentStream", element.find(".comment_stream")),
        embedder: self.instantiate("Embedder", element.find("div.content")),
        likes: self.instantiate("Likes", element.find("div.likes_container")),
        lightBox: self.instantiate("Lightbox", element),
        timeAgo: self.instantiate("TimeAgo", element.find(".timeago a abbr.timeago")),

        content: element.find(".content p"),
        deletePostLink: element.find("a.stream_element_delete"),
        focusCommentLink: element.find("a.focus_comment_textarea"),
        hidePostLoader: element.find("img.hide_loader"),
        hidePostUndo: element.find("a.stream_element_hide_undo"),
        postScope: element.find("span.post_scope")
      });

      // tipsy tooltips
      self.deletePostLink.tipsy({ trigger: "hover" });
      self.postScope.tipsy({ trigger: "hover" });

      // collapse long posts
      self.content.expander({
        slicePoint: 400,
        widow: 12,
        expandText: Diaspora.I18n.t("show_more"),
        userCollapse: false
      });

      self.deletePostLink.click(function(evt) {
        evt.preventDefault();

        self.deletePostLink.toggleClass("hidden");
        self.hidePostLoader.toggleClass("hidden");
      });

      self.focusCommentLink.click(function(evt) {
        evt.preventDefault();

        self.commentForm.commentInput.focus();
      });

      self.hidePostUndo.click(function(evt) {
        evt.preventDefault();

        self.hidePostLoader.toggleClass("hidden");
      });
    });
  };

  Diaspora.Widgets.StreamElement = StreamElement;
})();
