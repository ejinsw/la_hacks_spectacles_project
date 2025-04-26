// @input Component.ScriptComponent transcriptManager
// @input string[] objectNames
// @input Asset.ObjectPrefab[] objectList
// @input SceneObject parentObject

function onReceiveInstantiate() {
    print("Instantiate");
    const text = global.transcriptManager.getCurrentText();
    
    // Find matching object name
    for (var i = 0; i < script.objectNames.length; i++) {
        if (text.toLowerCase() === script.objectNames[i].toLowerCase()) {
            var entry = script.objectList[i];
            const instanceObject = entry.instantiate(script.parentObject);
            instanceObject.getTransform().setWorldPosition(new vec3(0, -10, -40));
        }
    }

    global.transcriptManager.clearText();
}

global.onReceiveInstantiate = onReceiveInstantiate;

function awake() {
    // global.behaviorSystem.addCustomTriggerResponse("receive_instantiate", onReceiveInstantiate);
}

awake();