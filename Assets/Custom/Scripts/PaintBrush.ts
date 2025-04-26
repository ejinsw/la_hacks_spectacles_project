import { Interactable } from 'SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable';
import { InteractorEvent } from 'SpectaclesInteractionKit/Core/Interactor/InteractorEvent';
@component
export class PrefabItem extends BaseScriptComponent {

    @input("Asset.ObjectPrefab") paintPrefab: ObjectPrefab;
    @input("SceneObject") parentObject: SceneObject;

    private isPainting: boolean = false;
    private pastPosition: vec3 = new vec3(0, 0, 0);
    private currentPosition: vec3 = new vec3(0, 0, 0);

    onAwake() {
        this.createEvent('OnStartEvent').bind(() => {
            this.onStart();
        });

        this.createEvent('UpdateEvent').bind(() => {
            this.update();
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
          this.isPainting = true;
        };

        let onTriggerEndCallback = (event: InteractorEvent) => {
            print(
              `The Interactable has been triggered by an Interactor with input type: ${event.interactor.inputType} at position: ${event.interactor.targetHitInfo.hit.position}`
            );
            this.isPainting = false;
          };
    
        interactable.onInteractorTriggerStart(onTriggerStartCallback);
        interactable.onInteractorTriggerEnd(onTriggerEndCallback);
    }

    update() {
      if (this.isPainting) {
        this.currentPosition = this.sceneObject.getTransform().getWorldPosition();
        if (this.pastPosition.distance(this.currentPosition) > 0.5) {
          this.pastPosition = this.currentPosition;
          const instance = this.paintPrefab.instantiate(this.parentObject);
          instance.getTransform().setWorldPosition(this.currentPosition);
        }
      }
    }
}
