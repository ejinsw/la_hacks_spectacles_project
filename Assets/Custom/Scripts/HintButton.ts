import { PinchButton } from "../../SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton"

@component
export class HintButton extends BaseScriptComponent {
    @input
    private triggerName: string

    @input
    private pinchButton: PinchButton

    onAwake() {
        this.pinchButton.onButtonPinched.add(() => {
            print(`Pinched hint button ${this.triggerName}`);
            (global as any).behaviorSystem.sendCustomTrigger(`receive_hint_${this.triggerName}`)
        });
    }
}
