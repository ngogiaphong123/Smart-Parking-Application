// @ts-ignore
import DictionaryService from './dictionary.js';
import * as brain from 'brain.js';
import fs from 'fs';

const config = {
    binaryThresh: 0.5,
    hiddenLayers: [10], // number of neurons in the hidden layer
    activation: 'sigmoid', // activation function for each neuron
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu',
    learningRate: 0.1, // the learning rate for the network
};

let net = new brain.NeuralNetwork(config);

let data = [
    {
        "tag": "greeting",
        "inputs": [
            "Hi",
            "Hello",
            "Hey",
            "Hi there",
            "Hello there",
            "Hey there",
            "Hiya",
            "Hiya there",
        ],
        "output": { 0: 1 }
    },
    , {
        "tag": "Log out",
        "inputs": [
            "Log out please",
            "Log out now",
            "Log out",
            "Log me out",
            "Log me out please",
            "Log me out now",
            "Log me out please",
            "Log me out now",
            "Log me out",
        ],
        "output": { 1: 1 }
    },
    {
        "tag": "Log in",
        "inputs": [
            "Log in",
            "Log me in",
            "Log me in please",
            "Log me in now",
            "Log me in please",
            "Log me in now",
            "Log me in",
        ],
        "output": { 2: 1 }
    },
    {
        "tag": "Turn on fan",
        "inputs": [
            "Open fan",
            "Turn on fan",
            "Turn on the fan",
            "Open the fan",
        ],
        "output": { 3: 1 }
    },
    {
        "tag": "Turn off fan",
        "inputs": [
            "Turn off the fan",
            "Turn off fan",
            "Close fan",
            "Close the fan",
        ],
        "output": { 4: 1 }
    },
    {
        "tag": "Greeting health",
        "inputs": [
            "How are you",
            "How are you doing",
            "How is your health",
            "How is your health today",
            "How is your health doing",
        ],
        "output": { 5: 1 }
    },
    {
        "tag": "turn off AI mode",
        "inputs": [
            "Turn off AI mode",
            "Turn off AI",
            "Turn off AI please",
            "Turn off AI now",
        ],
        "output": { 6: 1 }
    },
    {
        "tag": "move to page home and parking",
        "inputs": [
            "Move to page home and parking",
            "Move to page home and parking please",
            "Move to page home and parking now",
            "I want to move to page home and parking",
            "I want to move to page home and parking please",
            "I want to move to page home and parking now",
        ],
        "output": { 7: 1 }
    },
    {
        "tag": "move to dashboard page",
        "inputs": [
            "Move to dashboard page",
            "Move to dashboard page please",
            "Move to dashboard page now",
            "I want to move to dashboard page",
            "I want to move to dashboard page please",
            "I want to move to dashboard page now",
        ],
        "output": { 8: 1 }
    },
    {
        "tag": "move to payment history page",
        "inputs": [
            "Move to payment history page",
            "Move to payment history page please",
            "Move to payment history page now",
            "I want to move to payment history page",
            "I want to move to payment history page please",
            "I want to move to payment history page now",
        ],
        "output": { 9: 1 }
    },
    {
        "tag": "move to customers page",
        "inputs": [
            "Move to customers page",
            "Move to customers page please",
            "Move to customers page now",
            "I want to move to customers page",
            "I want to move to customers page please",
            "I want to move to customers page now",
        ],
        "output": { 10: 1 }
    }
]

