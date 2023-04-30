import { useEffect, useState } from 'react'
import * as brain from 'brain.js'
import lol from "./model.json"

const useLittleAi = () => {
  const [net, setNet] = useState<any>(() => {
    // const config = {
    //   binaryThresh: 0.5,
    //   hiddenLayers: [20], // number of neurons in the hidden layer
    //   activation: 'sigmoid', // activation function for each neuron
    //   leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu',
    //   learningRate: 0.1, // the learning rate for the network
    // };
    // return new brain.recurrent.LSTM(config);
  })
  useEffect(() => {
    // var human_messages = [
    //   "Em son",
    //   "Em phat",
    //   "Em phong",
    //   "Em van"
    // ]
    // var bot_messages = [
    //   "Dung v",
    //   "Dung v",
    //   "Dung v",
    //   "Khong"
    // ]
    // let newNet = net.train([
    //   { input: human_messages[0], output: "0" },
    //   { input: human_messages[1], output: "1" },
    //   { input: human_messages[2], output: "2" },
    //   { input: human_messages[3], output: "3" },
    // ], { log: true, logPeriod: 100, iterations: 2000, })
    // setNet(newNet)
  }, [])

  function predict(message?: string) {
    console.log(lol)
    // return net.run(message)
  }

  return { predict }
}

export default useLittleAi