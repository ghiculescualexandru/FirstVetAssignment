const http = require("http");
const qs = require("querystring");
const hostname = "127.0.0.1";
const port = 3000;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const server = http.createServer((req, res) => {
  const url = req.url;
  const idIndexInUrl = url.indexOf("/") + 1;
  const id = parseInt(url.slice(idIndexInUrl));

  // Just to simulate request loading
  sleep(2000).finally(() => {
    if (req.method === "GET") {
      if (MOCKS[id]) {
        console.log(req.url);

        const responseData = {
          questions: JSON.stringify(MOCKS[id]),
        };

        const jsonContent = JSON.stringify(responseData);
        res.end(jsonContent);
      } else {
        res.statusCode = 200;
        res.end("404...We couldn't find what you are looking for.");
      }
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", function (data) {
        body += data;
      });
      res.statusCode = 200;
      req.on("end", () => {
        console.log(JSON.stringify(qs.parse(body)));
      });
      res.end();
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Mocks for API responses
const MOCKS = [
  [
    {
      type: "single-choice",
      question_id: 1,
      question_text: "Have you met the veterinary on time?",
      answers: [
        { id: 1, text: "Yes" },
        { id: 2, text: "A little bit late" },
        { id: 3, text: "Completely late" },
      ],
    },
    {
      type: "single-choice",
      question_id: 2,
      question_text: "Have the veterinary met you on time?",
      answers: [
        { id: 5, text: "Yes" },
        { id: 6, text: "Earlier than expected" },
        { id: 7, text: "A little bit late" },
        { id: 8, text: "Completely late" },
      ],
    },
    {
      type: "multiple-choice",
      question_id: 3,
      question_text: "What were the reasons for consultation?",
      answers: [
        { id: 5, text: "My pet was having some troubles" },
        { id: 6, text: "I wanted to check on some things" },
        { id: 7, text: "I wanted some helpful recommandations" },
        { id: 8, text: "It was a routine consultation" },
      ],
    },
    {
      type: "scaled-choice",
      question_id: 4,
      question_text: "How would you rate the consultation?",
      answers: [1, 2, 3, 4, 5],
    },
    {
      type: "scaled-choice",
      question_id: 5,
      question_text: "How happy was your pet after the consultation?",
      answers: [1, 2, 3, 4, 5],
    },
    {
      type: "free-text",
      question_id: 6,
      question_text: "How did the consultation go (step by step)?",
    },
    {
      type: "date-choice",
      question_id: 7,
      question_text: "When do you propose to make another appointment?",
    },
  ],
  [
    {
      type: "single-choice",
      question_id: 1,
      question_text: "How often do you meet with the veterinary?",
      answers: [
        { id: 1, text: "Weekly" },
        { id: 2, text: "1-2 times / month" },
        { id: 3, text: "Monthly" },
        { id: 4, text: "A few times each year" },
        { id: 5, text: "Once a year" },
      ],
    },
    {
      type: "single-choice",
      question_id: 2,
      question_text: "How many veterinaries have you contacted?",
      answers: [
        { id: 5, text: "Just one" },
        { id: 6, text: "1-3" },
        { id: 7, text: "4-10" },
        { id: 8, text: "Over 10" },
      ],
    },
    {
      type: "multiple-choice",
      question_id: 3,
      question_text: "What were the reasons for consultations?",
      answers: [
        { id: 5, text: "My pet was having some troubles" },
        { id: 6, text: "I wanted to check on some things" },
        { id: 7, text: "I wanted some helpful recommandations" },
        { id: 8, text: "It was a routine consultation" },
      ],
    },
    {
      type: "scaled-choice",
      question_id: 4,
      question_text: "How happy were you with previous veterinaries?",
      answers: [1, 2, 3, 4, 5],
    },
  ],
];
