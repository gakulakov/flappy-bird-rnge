import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, StatusBar, AppRegistry, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {Constants} from "./Constants";
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js'
import {Bird} from "./components/Bird";
import Physics from "./systems/Physics";
import {Floor} from "./components/Floor";
import {generatePipes} from "./helpers/randomBetween";
import {Images} from "./systems/Images";
import message from './assets/sprites/message.png'
import gameOver from './assets/sprites/gameover.png'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.gameEngine = null
        this.entities = this.setupWorld();

        this.state = {
            running: true,
            score: 0,
            fontLoaded: false,
            init: true
        }
    }


    setupWorld = () => {
        let engine = Matter.Engine.create({enableSleeping: false})
        let world = engine.world
        world.gravity.y = 0.0
        // Параметры spawn-а

        // TODO: Matter.Bodies.rectangle(горизонт(x), вертикаль(y), хитбокс(x), хитбокс(y))

        let bird = Matter.Bodies.rectangle(Constants.MAX_WITH / 4, Constants.MAX_HEIGHT / 2, Constants.BIRD_WIDTH, Constants.BIRD_HEIGHT)
        // bird.resolution = 20

        let floor1 = Matter.Bodies.rectangle(
            Constants.MAX_WITH / 2,
            Constants.MAX_HEIGHT - 25,
            Constants.MAX_WITH + 4,
            50,
            {isStatic: true}
        )

        let floor2 = Matter.Bodies.rectangle(
            Constants.MAX_WITH + (Constants.MAX_WITH / 2),
            Constants.MAX_HEIGHT - 25,
            Constants.MAX_WITH + 4,
            50,
            {isStatic: true}
        )


        // Добавление элементов в игру

        Matter.World.add(world, [bird, floor1, floor2]);

        Matter.Events.on(engine, 'collisionStart', event => {
            let pairs = event.pairs

            this.gameEngine.dispatch({type: 'game-over'});

        })

        //---------------------

        return {
            physics: {engine: engine, world: world},
            bird: {body: bird, pose: 1, color: 'red', renderer: Bird},
            floor1: {body: floor1, renderer: Floor},
            floor2: {body: floor2, renderer: Floor},
        }
    }

    onEvent = e => {
        if (e.type === 'game-over') {
            this.setState({
                running: false
            })
        } else if (e.type === 'score') {
            this.setState({
                score: this.state.score + 1
            })
        }
    }

    reset = () => {
        this.gameEngine.swap(this.setupWorld())
        this.setState({
            running: true,
            score: 0
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={Images.backgroundDay} style={styles.backgroundImage} resizeMode={'stretch'}/>
                <GameEngine
                    ref={ref => {
                        this.gameEngine = ref
                    }}
                    style={styles.gameContainer}
                    entities={this.entities}
                    systems={[Physics]}
                    onEvent={this.onEvent}
                    running={this.state.running}
                >
                    <StatusBar hidden={true}/>
                </GameEngine>


                { this.state.init ? <TouchableOpacity style={styles.message} onPress={() => this.setState({init: false})}>
                    <Image source={message} style={{width: '100%', height: '100%' }}  resizeMode={'stretch'}/>
                </TouchableOpacity> : null }

                <Text style={{...styles.score}}>{this.state.score}</Text>
                {
                    !this.state.running && <View style={styles.fullScreen}>
                        <View style={styles.backDrop}/>
                        <Image source={gameOver}/>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={this.reset} style={styles.btnRestart}>
                                <Icon name={'play'} color={'#FF69B4'} size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnRestart}>
                                <Icon name={'cog'} color={'#FF69B4'} size={25}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>

        );
    }

}

const styles = StyleSheet.create({
        backgroundImage: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: Constants.MAX_WITH,
            height: Constants.MAX_HEIGHT
        },
        btnRestart: {
            padding: 14,
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 40,
            backgroundColor: '#fff',
            borderRadius: 30
        },
        btnContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',

        },
        container: {
            flex: 1,
            backgroundColor: "#FFF"
        },
        gameContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        message: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            padding: 40
        },
        fullScreen: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            // backgroundColor: 'black',
            // opacity: 0.8,
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        backDrop: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'black',
            opacity: 0.5,
        },
        gameOverText: {
            color: '#fff',
            fontWeight: 'bold',
            textShadowColor: '#444444',
            textShadowOffset: {width: 2, height: 2},
            textShadowRadius: 12,
            fontSize: 24
        },
        score: {
            position: 'absolute',
            color: '#fff',
            fontSize: 72,
            top: 50,
            left: Constants.MAX_WITH / 2 - 20,
            textShadowColor: '#444444',
            textShadowOffset: {width: 2, height: 2},
            textShadowRadius: 2,
            // fontFamily: '04b_30__'
        },
        fullScreenBtn: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        }
    }
);

