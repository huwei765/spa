define(["app", "localstorage"], function(RootApp){
  RootApp.module("Entities", function(Entities, RootApp, Backbone, Marionette, $, _){
    var findStorageKey = function(entity){
      // use a model's urlRoot value
      if(entity.urlRoot){
        return _.result(entity, "urlRoot");
      }
      // use a collection's url value
      if(entity.url){
        return _.result(entity, "url");
      }

      throw new Error("Unable to determine storage key");
    };

    var storageCache = {};
    var getStorage = function(key){
      var storage = storageCache[key];
      if(storage){
        return storage;
      }
      var newStorage = new Backbone.LocalStorage(key);
      storageCache[key] = newStorage;
      return newStorage;
    };

    var StorageMixin = function(entityPrototype){
      var storageKey = findStorageKey(entityPrototype);
      return { localStorage: getStorage(storageKey) };
    };

    Entities.configureStorage = function(constructorString, constructor){
      var OldConstructor = constructor;
      var NewConstructor = function(){
        var obj = new OldConstructor(arguments[0], arguments[1]);
        _.extend(obj, new StorageMixin(OldConstructor.prototype));
        return obj;
      };
      NewConstructor.prototype = OldConstructor.prototype;

      eval(constructorString + " = NewConstructor;");
    };
  });

  return RootApp.Entities.configureStorage;
});
