import Autolinker from "autolinker";

export default {

  breakNewLine: function(str) {
    return str.replace(/(\r|\n)/g, '<br>');
  },

  autoLink: function(str) {
    return Autolinker.link(str, {
      newWindow: true,
      className: "auto-link",
      twitter: false,
      hashtag: false
    });
  }

}