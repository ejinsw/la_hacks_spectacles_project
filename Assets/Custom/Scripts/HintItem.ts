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

  @input
  private transcriptText: Text;

  private currentLetterIndex: number = 0;
  private isActive: boolean = false;

  onAwake() {
    print(`Awaking hint ${this.triggerName}`);
    this.onClose();

    // Trigger this Hint
    (global as any).behaviorSystem.addCustomTriggerResponse(
      `receive_hint_${this.triggerName}`,
      this.toggle.bind(this)
    );

    // When other hints are triggered
    for (let i = 0; i < this.otherTriggers.length; i++) {
      (global as any).behaviorSystem.addCustomTriggerResponse(
        `receive_hint_${this.otherTriggers[i]}`,
        this.onClose.bind(this)
      );
    }

    // When activated, listen for letters
    for (var i = 0; i < this.letters.length; i++) {
      (global as any).behaviorSystem.addCustomTriggerResponse(
        "receive_alpha_" + this.letters[i].toLowerCase(),
        this.checkLetter.bind(this, this.letters[i])
      );
    }
  }

  checkLetter(letter: string) {
    if (!this.isActive) return;

    if (this.letters[this.currentLetterIndex] === letter) {
      this.letterObjects[this.currentLetterIndex].enabled = false;
      this.transcriptText.text += letter;
      this.currentLetterIndex++;
    }

    if (this.currentLetterIndex === this.letters.length) {
      this.onSuccess();
    }
  }

  toggle() {
    print(`Toggling hint ${this.triggerName}`);
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.initialize();
    } else {
      this.onClose();
    }
  }

  initialize() {
    print(`Initializing hint ${this.triggerName}`);
    this.isActive = true;
    this.currentLetterIndex = 0;

    for (let i = 0; i < this.letterObjects.length; i++) {
      this.letterObjects[i].enabled = true;
    }
  }

  onClose() {
    print(`Closing hint ${this.triggerName}`);
    this.transcriptText.text = "";
    for (let i = 0; i < this.letterObjects.length; i++) {
      this.letterObjects[i].enabled = false;
    }
    this.currentLetterIndex = 0;
    this.isActive = false;
  }

  onSuccess() {
    print(`Success hint ${this.triggerName}`);
    const object = this.prefab.instantiate(this.parentObject);
    object.getTransform().setWorldPosition(new vec3(0, -10, -50));
    this.onClose();
  }
}