const bot_answer = {
    0: {
        tag: "greeting",
        answers: [
            "Hi, I am TriVan-bot. How can I help you?",
            "Hello, I am TriVan-bot. How can I help you?",
            "Hey, I am TriVan-bot. How can I help you?",
            "Hi there, I am TriVan-bot. How can I help you?",
            "Hello there, I am TriVan-bot. How can I help you?",
            "Hey there, I am TriVan-bot. How can I help you?",
            "Hiya, I am TriVan-bot. How can I help you?",
            "Hiya there, I am TriVan-bot. How can I help you?",
            "Nice to meet you, I am TriVan-bot. How can I help you?"
        ]
    },
    1: {
        tag: "Log out",
        answers: [
            "You have been logged out",
            "Ok i will log you out",
            "Ok i will log you out now",
            "Ok i will log you out immediately",
            "Ok i will help you to log out",
        ]
    },
    2: {
        tag: "Log out",
        answers: [
            "You have been logged in",
            "Ok i will log you in",
            "Ok i will log you in now",
            "Ok i will log you in immediately",
            "Ok i will help you to log in",
        ]
    },
    3: {
        tag: "Turn on fan",
        answers: [
            "Fan is on",
            "Ok i will turn on the fan",
            "Ok i will turn on the fan now",
            "Ok i will turn on the fan immediately",
            "Ok i will help you to turn on the fan",
        ]
    },
    4: {
        tag: "Turn off fan",
        answers: [
            "Fan is off",
            "Ok i will turn off the fan",
            "Ok i will turn off the fan now",
            "Ok i will turn off the fan immediately",
            "Ok i will help you to turn off the fan",
        ]
    },
    5: {
        tag: "Greeting health",
        answers: [
            "I am fine, thank you",
            "I am doing well, thank you",
        ]
    },
    6: {
        tag: "turn off AI mode",
        answers: [
            "Ok i will turn off AI mode",
            "Ok i will turn off AI mode now",
            "Ok i will turn off AI mode immediately",
            "Ok i will help you to turn off AI mode",
        ]
    },
    7: {
        tag: "move to page home and parking",
        answers: [
            "Ok i will move to page home and parking",
            "Ok i will move to page home and parking now",
            "Ok i will move to page home and parking immediately",
            "Ok i will help you to move to page home and parking",
        ]
    },
    8: {
        tag: "move to dashboard page",
        answers: [
            "Ok i will move to dashboard page",
            "Ok i will move to dashboard page now",
            "Ok i will move to dashboard page immediately",
            "Ok i will help you to move to page dashboard",
        ]
    },
    9: {
        tag: "move to payment history page",
        answers: [
            "Ok i will move to payment history page",
            "Ok i will move to payment history page now",
            "Ok i will move to payment history page immediately",
            "Ok i will help you to move to page payment history",
        ]
    },
    10: {
        tag: "move to customers page",
        answers: [
            "Ok i will move to customers page",
            "Ok i will move to customers page now",
            "Ok i will move to customers page immediately",
            "Ok i will help you to move to customers page",
        ]
    },
}

let tempArrayTags:any = []
tempArrayTags.push({
    outputIndex:-1,
    tag:"AI didn't understand"
})
Object.keys(bot_answer).forEach((key: string) => {
    tempArrayTags.push({
        outputIndex:key,
        // @ts-ignore
        tag:bot_answer[key].tag
    })
})


function trainingAI(times: number) {
    let newData: any = []
    data.forEach((smallData: any) => {
        smallData.inputs.forEach((item: any) => {
            newData.push({
                input: item,
                output: smallData.output
            })
        })
    })
    data = newData
    const dictService = new DictionaryService(data)
    for (let i = 0; i < times; i++)
        net.train(dictService.encodeTrainingSet(), { log: true, logPeriod: 100, iterations: 1000 })
    const networkState = JSON.stringify(net);
    fs.writeFile('./src/modules/ai/model.json', networkState, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function loadModel() {
    const model = (fs.readFileSync('./src/modules/ai/model.json', 'utf8'));
    net.fromJSON(JSON.parse(model));
}

const dictService = new DictionaryService(false)

function predict(input: string) {
    let encode = dictService.encode(input)
    let a:any = net.run(encode)
    // find the smallest key name in object a
    let max = -999
    let maxKey = -1
    Object.keys(a).forEach((key) => {
        if (a[key] > max && a[key]>0.5) {
            max = a[key]
            maxKey = parseInt(key)
        }
    })
    if(maxKey===-1){
        // console.log("I don't understand")
           return {outputIndex:-1, answers:["I'm sorry, I did't understand"], outputIndexActionTable:tempArrayTags}
    }
    else
    // @ts-ignore
    return {outputIndex:maxKey, answers: bot_answer[maxKey], outputIndexActionTable:tempArrayTags}
}

export { trainingAI, loadModel, predict }