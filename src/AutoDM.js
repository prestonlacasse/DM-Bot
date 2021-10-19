import { T } from "./Twit.js";
import { config } from "../config.js";
// import readline from 'readline';

const my_user_name = config.userName;
const timeout = 1000 * 60 * 5; // timeout to send the message 5 min

export const AutoDM = () => {
  // const stream = T.stream("user");
  // console.log("Start Sending Auto Direct Message");
  // stream.on("follow", SendMessage);
  
  // const userInput = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // })

  const userToGet = 'kawhileonard'
  let nextCursor = null
  let nextPageExists = true
  let results = []
  console.log(`GET followers/ids of: `, userToGet)

  while (nextPageExists) {
    T.get('followers/ids', { screen_name: userToGet, cursor: nextCursor}, (error,data,response) => {
      if (data) {
        console.log(`Fetching...`)
        const parsedData = JSON.parse(data)
        results.push(...parsedData.ids)
        if (data.next_cursor_str != '0') {
          nextCursor = next_cursor_str
        } 
        else {
          nextPageExists = false
        }
      }
      if (error) {
        console.log(`ERROR: `, error)
      }
    })
  }
  console.log(`End Result: `, results)
};

const SendMessage = (user) => {
  const { screen_name, name } = user.source;

  const obj = {
    screen_name,
    text: GenerateMessage(name),
  };
  // the follow stream track if I follow author person too.
  if (screen_name != my_user_name) {
    console.log(" New Follower ");
    setTimeout(() => {
      T.post("direct_messages/new", obj)
        .catch((err) => {
          console.error("error", err.stack);
        })
        .then((result) => {
          console.log(`Message sent successfully To  ${screen_name}`);
        });
    }, timeout);
  }
};
const GenerateMessage = (name) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  return `Hi ${name} sorry for the cold introduction. I am just letting you know that Javelin has come to San Francisco. Javelin is a mobile app that connects sports players with other players and leagues in their community. If this sounds like something that interest you, you can download the Javelin app for FREE! \n Have a great ${dayName}! 😊😊 `; // your message
  // My message   return `Hi ${name} sorry for the cold introduction. I am just letting you know that Javelin has come to San Francisco. Javelin is a mobile app that connects sports players with other players and leagues in their community. If this sounds like something that interest you, you can download the Javelin app for FREE! \n Have a great ${dayName}! 😊😊`;
};

