import { PinchButton } from "../../SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton";

@component
export class CarScript extends BaseScriptComponent {
    @input
    private speed: number

    @input
    private carPhysics: BodyComponent;

    @input
    private forwardButton: PinchButton

    @input
    private backButton: PinchButton

    @input
    private leftButton: PinchButton

    @input
    private rightButton: PinchButton

    onAwake() {
        print("AWAKENING CAR")
        this.forwardButton.onButtonPinched.add(() => {
            this.moveForward()
        });
        this.backButton.onButtonPinched.add(() => {
            this.moveBackward()
        });
        this.leftButton.onButtonPinched.add(() => {
            this.moveLeft()
        })
        this.rightButton.onButtonPinched.add(() => {
            this.moveRight()
        })
    }

    moveForward() {
        print("MOVING FORWARD")
        const forceDirection = this.carPhysics.getTransform().forward
        this.carPhysics.addForce(forceDirection.uniformScale(1000 * this.speed), Physics.ForceMode.Force);
    }

    moveBackward() {
        print("MOVING NOT FORWARD")
        const forceDirection = this.carPhysics.getTransform().forward
        this.carPhysics.addForce(forceDirection.uniformScale(-1000 * this.speed), Physics.ForceMode.Force);
    }

    moveLeft() {
        print("ROTATING LEFT");
        this.carPhysics.addTorque(new vec3(0, 100 * this.speed, 0), Physics.ForceMode.Impulse);
    }

    moveRight() {
        print("ROTATING RIGHT");
        this.carPhysics.addTorque(new vec3(0, -100 * this.speed, 0), Physics.ForceMode.Impulse);
    }
}