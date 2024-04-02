const initialVelocity = 0.025;
const velocityIncrease = 0.00001;

export default class Ball {
    constructor (ballElement) {
        this.ballElement = ballElement;
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--x"));
    }

    set x(value) {
        this.ballElement.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--y"));
    }

    set y(value) {
        this.ballElement.style.setProperty("--y", value);
    }

    rect() {
        return this.ballElement.getBoundingClientRect();
    }

    // Resets the ball to center
    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = {
            x: 0
        }
        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { 
                x: Math.cos(heading),
                y: Math.sin(heading)
            }
        }
        this.velocity = initialVelocity;
    }

    gameUpdate(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        const rect = this.rect();
        this.velocity += velocityIncrease * delta;
        
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1;
        }

        if (paddleRects.some(r => checkCollision(r, rect))) {
            this.direction.x *= -1;
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function checkCollision(rect1, rect2) {
    return (rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top);
} 