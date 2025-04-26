// @input Component.ScriptComponent instantiationManager
// @input Component.ScriptComponent pinchButton


function onAwake() {
    script.pinchButton.onButtonPinched.add(() => {
        global.onReceiveInstantiate();
    });
}

onAwake();
