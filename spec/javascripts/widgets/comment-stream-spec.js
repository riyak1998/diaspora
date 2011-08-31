describe("Diaspora.Widgets.CommentStream", function() {
  var commentStream;
  beforeEach(function() {
    jasmine.Clock.useMock();
    spec.loadFixture("aspects_index_with_posts");
    Diaspora.I18n.locale = { };

    var post = $(".stream_element:first"),
      postGUID = post.attr("id");

    commentStream = Diaspora.BaseWidget.instantiate("CommentStream", $(".stream_element:first .comment_stream"));
  });

  describe("hideComments", function() {

  });

  describe("toggling comments", function() {
    it("toggles class hidden on the comments ul", function () {

      expect($("ul.comments:first")).not.toHaveClass("hidden");

      commentStream.hideComments($.Event());

      jasmine.Clock.tick(200);

      expect($("ul.comments:first")).toHaveClass("hidden");

      commentStream.showComments($.Event());

      jasmine.Clock.tick(200);

      expect($("ul.comments:first")).not.toHaveClass("hidden");
    });

    it("changes the text on the show comments link", function() {
      Diaspora.I18n.loadLocale({'comments' : {
        'show': 'show comments translation',
        'hide': 'hide comments translation'
      }}, 'en');

      var link = $("a.toggle_post_comments:first");

      commentStream.showComments($.Event());

      jasmine.Clock.tick(200);

      expect(link.text()).toEqual("hide comments translation");

      commentStream.hideComments($.Event());

      jasmine.Clock.tick(200);

      expect(link.text()).toEqual("show comments translation");
    });
  });
});