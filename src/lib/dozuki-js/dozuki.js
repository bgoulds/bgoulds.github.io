(function (global) {
  global.Dozuki =
    function Dozuki(domain, http) {
      baseUrl = "https://" + domain + "/api/2.0/";
      this.guides = {
        get: function (guideid) {
          return http.send(
            baseUrl + "guides/" + guideid, {
              dataType: 'json',
              method: 'get'
            });
        }
      }

      this.search = {
        get: function (query) {
          return http.send(
            baseUrl + "search/" + query + "?filter=device", {
              dataType: 'json',
              method: 'get'
            });
        }
      }
    }

  global.Dozuki.http = {};
})(typeof window != 'undefined' ? window : module.exports);