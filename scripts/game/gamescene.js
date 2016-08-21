'use strict'

const util = require('../util/util')
const Vector3D = util.Vector3D
const scene = require('../logic/scene')
const Actor = require('../logic/actor')

class gamescene extends scene {
    constructor(context) {
        super(context)
        
        this.A = new Actor(this.context, 'SpriteActor', this.ProjectionViewport({X:340, Y:340}))
        this.B = new Actor(this.context, 'AnimationActor', this.ProjectionViewport({X:50,Y:80}))
        this.C = new Actor(this.context, 'TextSpriteActor', this.ProjectionViewport({X:-540, Y:-200}))
        this.bgm = this.context.resourceManager.GetAudio('Reminiscence')
    }
    BeginPlay() {
        this.A.Spawn(), this.B.Spawn(), this.C.Spawn() 
        this.C.GetComponent('textsprite').ChangeText(
            '하이요! 이게 얼마나 길게 써지는데 테스트 해보고 싶어요', 
            55, util.RGB(255,255,0), 'RixToyGray')
        
        this.bgm.play()
        // this.bgm.pos(-3,0,-0.5, this.bgm.play())
    }
    Destroy() {}
    Tick(delta) {}
    InputKey() {
        if (this.inputManager.CheckKey('a', 'ArrowLeft'))
            this.A.MoveLocation(Vector3D.C({ X: -200 }).Multifly_Float(this.DeltaTime))
        if (this.inputManager.CheckKey('s', 'ArrowDown'))
            this.A.MoveLocation(Vector3D.C({ Y: -200 }).Multifly_Float(this.DeltaTime))
        if (this.inputManager.CheckKey('d', 'ArrowRight'))
            this.A.MoveLocation(Vector3D.C({ X: 200 }).Multifly_Float(this.DeltaTime))
        if (this.inputManager.CheckKey('w', 'ArrowUp'))
            this.A.MoveLocation(Vector3D.C({ Y: 200 }).Multifly_Float(this.DeltaTime))
    }
    InputMouse() {
        console.log(this.inputManager.GetMouse.ToString())
    }
}

module.exports = gamescene