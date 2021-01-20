class QuestionChannel < ApplicationCable::Channel
  def subscribed
    stream_from "QuestionChannel#{params[:room]}"
  end

  def receive(data)
    vote = Vote.create!(answer: Answer.find(data["answer_id"].to_i))
    answer_votes = { "#{vote.answer.id}": vote.answer.votes.count }

    ActionCable.server.broadcast "QuestionChannel#{params[:room]}", answer_votes
  end
end
