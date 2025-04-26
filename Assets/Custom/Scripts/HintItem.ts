@component
export class HintItem extends BaseScriptComponent {
  @input
  private triggerName: string;

  @input
  private otherTriggers: string[];

  @input
  private letters: string[];
  @input
  private letterObjects: SceneObject[];

  @input
  private prefab: ObjectPrefab;

  @input
  private parentObject: SceneObject;

  private currentLetterIndex: number = 0;
  private isActive: boolean = false;

  onAwake() {
    this.initialize();

    // Trigger this Hint
    (global as any).behaviorSystem.addCustomTriggerResponse(
      `receive_hint_${this.triggerName}`,
      this.toggle
    );

    // When other hints are triggered
    for (let i = 0; i < this.otherTriggers.length; i++) {
      (global as any).behaviorSystem.addCustomTriggerResponse(
        `receive_hint_${this.otherTriggers[i]}`,
        this.onClose
      );
    }

    // When activated, listen for letters
    for (var i = 0; i < this.letters.length; i++) {
      (global as any).behaviorSystem.addCustomTriggerResponse(
        "receive_alpha_" + this.letters[i].toLowerCase(),
        this.checkLetter(this.letters[i])
      );
    }
  }

  checkLetter(letter: string) {
    if (this.letters[this.currentLetterIndex] === letter) {
      this.letterObjects[this.currentLetterIndex].enabled = false;
      this.currentLetterIndex++;
    }

    if (this.currentLetterIndex === this.letters.length) {
      this.onSuccess();
    }
  }

  toggle() {
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.initialize();
    } else {
      this.onClose();
    }
  }

  initialize() {
    this.isActive = true;
    this.currentLetterIndex = 0;

    for (let i = 0; i < this.letterObjects.length; i++) {
      this.letterObjects[i].enabled = true;
    }
  }

  onClose() {
    for (let i = 0; i < this.letterObjects.length; i++) {
      this.letterObjects[i].enabled = false;
    }
    this.currentLetterIndex = 0;
    this.isActive = false;
  }

  onSuccess() {
    const object = this.prefab.instantiate(this.parentObject);
    object.getTransform().setWorldPosition(new vec3(0, -10, -100));
    this.onClose();
  }
}
