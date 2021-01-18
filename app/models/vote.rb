class Vote < ApplicationRecord
  belongs_to :answer

  after_commit do |vote|
    answerIdCount = {}
    vote.answer.question.answers.each do |answer|
      answerIdCount[answer.id] = answer.votes.count
    end
    ActionCable.server.broadcast 'question_channel', answerIdCount
  end
end
