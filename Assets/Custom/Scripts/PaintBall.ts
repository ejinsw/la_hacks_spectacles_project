@component
export class PaintBall extends BaseScriptComponent {
  onAwake() {
    var delayedEvent = this.createEvent("DelayedCallbackEvent");
    delayedEvent.bind(this.destroy.bind(this));

    delayedEvent.reset(2);
  }

  destroy() {
    print("DESTROYING PAINTBALL");
    this.destroy();
  }
}
