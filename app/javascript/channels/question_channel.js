import consumer from "./consumer"

window.addEventListener("load", subscribeIfIdPresent )

function subscribeIfIdPresent(){
    const questionId = getQuestionId()
    if(questionId != null) createSubscription(questionId);
}

function getQuestionId(){
    let idElemnent = document.getElementById("questionId")
    if (idElemnent == null) return null;

    return idElemnent.value;
}


function createSubscription(questionId) {
    consumer.subscriptions.create("QuestionChannel", {
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
        }
    });
}
