class QuestionChannel < ApplicationCable::Channel
  def subscribed
    stream_from "question_channel#{params[:room]}"
  end

  def receive(data)
    vote = Vote.create!(answer: Answer.find(data["answer_id"].to_i))

    answer_votes = { "#{vote.answer.id}": vote.answer.votes.count }
    ActionCable.server.broadcast "question_channel#{params[:room]}", answer_votes
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
