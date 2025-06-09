const venom = require('venom-bot');
const { getGPTResponse } = require('./app');

venom
  .create({
    session: 'desastre-bot',
    headless: true,
    browserArgs: ['--headless=new', '--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe'
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    if (message.body && message.isGroupMsg === false) {
      await client.sendText(message.from, "⏳ Processando sua solicitação...");
      try {
        const resposta = await getGPTResponse(message.body);
        await client.sendText(message.from, resposta);
      } catch (err) {
        await client.sendText(message.from, "⚠️ Ocorreu um erro ao processar sua pergunta. Tente novamente mais tarde.");
        console.error(err);
      }
    }
  });
}
