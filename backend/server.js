const http = require("http");
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
      question_text: "This is question 1 (single choice)?",
      answers: [
        { id: 1, text: "Answer 1" },
        { id: 2, text: "Answer 2" },
        { id: 3, text: "Answer 3" },
        { id: 4, text: "Answer 4" },
      ],
    },
    {
      type: "multiple-choice",
      question_id: 2,
      question_text: "This is question 2 (multiple choice)?",
      answers: [
        { id: 5, text: "Answer 1" },
        { id: 6, text: "Answer 2" },
        { id: 7, text: "Answer 3" },
        { id: 8, text: "Answer 4" },
      ],
    },
    {
      type: "scaled-choice",
      question_id: 3,
      question_text: "This is question 3 (scaled)?",
      answers: [1, 3, 5, 7, 9],
    },
    {
      type: "free-text",
      question_id: 4,
      question_text: "This is question 4 (free text)?",
    },
  ],
  [
    {
      type: "single-choice",
      question_id: 11,
      question_text: "This is question 11 (single choice)?",
      answers: [
        { id: 1, text: "Answer 11" },
        { id: 2, text: "Answer 22" },
        { id: 3, text: "Answer 33" },
        { id: 4, text: "Answer 44" },
      ],
    },
    {
      type: "multiple-choice",
      question_id: 22,
      question_text: "This is question 22 (multiple choice)?",
      answers: [
        { id: 5, text: "Answer 11" },
        { id: 6, text: "Answer 22" },
        { id: 7, text: "Answer 33" },
        { id: 8, text: "Answer 44" },
      ],
    },
    {
      type: "scaled-choice",
      question_id: 33,
      question_text: "This is question 33 (scaled)?",
      answers: [2, 4, 6, 8, 10],
    },
    {
      type: "free-text",
      question_id: 44,
      question_text: "This is question 44 (free text)?",
    },
  ],
];
