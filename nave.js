

const main = async () => {
  
const readline = require('readline/promises');
const { stdin: input, stdout: output, stdin } = require('process');
function delay(ms) {

  return new Promise(resolve => setTimeout(resolve, ms));

}

//definição das variaveis basicas:
const g = 9.8; //gravidade
let massaNave; //massa da nave que vai ser inserida depois

let continuar;


 
const rl = readline.createInterface({ input, output }); 

//função para o empuxe ser selecionavel 
async function selecionarMotor() {
  const motores = {
    1: { nome: "Motor Pequeno", empuxo: 50000 },
    2: { nome: "Motor Médio", empuxo: 100000 },
    3: { nome: "Motor Grande", empuxo: 200000 },
    4: { nome: "Motor Enorme", empuxo: 500000 }
  };

  let motorEscolhido;

  while (!motorEscolhido) {
    const resposta = await rl.question(
      "Escolha um motor:\n" +
      "1 - Motor Pequeno (50.000 N)\n" +
      "2 - Motor Médio (100.000 N)\n" +
      "3 - Motor Grande(200.000 N)\n" +
      "4 - Motor Enorme (500.000 N)\n" +
      "Digite o número: "
    );

    motorEscolhido = motores[resposta];

    if (!motorEscolhido) {
      console.log("Opção inválida. Tente novamente.\n");
    }
  }

  console.log(`Você escolheu: ${motorEscolhido.nome} com empuxo de ${motorEscolhido.empuxo} N`);

  return motorEscolhido;
  
}

//Inserir massa
const selecionarMassa = async () => {
  while (true) {

    massaNave = await rl.question("Insira a massa da sua nave em kg (massa é diferente de peso): " );
    massaNave = Number(massaNave); //converte em um numero, so pra garantir 

    if (massaNave == 0) {

      console.log("Se a massa for 0, você não tem foguete! Tente novamente.");

    } else {
      
      return massaNave; //retorna a massa da nave  

    }
  }
}

do {
massaNave = await selecionarMassa();

const motorEscolhido = await selecionarMotor();

//calculos
let pesoNave = massaNave * g;

console.clear();
console.log("Vamos ver se voa!");
await delay(2000); 
console.clear();
console.log("Fazendo testes...");

await delay(2000); 
console.clear();
console.log("Para o foguete voar, a força do motor deve ser maior que o PESO da nave.\n" +
  "o peso é a massa da nave multiplicada pela gravidade.\n" +
  "sendo assim, o peso da nave é: " + pesoNave);

await delay(4000);
console.clear();
console.log("Preparando voo...");

await delay(3000);
console.clear();

if (motorEscolhido.empuxo > pesoNave){
    console.log("VOCE CONSEGUIU! A NAVE ESTÁ NO ESPAÇO!\n" +
      "A viagem foi um sucesso!")
} else {
  console.log("Ah que pena, a nave não conseguiu sair da terra..")
}

continuar = await rl.question("Você deseja utilizar o programa novamente? (S/N): ");

continuar = continuar.toUpperCase();


} while (continuar === 'S');

console.log("Jogo encerrado! obrigada por jogar <3\n" +
  "Feito por Sarah Porsch Milani - 3DS");
rl.close()
}

main();