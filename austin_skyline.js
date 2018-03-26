var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c means context
var c = canvas.getContext('2d');

// function Tracer(color) {
//     this.color = color;
// }

window.addEventListener('resize',
    function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
);

function DrawTop() {
    this.x = 400;
    this.y = 100;
    this.dx = 1;
    this.dy = 2.5;
    this.radius = 5;
    this.radians = Math.random() * Math.PI * 2;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = 'white';
        c.fill();
    };

    this.update = function () {
        if (this.y < 100 || this.y > 150) {
            this.dy = -this.dy;
        }
        this.y += this.dy;
        this.draw();
    };
}

function DrawDome() {
    this.x = 400;
    this.y = 200;
    this.velocity = 0.07;
    this.radius = 10;
    this.radians = Math.PI * 2;
    this.distanceFromCenter = 5;
    this.yRad = Math.PI * 2;
    this.yVel = 0.07;

    this.draw = function (lastPoint) {
        c.beginPath();
        c.strokeStyle = 'white';
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    };

    this.update = function () {
        const lastPoint = {x: this.x, y: this.y};
        this.radians += this.velocity;
        this.yRad += this.yVel;

        if (Math.sin(this.yRad) > 0.99) // right quarter
        {
            // this.velocity = -this.velocity;
            this.yRad = 0;
            this.yVel = 0;
        }
        if (Math.cos(this.radians) < 0 && Math.cos(this.radians) > -0.025) // start left quarter
        {
            console.log("adfalsdf;akldjsf;aksdjfsajdfadsfafadsf");
            this.yRad = 11;
            this.yVel = 0.07;
        }


        this.x = this.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.y + Math.sin(this.yRad) * this.distanceFromCenter;
        console.log("cos: " + Math.cos(this.radians));
        console.log("sin: " + Math.sin(this.radians) + " rads: " + this.radians);


        this.draw(lastPoint);
    };
}

var topDraw = new DrawTop();
var dome = new DrawDome();

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0, 0, 0, 0.03)";
    c.fillRect(0, 0, innerWidth, innerHeight);
    topDraw.update();
    dome.update();
}

animate();