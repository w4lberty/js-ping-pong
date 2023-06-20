const canvasEl = document.querySelector("canvas"),
            canvasCtx = canvasEl.getContext("2d"),        
            gapX = 10

        const mouse = { x:0, y:0 }

        const field = {
            w: window.innerWidth,
            h: window.innerHeight,
            draw: function() {
                canvasCtx.fillStyle = "#286047"
            canvasCtx.fillRect(0, 0, this.w, this.h)
            },
        }

        const line = {
            w: 15,
            h: field.h,
            draw: function() {
                canvasCtx.fillStyle = "#ffffff"
                canvasCtx.fillRect(field.w / 2 - this.w / 2, 0, this.w, this.h)
            },
        }

        const leftPaddle = {
            x: gapX,
            y: 0,
            w: line.w,
            h: 200,
            _move: function() {
                this.y = mouse.y - this.h / 2
            },
            draw: function() {
                canvasCtx.fillStyle = "#ffffff"
                canvasCtx.fillRect(this.x, this.y, this.w, this.h)

                this._move()
            },
        }

        const rightPaddle = {
            x: field.w - line.w - gapX,
            y: 0,
            w: line.w,
            h: 200,
            _move: function() {
                this.y = ball.y - this.h / 2
            },
            draw: function() {
                canvasCtx.fillStyle = "#ffffff"
                canvasCtx.fillRect(this.x, this.y, this.w, this.h)

                this._move()
            },
        }

        const ball = {
            x: 0,
            y: 0,
            r: 20,
            speed: 5,
            directionX: 1,
            directionY: 1,
            _calcPosition: function() {
                if(this.x > field.w - this.r - rightPaddle.w - gapX) {
                    if(
                    this.y + this.r > rightPaddle.y &&
                    this.y - this.r < rightPaddle.y + rightPaddle.h
                ) {
                    this._reverseX()
                    } else {
                        score.increseHuman()
                        this._pointUp()
                    }
                }
                
                if(this.x < this.r + leftPaddle.w + gapX) {
                    if(
                        this.y + this.r > leftPaddle.y &&
                        this.y - this.r < leftPaddle.y + leftPaddle.h
                    ) {
                        this._reverseX()
                    } else {
                        score.increseComputer()
                        this._pointUp()
                    }
                }

                if(
                    (this.y - this.r < 0 && this.directionY < 0) ||
                    (this.y > field.h - this.r && this.directionY > 0)
                    ) {
                    this._reverseY()
                }
            },

            _reverseX: function() {
                this.directionX *= - 1
            },

            _reverseY: function() {
                this.directionY *= - 1
            },

            _pointUp: function() {
                this.x = field.w / 2
                this.y = field.h / 2
            },

            _move: function() {
                this.x += this.directionX * this.speed
                this.y += this.directionY * this.speed
            },

            draw: function() {
                canvasCtx.fillStyle = "#ffffff"
                canvasCtx.beginPath()
                canvasCtx.arc(this.x, this.y, this.r, 0, 2.0 * Math.PI, false)
                canvasCtx.fill()

                this._calcPosition()
                this._move()
            }
        }

        const score = {
            human: 0,
            computer: 0,
            increseHuman: function () {
                this.human++
            },
            increseComputer: function () {
                this.computer++
            },
            draw: function() {
                canvasCtx.fillStyle = "#ffffff"
                canvasCtx.font = "bold 220px Arial"
                canvasCtx.textAlign = "center"
                canvasCtx.textBaseline = "top"
                canvasCtx.fillStyle = "#013410"
                canvasCtx.fillText(this.human, field.w / 4, 50)
                canvasCtx.fillText(this.computer, field.w / 4 + window.innerWidth / 2 , 50)
            }
        }

        function setup() {
            canvasEl.width = canvasCtx.width = field.w
            canvasEl.height = canvasCtx.height = field.h
        }

        function draw() {
            field.draw()
            line.draw()

            leftPaddle.draw()
            rightPaddle.draw()

            score.draw()

            ball.draw()           
        }

        setup()
        draw()

        window.animateFrame = (function () {
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                    return window.setInterval(callback, 1000 / 60) 
                }
            )
        })()

        function main() {
            animateFrame(main)
            draw()
        }

        setup()
        main()

        canvasEl.addEventListener("mousemove", function (e) {
            mouse.x = e.pageX
            mouse.y = e.pageY
        })