import consumer from "./consumer"

window.addEventListener("load", subscribeIfIdPresent)

function subscribeIfIdPresent() {
    const questionId = getQuestionId()
    if (questionId == null) return;

    createSubscription(questionId);
    document.getElementById("submitButton").addEventListener("click",submitVote)
}

function submitVote() {
    questionChannel.send({answer_id: $("input[name=vote]:checked")[0].value});
}

function getQuestionId() {
    let idElemnent = document.getElementById("questionId")
    if (idElemnent == null) return null;

    return idElemnent.value;
}

let questionChannel = null;
function createSubscription(questionId) {
    questionChannel = consumer.subscriptions.create("QuestionChannel", {
        connected() {
            // Called when the subscription is ready for use on the server
            console.log("connected")
        },

        disconnected() {
            // Called when the subscription has been terminated by the server
        },

        received(data) {
            // Called when there's incoming data on the websocket for this channel
            console.log(data)
            let keys = Object.keys(data)
            keys.forEach((key) => {
                let voteCount = data[key]
                document.getElementById("answer-" + key).innerText = voteCount;
            })
        }
    });
}
