const samples = require("./samples.json");
const { peso, ph } = require("./bias.json");
const taxaAprendizado = 0.5;
const iterationSamples = samples.map((item) => {
  return {
    peso: item.peso,
    ph: item.ph,
    expected: item.fruta === "Maçã" ? 0 : 1,
  };
});
const iterations = 10000;

let phBias = ph;
let pesoBias = peso;
let i = 0;
let index = 0;
while (i < iterations) {
  const item = iterationSamples[index];
  const combinacaoLinear = item.peso * pesoBias + item.ph * phBias;
  const lossFunc = combinacaoLinear >= 0 ? 0 : 1;
  if (lossFunc !== item.expected) {
    phBias = phBias + taxaAprendizado * (item.expected - lossFunc) * item.ph;
    pesoBias =
      pesoBias + taxaAprendizado * (item.expected - lossFunc) * item.peso;
  }
  i++;
  index++;
  if (index === iterationSamples.length) {
    index = 0;
  }
}
let output = `Resultado obtidos:
Bias de Peso:${pesoBias}
Bias de PH: ${phBias}

`

const testes = iterationSamples.map(item=>{
    const combinacaoLinear = item.peso * pesoBias + item.ph * phBias;
    const lossFunc = combinacaoLinear >= 0 ? 0 : 1;
    let resultado = 'Sim'
    if(lossFunc !== item.expected){
        resultado = 'Não'
    }
    return resultado
})

testes.forEach((teste,i)=>{
    output+= `Teste ${i+1}:${teste}
    `
})

console.log(output)


