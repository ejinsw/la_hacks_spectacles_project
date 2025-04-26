import { Interactable } from 'SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable';
import { InteractorEvent } from 'SpectaclesInteractionKit/Core/Interactor/InteractorEvent';
@component
export class PrefabItem extends BaseScriptComponent {
    onAwake() {
        this.createEvent('OnStartEvent').bind(() => {
            this.onStart();
        });
    }
    
    onStart() {
        // This script assumes that an Interactable (and Collider) component have already been instantiated on the SceneObject.
        let interactable = this.sceneObject.getComponent(
          Interactable.getTypeName()
        );
    
        // Define the desired callback logic for the relevant Interactable event.
        let onTriggerStartCallback = (event: InteractorEvent) => {
          print(
            `The Interactable has been triggered by an Interactor with input type: ${event.interactor.inputType} at position: ${event.interactor.targetHitInfo.hit.position}`
          );
          const physicsBody = this.sceneObject.getComponent("Physics.BodyComponent");
          physicsBody.mass = 1;
                
        };
    
        interactable.onInteractorTriggerStart(onTriggerStartCallback);
    }

}
