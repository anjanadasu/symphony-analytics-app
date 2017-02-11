var controllerService = SYMPHONY.services.register("symphonyAnalytics:controller");
console.log("controller");

SYMPHONY.remote.hello().then(function(data) {
    console.log("remote hello");

    SYMPHONY.application.register("symphonyAnalytics", ["modules", "applications-nav"], ["symphonyAnalytics:controller"]).then(function(response) {

        console.log("application register");

        // Subscribe to Symphony's services
        var modulesService = SYMPHONY.services.subscribe("modules");
        var navService = SYMPHONY.services.subscribe("applications-nav");

        navService.add("symphonyAnalytics-nav", "Symphony Analytics", "symphonyAnalytics:controller");

        controllerService.implement({

            select: function(id) {
                if (id == "symphonyAnalytics-nav") {
                    navService.focus("symphonyAnalytics-nav"); 
                }
                
                modulesService.show("symphonyAnalytics-module", {title: "Symphony Analytics"}, "symphonyAnalytics:controller", "https://symphony-ss.domo.com/", {
                    "canFloat": true,
                });
                modulesService.focus("symphonyAnalytics-module");
            },
        });
    }.bind(this))
}.bind(this));
