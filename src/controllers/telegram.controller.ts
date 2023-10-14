import { Request, Response } from 'express';
import path from 'path';
import { Telegraf } from 'telegraf';
import { TELEGRAM_BOT_TOKEN } from '../constants';
import ApiService from '../services/api.service';
import { converse } from './robot.controller';
const { fromLocalFile } = require('telegraf');

const bot: Telegraf = new Telegraf(TELEGRAM_BOT_TOKEN);

function telegramWelcomeCommand(bot: Telegraf) {
  bot.command('start', (ctx) => {
    ctx.sendChatAction('typing');

    setTimeout(() => {
      const message = `Hello there! Welcome to the Vivified telegram bot: Your sure plug for high-quality clothing at budget-friendly prices\n\nI respond to the following commands:
/contact - Get contact information
/jackets - View available jackets
/help - Request help information
/order - Place an order
/prints - We provide jackets and t-shirts, send us your preferred write-up and where you want it to appear
/shirts - View available shirts
/sobs - View our specialized sign-out-bundle products
/testimonials - View testimonials from our happy customers\n\n
You can also interact by sending regular text. Enjoy!`;

      console.log(ctx.from);
      ctx.reply(message);
    }, 5000); // Adjust the timeout duration as needed
  });
}

function telegramGetEthereumPriceCommand(bot: Telegraf) {
  const coingeckoApiService = new ApiService('https://api.coingecko.com');

  bot.command('ethereum', (ctx) => {
    ctx.sendChatAction('typing');

    console.log(ctx.from);
    coingeckoApiService
      .get<any>('/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .then((response) => {
        console.log(response);
        const { ethereum } = response;

        if (!ethereum || ethereum === undefined) {
          bot.telegram.sendMessage(
            ctx.chat.id,
            `Unable to retrieve ethereum rate to naira at this time`,
            {},
          );
        } else {
          const { usd } = ethereum;
          const message = `Hello, today the ethereum price is ${usd} USD`;
          ctx.reply(message);
        }
      });
  });
}

function telegramHelpCommand(bot: Telegraf) {
  bot.command('help', (ctx) => {
    ctx.sendChatAction('typing');

    const message = `Need assistance? Feel free to ask questions or request help. You can also explore the available commands:\n
    /contact - Get contact information\n
    /jackets - View jackets\n
    /order - Place an order\n
    /prints - We provide the jackets and t-shirts, send us your preferred write-up and where you want it to appear\n
    /shirts - View shirts\n
    /sobs - View our specialized sign-out products\n
    /testimonials - View testimonials from our happy customers`;

    ctx.reply(message);
  });
}

function telegramChat(bot: Telegraf) {
  bot.on('text', (ctx) => {
    ctx.sendChatAction('typing');

    // Handle regular text input (NLP chatbot interaction logic here)
    const userText = ctx.message.text;

    if (userText) {
      converse(userText).then((data: string) => {
        setTimeout(function () {
          // console.log('This code will run after 2 seconds.');
          if (!data) {
            ctx.reply(
              "I'm sorry, but I don't have the information to answer that. Please try rephrasing your question or ask something else.",
            );
            return;
          }

          ctx.reply(data);
        }, 2000);
      });
    } else {
      // Handle the case where 'text' is missing in req.body
      ctx.reply(`I'm listening`);
    }
  });
}

function telegramTestimonials(bot: Telegraf) {
  const message = `Their representative came and told me how they needed a bulk quantity of polos within 24 hours (which I had an issue with due to the short deadline but I also needed the money). They were skeptical about the quality and the color of the polos.\n\nI assured them that they didn't have to worry about those issues and that the only problem was the tight deadline they gave me. They pleaded for my help to ensure it worked because they had an upcoming program. I agreed, collected the money, and proceeded with the production of the tees. Guess what!\n\nI delivered right on time. They were not only happy for meeting their schedule but also loved the quality of the fabric and how black it was. In the end, everyone was happy, and I was happy that I made them happy 😁`;

  bot.command('testimonials', (ctx) => {
    ctx.sendChatAction('typing');

    // const images = [
    //   'public/testimonials/t1.jfif',
    //   'public/testimonials/t2.jfif',
    //   'public/testimonials/t3.jfif',
    //   'public/testimonials/t4.jfif',
    //   // Add more image paths as needed
    // ];

    // for (const imagePath of images) {
    //   ctx.replyWithPhoto({ source: imagePath });
    // }

    const imageFilePath = 'public/testimonials/t3.jfif';

    // Send the image
    bot.telegram.sendPhoto(ctx.chat.id, { source: imageFilePath }).then(() => {
      // Send the text message
      bot.telegram.sendMessage(ctx.chat.id, message);
    });
  });
}

