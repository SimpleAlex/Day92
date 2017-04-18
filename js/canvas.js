(function(main) {
  main(window, window.document)
})(function(window, document) {

  var c = document.getElementById("c"),
      ctx = c.getContext("2d"),
      WIDTH = c.width = window.innerWidth,
      HEIGHT = c.height = window.innerHeight;

  var particles = [],
      particle = null,
      particleCount = 100,
      radius = 0;

  var Vector = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  };

  Vector.prototype = {
    constructor: Vector,
    add: function(v) {
      this.x += v.x;
      this.y += v.y;
    },
    sub: function(v) {
      this.x -= v.x;
      this.y -= v.y;
    },
    mul: function(v) {
      this.x *= v.x;
      this.y *= v.y;
    }
  };

  var Particle = function(position, velocity, radius) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.baseRadius = radius;
    this.angle = Math.random() * 360;
  };

  Particle.prototype = {
    constructor: Particle,
    update: function() {
      this.radius = this.baseRadius + Math.sin(this.angle * Math.PI / 180) * (this.radius * 0.5);
      this.angle += 10;

      this.position.add(this.velocity);
      if(this.position.x > WIDTH) {
        this.radius = Math.random() * 10;
        this.velocity.x = Math.random() * 10;
        this.position.x = -this.radius;
      }
    },
    render: function(ctx) {
      ctx.beginPath()
      ctx.fillStyle = "white";
      ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  for(var i = 0; i < particleCount; i++) {
    radius = Math.random() * 10;
    particle = new Particle(
      new Vector(-radius, Math.random() * HEIGHT),
      new Vector(Math.random() * 10, 0),
      radius
    );
    particles.push(particle);
  }

  requestAnimationFrame(function loop() {
    requestAnimationFrame(loop);

    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for(var i = 0, len = particles.length; i < len; i++) {
      particle = particles[i];
      particle.update();
      particle.render(ctx);
    }
  });
});
