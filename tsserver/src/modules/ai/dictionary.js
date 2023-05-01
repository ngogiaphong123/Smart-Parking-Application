const dictionaryJSON = require('./dictionary.json')
class DictionaryService {

    constructor(data){
        this.data = data
        if(data)
        this.dictionary = this.buildWordDictionary(data)
        else
        this.dictionary = dictionaryJSON
    }

    // build dictionary of recognized words, based on the phrases inside the data file

    buildWordDictionary (trainingData) {
        const tokenisedArray = trainingData.map(item => {
          const tokens = item.input.split(' ')
          return tokens
        })
        
        const flattenedArray = [].concat.apply([], tokenisedArray)
        return flattenedArray.filter((item, pos, self) => self.indexOf(item) == pos)
    }

    // encode strings to numbers

    encode (phrase) {
        const phraseTokens = phrase.split(' ')
        const encodedPhrase = this.dictionary.map(word => phraseTokens.includes(word) ? 1 : 0)
    
        return encodedPhrase
    }

    // encode dataset for training

    encodeTrainingSet(){
        return this.data.map(dataSet => {
            const encodedValue = this.encode(dataSet.input)
            return {input: encodedValue, output: dataSet.output}
        })
    }
}

module.exports = DictionaryService