function telegramShirts(bot: Telegraf) {
  bot.command('shirts', (ctx) => {
    ctx.sendChatAction('typing');

    const message1 =
      '(ID: 001)\nThis is a classic milk T-shirt made of high-quality cotton fabric.';
    const message2 = '(ID: 002)\nA stylish white polo shirt with a comfortable fit.';
    const message3 = '(ID: 003)\nA trendy blue denim shirt for a casual look.';

    const imageFilePath1 = 'public/shirts/s1.jpg';
    const imageFilePath2 = 'public/shirts/s2.jpg';
    const imageFilePath3 = 'public/shirts/s3.jpg';

    // Send the image
    bot.telegram.sendPhoto(ctx.chat.id, { source: imageFilePath1 }).then(() => {
      // Send the text message
      bot.telegram.sendMessage(ctx.chat.id, message1).then(() => {
        // Send the image
        bot.telegram.sendPhoto(ctx.chat.id, { source: imageFilePath2 }).then(() => {
          // Send the text message
          bot.telegram.sendMessage(ctx.chat.id, message2).then(() => {
            // Send the image
            bot.telegram.sendPhoto(ctx.chat.id, { source: imageFilePath3 }).then(() => {
              // Send the text message
              bot.telegram.sendMessage(ctx.chat.id, message3).then(() => {
                bot.telegram.sendMessage(
                  ctx.chat.id,
                  `To order please use the /order command, followed by the product ID. eg: /order 001.`,
                );
              });
            });
          });
        });
      });
    });
  });
}

function telegramJackets(bot: Telegraf) {
  bot.command('jackets', (ctx) => {
    ctx.sendChatAction('typing');

    const message1 = '(ID: 101)\nStay warm in style with this black leather jacket.';
    const message2 = '(ID: 102)\nA versatile blue denim jacket to complete your casual look.';
    const message3 = '(ID: 103)\nA classic brown suede jacket for those chilly evenings.';

    const imageFilePath1 = 'public/jackets/j1.jpg';
    const imageFilePath2 = 'public/jackets/j2.jpg';
    const imageFilePath3 = 'public/jackets/j3.jpg';

    // Send the image
    bot.telegram.sendPhoto(ctx.chat.id, { source: imageFilePath1 }).then(() => {
      // Send the text message
      bot.telegram.sendMessage(ctx.chat.id, message1).then(() => {
        // Send the image
        bot.telegram.sendPhoto(ctx.chat.id, { source: imageFilePath2 }).then(() => {
          // Send the text message
          bot.telegram.sendMessage(ctx.chat.id, message2).then(() => {
            // Send the image
            bot.telegram.sendPhoto(ctx.chat.id, { source: imageFilePath3 }).then(() => {
              // Send the text message
              bot.telegram.sendMessage(ctx.chat.id, message3).then(() => {
                bot.telegram.sendMessage(
                  ctx.chat.id,
                  `To order please use the /order command, followed by the product ID. eg: /order 001.`,
                );
              });
            });
          });
        });
      });
    });
  });
}

