const rp = require('request-promise');

const { keep_alive } = require("./keep_alive.js");

const HTMLParser = require('node-html-parser');

const axios = require("axios");

const TelegramBot = require('node-telegram-bot-api');

const token = '5437197833:AAHeDR1s5SxNtA-a46h1a8BKQ5k5OZeOy8w';

const bot = new TelegramBot(token, {polling: true});

async function grabHax(msg) {

  let html = await rp("https://hax.co.id/create-vps/");

  const root = HTMLParser.parse(html);

  let text = "";

  let nodes;

  try{

     nodes = root.getElementById("datacenter").querySelectorAll("option");

  } catch (err) {

    return "hax.co.id: could not connect\n";

  }

  for (let i = 1; i < nodes.length; i++) {

      text+=nodes[i].text+"\n";

  }

  if (text == "") return "hax.co.id: no free seats\n";

  else return "hax.co.id: \n" + text+"\n";

}

async function grabWoiden(msg) {

  let html = await rp("https://woiden.id/create-vps/");

  const root = HTMLParser.parse(html);

  let text = "";

  let nodes;

  try{

     nodes = root.getElementById("datacenter").querySelectorAll("option");

  } catch (err) {

    return "woiden.id: could not connect\n";

  }

  for (let i = 1; i < nodes.length; i++) {

      text+=nodes[i].text+"\n";

  }

  if (text == "") return "woiden.id: no free seats\n";

  else return "woiden.id: \n" + text+"\n";

}

bot.onText(/\/hax/, async (msg, match) => {

  await bot.sendMessage(msg.chat.id, (await grabHax(msg)));

})

//wiki

bot.onText(/\/start/, async (msg, match) => {

  await bot.sendMessage(msg.chat.id, `Hello, ${msg.from.first_name}!\nIn this bot you can check free seats for woiden.id and hax.co.id sites. \nAvailable commands:\n/hax - Prints free seats for hax.co.id\n/woiden - Prints free seats for woiden.id\n/both - Prints free seats for both.\nYou can also use this bot in inline mode. Good luck and, please, do not abuse it. =)`);

})

bot.onText(/\//, async (msg, match) => {

  await bot.sendMessage(msg.chat.id, `Hello, ${msg.from.first_name}!\nThe owner still learning to add more features in this bot`);

})

bot.onText(/\/vs/, async (msg, match) => {

  await bot.sendMessage(msg.chat.id, `Verse, ${msg.from.first_name}!\n\nR O M A N S  8 : 3 7 — 3 9

No, in all these things we are more than conquerors through him who loved us.

For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers,

nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.

♡･ᴗ･♡`);

})

bot.onText(/\/id/, async (msg, match) => {

  await bot.sendMessage(msg.chat.id, `\n5245136858`);

})

bot.onText(/\/link/, async (msg, match) => {

  await bot.sendMessage(msg.chat.id, `\nhttps://HugeLightgreyWireframes.aboba123123e.repl.co`);

})

bot.onText(/\/vps/, async (msg, match) => {

  await bot.sendMessage(msg.chat.id, `\nYour Vps Information:

\n\nYour Hax VPS is \n

 2a01:4f8:13a:2690:face:0ca5:ed06:0001 \n

Pass:John123

Your Woiden Vps is

IP & Public Port

Public IPv4:	163.172.67.56 Port:	18391

Usable Port: 18342 to 18391

Pass:John123

`);

})

bot.onText(/\/woiden/, async (msg, match) => {

  await bot.sendMessage(msg.chat.id, (await grabWoiden(msg)));

})

bot.onText(/\/both/, async (msg, match) => {

  await bot.sendMessage(msg.chat.id, (await grabHax(msg))+"\n"+(await grabWoiden(msg)));

})

bot.on("inline_query", async (query) => {

  if (query.query != "") return;

  let hax = await grabHax();

  let woiden = await grabWoiden();

  await bot.answerInlineQuery(query.id, [{

    id: '0',

    type: 'article',

    title: 'Hax.co.id seats',

    description: hax,

    message_text: hax

},

{

  id: '1',

  type: 'article',

  title: 'Woiden.id seats',

  description: woiden,

  message_text: woiden

},

{

  id: '2',

  type: 'article',

  title: 'Both seats',

  description: hax+"\n"+woiden,

  message_text: hax+"\n"+woiden

}])

    });
