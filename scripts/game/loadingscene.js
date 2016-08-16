'use strict'

const scene = require('../logic/scene');
const gamescene = require('./gamescene');
const textSprite = require('../logic/textSprite')

class loadingscene extends scene {
    constructor(logic) {
        super(logic);
        this.resourceManager = logic.resourceManager
    }
    BeginPlay() {
        this.resourceManager.AddImage(this.logic.gl, 'test')
        this.resourceManager.AddImage(this.logic.gl, 'test2')
        this.resourceManager.AddAllFont()
        this.logic.gameStatus = this.GameStatus.ResourceLoading
        this.textSprite = new (textSprite(this.logic.canvas, this.logic.gl))(this.logic, '', 30, this.logic.util.RGB(255,255,255), 'Arial')
        this.rock = false
    }
    Destroy() {}
    Render(delta) {
        this.textSprite.Render()
    }
    Update(delta) {
        this.textSprite.ChangeText(this.resourceManager.GetStatus())
        if(!this.rock && this.resourceManager.IsLoaded) {
            this.rock = true
            this.timer = this.logic.timerManager.AddTimer(500)
            this.timer.SetTimerFunc(()=>{
                this.logic.ChangeScene(this, new gamescene(this.logic));
                this.logic.gameStatus = this.GameStatus.ResourceLoaded
            })
        }
    }
}

module.exports = loadingscene;