//@input SceneObject transcriptText
//@input Component.ObjectTracking3D hand

// Create a global namespace for our script
if (!global.transcriptManager) {
    global.transcriptManager = {};
}

global.transcriptManager.getCurrentText = function() {
    return script.transcriptText.getComponent("Component.Text").text;
};

global.transcriptManager.appendText = function(text) {
    script.transcriptText.getComponent("Component.Text").text += text;
};

global.transcriptManager.clearText = function() {
    script.transcriptText.getComponent("Component.Text").text = "";
};

global.transcriptManager.setTranscriptText = function(text) {
    script.transcriptText.getComponent("Component.Text").text = text;
};

global.transcriptManager.deleteLastCharacter = function() {
    script.transcriptText.getComponent("Component.Text").text = script.transcriptText.getComponent("Component.Text").text.slice(0, -1);
};

function onReceiveAlpha(letter) {
//        let objectSpecificData = script.hand.objectSpecificData["global"];
//    print(objectSpecificData)

    print("Received letter: " + letter);
    if (script.transcriptText && script.transcriptText.getComponent("Component.Text")) {
        script.transcriptText.getComponent("Component.Text").text += letter;
        // Update the global variable
        global.transcriptManager.text = script.transcriptText.getComponent("Component.Text").text;
    }
}

function awake() {
    
    let objectSpecificData = script.hand.objectSpecificData;

    print(objectSpecificData)
    
    script.transcriptText.getComponent("Component.Text").text = "";

    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < alphabet.length; i++) {
        (function (letter) {
            global.behaviorSystem.addCustomTriggerResponse("receive_alpha_" + letter.toLowerCase(), function () {
                onReceiveAlpha(letter);
            });
        })(alphabet[i]);
    }
}

awake();

