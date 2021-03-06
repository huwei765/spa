define(["app", "backbone.picky"], function(RootApp){
  RootApp.module("Entities", function(Entities, RootApp, Backbone, Marionette, $, _){
    Entities.Header = Backbone.Model.extend({
      initialize: function(){
        var selectable = new Backbone.Picky.Selectable(this);
        _.extend(this, selectable);
      }
    });

    Entities.HeaderCollection = Backbone.Collection.extend({
      model: Entities.Header,

      initialize: function(){
        var singleSelect = new Backbone.Picky.SingleSelect(this);
        _.extend(this, singleSelect);
      }
    });

    var initializeHeaders = function(){
      Entities.headers = new Entities.HeaderCollection([
        { name: "Contacts", url: "contacts", navigationTrigger: "contacts:list" },
        { name: "About", url: "about", navigationTrigger: "about:show" },
        { name: "Addr", url: "addr", navigationTrigger: "addr:list" }
      ]);
    };

    var API = {
      getHeaders: function(){
        if(Entities.headers === undefined){
          initializeHeaders();
        }
        return Entities.headers;
      }
    };

    RootApp.reqres.setHandler("header:entities", function(){
      return API.getHeaders();
    });
  });

  return RootApp.Entities.Header;
});
