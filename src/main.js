import {Adaption} from "./Adaption.js";

Hooks.on("beavers-system-interface.init", async function(){
    beaversSystemInterface.register(new Adaption());
});

Hooks.on("beavers-system-interface.ready", async function(){
    import("./AbilityTest.js")
});