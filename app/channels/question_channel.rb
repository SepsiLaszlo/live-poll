class QuestionChannel < ApplicationCable::Channel
  def subscribed
    stream_from "question_channel"
  end

  def receive(data)
    Vote.create!(answer: Answer.find(data["answer_id"].to_i))
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
