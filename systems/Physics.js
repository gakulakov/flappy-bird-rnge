import Matter from 'matter-js'
import {Constants} from "../Constants";
import {addPipesAtLocation} from "../helpers/randomBetween";
import {Platform} from "react-native";

let tick = 0
let pose = 1
let pipes = 0


const Physics = (entities, {touches, time, dispatch}) => {
    let engine = entities.physics.engine
    let world = entities.physics.world

    // Сама птица
    let bird = entities.bird.body


    let hadTouches = false;
    touches.filter(t => t.type === 'press').forEach(t => {
        if (!hadTouches) {
            if (world.gravity.y === 0.0) {
                world.gravity.y = 1.2

                addPipesAtLocation((Constants.MAX_WITH * 2) - (Constants.PIPE_WIDTH / 2), world, entities)
                addPipesAtLocation((Constants.MAX_WITH * 3) - (Constants.PIPE_WIDTH / 2), world, entities)
            }

            hadTouches = true
            Matter.Body.setVelocity(
                bird,
                {
                    x: bird.velocity.x,
                    y: Platform.OS === 'ios' ? -9 : -22
                })
        }
    })


    // Передвижение препядствий


    Matter.Engine.update(engine, time.delta)

    // Передвижение пола
    Object.keys(entities).forEach(key => {
        if (key.indexOf('pipe') === 0 && entities.hasOwnProperty(key)) {
            Matter.Body.translate(entities[key].body, {x: Platform.OS === 'ios' ? -4 : -6, y: 0})

            if (key.indexOf("Top") !== -1 && parseInt(key.replace('pipe', "")) % 2 === 0){
                if (entities[key].body.position.x <= bird.position.x && !entities[key].scored) {
                    entities[key].scored = true
                    dispatch({type: 'score'})
                }

                if (entities[key].body.position.x <= -1 * (Constants.PIPE_WIDTH / 2)) {
                    let pipeIndex = parseInt(key.replace('pipe', ''))
                    delete(entities['pipe' + (pipeIndex - 1) + 'Top'])
                    delete(entities['pipe' + (pipeIndex - 1)])
                    delete(entities['pipe' + pipeIndex + 'Top'])
                    delete(entities['pipe' + pipeIndex])

                    addPipesAtLocation((Constants.MAX_WITH * 2) - (Constants.PIPE_WIDTH / 2), world, entities)
                }
            }

        } else if (key.indexOf('floor') === 0) {
            if (entities[key].body.position.x <= -0.5 * (Constants.MAX_HEIGHT / 2)) {
                Matter.Body.setPosition(entities[key].body, {
                    x: Constants.MAX_WITH + (Constants.MAX_WITH / 2),
                    y: entities[key].body.position.y
                })
            } else {
                Matter.Body.translate(entities[key].body, {x: Platform.OS === 'ios' ? -4 : -6, y: 0})
            }
        }
    })


    // Обновление позы птицы
    tick += 1;
    if (tick % 5 === 0) {
        pose = pose + 1
        if (pose > 3) {
            pose = 1
        }
        entities.bird.pose = pose
    }

    return entities
}

export default Physics