function telegramSignOutBundles(bot: Telegraf) {
  bot.command('sobs', (ctx) => {
    ctx.sendChatAction('typing');

    const message1 = `(ID: 201)\nOur Sign-Out Bundle 1 includes a comfy shirt, stylish jacket, and a personalized tote bag - everything you need for a complete look!`;
    const message2 = `(ID: 202)\nWith Sign-Out Bundle 2, you'll get a trendy hoodie, a pair of comfortable pants, and a cap, making it perfect for your casual style.`;
    const message3 = `(ID: 203)\nExperience the best of Vivified with Sign-Out Bundle 3, which offers a premium polo shirt, a sleek jacket, and a customized coffee mug.`;

    const imageFilePath1 = 'public/sob/so1.jpg';
    const imageFilePath2 = 'public/sob/so2.jpg';
    const imageFilePath3 = 'public/sob/so3.jpg';

    // Send the image
    bot.telegram.sendPhoto(ctx.chat.id, { source: imageFilePath1 }).then(() => {
      // Send the text message
      bot.telegram.sendMessage(ctx.chat.id, message1).then(() => {
        // Send the image
        bot.telegram.sendPhoto(ctx.chat.id, { source: imageFilePath2 }).then(() => {
          // Send the text message
          bot.telegram.sendMessage(ctx.chat.id, message2).then(() => {
            // Send the image
            bot.telegram.sendPhoto(ctx.chat.id, { source: imageFilePath3 }).then(() => {
              // Send the text message
              bot.telegram.sendMessage(ctx.chat.id, message3).then(() => {
                bot.telegram.sendMessage(
                  ctx.chat.id,
                  `To order please use the /order command, followed by the product ID. eg: /order 001.`,
                );
              });
            });
          });
        });
      });
    });
  });
}

function telegramPrints(bot: Telegraf) {
  bot.command('prints', (ctx) => {
    ctx.sendChatAction('typing');

    const message1 = 'Service is currently unavailable. Please try again later.';

    // Send the text message
    ctx.reply(message1);
  });
}

function telegramContact(bot: Telegraf) {
  bot.command('contact', (ctx) => {
    ctx.sendChatAction('typing');

    const message1 = 'To contact Vivified, use the phone numbers 08062223221 or 08031152342.';

    // Send the text message
    ctx.reply(message1);
  });
}

function telegramOrders(bot: Telegraf) {
  bot.command('order', (ctx) => {
    ctx.sendChatAction('typing');

    const productId = ctx.message.text.split(' ')[1]; // Extract the product ID from the user's message

    if (!productId || productId === undefined) {
      ctx.reply('Please enter a product ID. e.g: /order 001');
      return;
    }

    // Check if the product is out of stock
    if (true) {
      bot.telegram.sendMessage(
        ctx.chat.id,
        `I'm sorry, the product with ID ${productId} is currently out of stock. You can use the /contact command to be notified when it becomes available.`,
      );
    } else {
      // Handle the order process for the available product
      bot.telegram.sendMessage(
        ctx.chat.id,
        `You've selected product with ID ${productId} for ordering. Please follow the steps to complete your order.`,
      );
      // Add your order handling logic here for available products
    }
  });
}

// function handleProductRequest(productId: string) {
//   const products = {
//     s1: { name: 'Product 1', image: 's1.jfif' },
//     s2: { name: 'Product 2', image: 's2.jfif' },
//     s3: { name: 'Product 3', image: 's3.jfif' },
//     // Add more products as needed
//   };

//   if (products[productId]) {
//     const product = products[productId];
//     const phoneNumber = '08063313480'; // Replace with your actual contact number

//     // Display the product image
//     const imageFilePath = `public/shirts/${product.image}`;
//     bot.telegram.sendPhoto(ctx.chat.id, { source: imageFilePath }).then(() => {
//       // Provide instructions to contact a phone number
//       bot.telegram.sendMessage(ctx.chat.id, `To request ${product.name}, please contact us at ${phoneNumber}.`);
//     });
//   } else {
//     // Handle the case when the product ID doesn't exist
//     bot.telegram.sendMessage(ctx.chat.id, 'Sorry, the requested product does not exist.');
//   }
// }

class Controller {
  async default(req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '/index.html'));
  }

  async startBot() {
    console.log('Vivified bot started!');

    telegramWelcomeCommand(bot);
    // telegramGetEthereumPriceCommand(bot);
    telegramHelpCommand(bot);
    telegramTestimonials(bot);
    telegramShirts(bot);
    telegramJackets(bot);
    telegramSignOutBundles(bot);
    telegramPrints(bot);
    telegramOrders(bot);

    telegramChat(bot);

    bot.launch();
  }
}

export const telegramController = new Controller();
