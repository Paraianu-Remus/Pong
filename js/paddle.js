const computerSpeed = 0.02;

export default class Paddle {
    constructor (paddleElement) {
        this.paddleElement = paddleElement;
        this.reset();
    }
    get position() {
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue("--paddlePosition"));
    }
    
    set position(value) {
        this.paddleElement.style.setProperty("--paddlePosition", value);
    }

    rect() {
        return this.paddleElement.getBoundingClientRect();
    }

    // reset paddle to center
    reset() {
        this.position = 50;
    }

    gameUpdate(delta, ballHeight) {
        this.position += computerSpeed * delta * (ballHeight - this.position);
    }
}