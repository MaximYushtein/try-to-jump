const canvas = document.getElementById("picasso")
const ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 600
let platforms = []
let maxaldo2014
// Объект для обработки клавиш (влево, вправо и прыжок)
let keys = {
    left: false,
    right: false,
    jump: false
};
// Переменная показывает время последнего создания платформы
let lastTime = 0
// Переменная показывает, как часто создаются новые платформы
let interval = 1000
// Класс для создания будущих объектов платформ.Конструктор принимает все данные для создания новой платформы.У платформы два метода - move, draw
class Platform {
    constructor(x, y, width, height, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    move() {
        this.x -= this.speedX;
        this.y += this.speedY;
    }

    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Функция для создания новой платформ
function createPlatform() {
    let width = Math.random() * 75 + 25
    const platform = new Platform(canvas.width - 75, 0, width, 25, 1, 1)
    platforms.push(platform)
}

// Вызов функции
createPlatform()










class Hero {

    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.onPlatform = false;
        this.speedX = 5
        this.speedY = 0
        this.gravity = 0.5
        this.jumpPower = 10
        this.isJumping = false
        this.isOnGround = false

    }
    draw() {
        ctx.fillStyle = ("orange")
        ctx.fillRect(this.x, this.y, this.width, this.height)

    }
    // Метод для движения игрока влево и вправо
    move() {

        if (keys.left) {
            this.x -= this.speedX
        }
        if (keys.right) {
            this.x += this.speedX
        }
        // Если герой стоит на платформе
        if (this.isOnGround) {
            this.speedY = 0
        }
        else {

            //  Если игрок падает, то его скорость падения постоянно растет
            this.speedY += this.gravity
        }
        this.y = this.y + this.speedY

    }

    jump() {
        if (this.isOnGround) {
            this.speedY -= this.jumpPower
            this.isOnGround = false
        }
    }

    checkCollision() {
        this.isOnGround = false
        // Программа берет каждую платформу и проверяет, касается ли её герой
        platforms.forEach(platform => {
            if (this.x < platform.x + platform.width &&
                this.x + this.width > platform.x &&
                this.y + this.height <= platform.y + platform.height &&
                this.y + this.height + this.speedY >= platform.y) {

                if (this.speedY >= 0) {
                    this.y = platform.y - this.height;
                    this.isOnGround = true;
                    this.isJumping = false;
                }
            }
        });

    }
}


// draw()
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        keys.left = true;
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
        keys.right = true;
    }
    if (event.key === ' ' || event.key === 'ArrowUp') {
        keys.jump = true;
    }
});
document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        keys.left = false;
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
        keys.right = false;
    }
    if (event.key === ' ' || event.key === 'ArrowUp') {
        keys.jump = false;
    }
});
setTimeout(function () {
    maxaldo2014 = new Hero(770, -11, 50, 50)
}, 2000)

// Функция, которая вызывает сама себя постоянно и очень часто
// Она обновляет состояние игры
function update(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (maxaldo2014) {
        maxaldo2014.draw()
        maxaldo2014.move()
        maxaldo2014.checkCollision()
    }
    if (keys.jump){
       maxaldo2014.jump() 
    }
    platforms.forEach(platform => {
        platform.move();
        platform.draw();
    });
    // Условие показывает, нужно ли создавать новую платформу
    if (time - lastTime > interval) {
        createPlatform()
        lastTime = time
        interval=Math.random()*3000
    }
    // Функция для добавления общей анимации на сайте
    requestAnimationFrame(update);

}
update(0)

 