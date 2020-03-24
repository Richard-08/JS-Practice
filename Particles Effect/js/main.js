const particles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    const particlesLenght = Math.floor(window.innerWidth / 10);

    for(let i = 0; i < particlesLenght; i += 1) {
        particles.push(new Particles());
    }
}

function draw() {
    background(20, 20, 20);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    });
}

class Particles {
    constructor() {
        // Position
        this.pos = createVector(random(width), random(height));
        // Size
        this.size = 10;
        // Velocity
        this.vel = createVector(random(-2, 2), random(-2, 2));
    }

    // Update movement by adding velocity
    update() {
        this.pos.add(this.vel);
        this.edges();
    }

    // Draw single particle
    draw() {
        noStroke();
        fill('rgba(255,255,255,0.5)');
        circle(this.pos.x, this.pos.y, this.size);
    }

    // Detect edges
    edges() {
        if (this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
        }
    }

    // Connect particles
    checkParticles(particles) {
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

            if (d < 120) {
                stroke('rgba(255,255,255,0.1)');
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
        })
    }

}