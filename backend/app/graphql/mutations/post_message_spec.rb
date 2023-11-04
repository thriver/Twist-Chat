require 'rails_helper'
module Mutations
  RSpec.describe PostMessage, type: :request do
    def query(username:, chatroom:, content:)
        <<-GRAPHQL
          mutation{
            postMessage(input: {
              username: "#{username}",
              chatroom: #{chatroom},
              content: "#{content}"
            }){
            errors {
                message,
                path
              }
            }
          }
      GRAPHQL
    end
    describe ".resolve" do
      it "should add a new message if chatroom and user exist" do
        user = User.create(username: "existing_user")
        chatroom = Chatroom.create(user: user, name: "default_chat")
        content = "message"
        expect do
          post '/graphql', params: {query: query(username: user.username, chatroom: chatroom.id, content: content)}
        end.to change {UserMessage.count}.by(1)
        expect(UserMessage.where(:user_id => user.id)
                          .where(:chatroom_id => chatroom.id).where(:content => content).count).to be(1)
      end

      it "should return no errors on success" do
        user = User.create(username: "existing_user")
        chatroom = Chatroom.create(user: user, name: "default_chat")
        content = "message"
        expect do
          post '/graphql', params: {query: query(username: user.username, chatroom: chatroom.id, content: content)}
        end.to change {UserMessage.count}.by(1)
        json = JSON.parse(response.body)
        expect(json["data"]["postMessage"]).to be_nil
      end

      it "should throw an error if user does not exist" do
        random_username = "abcdefg"
        user = User.create(username: "existing_user")
        chatroom = Chatroom.create(user: user, name: "default_chat")
        content = "message"
        expect do
          post '/graphql', params: {query: query(username: random_username, chatroom: chatroom.id, content: content)}
        end.to change {UserMessage.count}.by(0)
        json = JSON.parse(response.body)
        print(json["data"])
        expect(json["data"]["postMessage"]["errors"]).to eq [
                                                              {
                                                                "message"=>"User, #{random_username} does not exist",
                                                               "path"=> %w[attributes ArgumentError]
                                                              }
                                                            ]
      end

      it "should throw an error if chatroom does not exist" do
        user = User.create(username: "existing_user")
        content = "message"
        chatroom_id = 21
        expect do
          post '/graphql', params: {query: query(username: user.username, chatroom: chatroom_id, content: content)}
        end.to change {UserMessage.count}.by(0)
        json = JSON.parse(response.body)
        expect(json["data"]["postMessage"]["errors"]).to eq [
                                                              {
                                                                "message"=>
                                                                  "Chatroom with id, #{chatroom_id} does not exist",
                                                                "path"=> %w[attributes ArgumentError]
                                                              }
                                                            ]
      end

      it "returns a list of errors if there is an error on save" do
        allow_any_instance_of(UserMessage).to receive(:save) do |message|
          message.errors.add("path", "fake error")
          message.errors.add("path2", "fake error2")
          false
        end
        user = User.create(username: "existing_user")
        chatroom = Chatroom.create(user: user, name: "default_chat")
        content = "we are going to get an error"

        post '/graphql', params: {query: query(username: user.username, chatroom: chatroom.id, content: content)}

        json = JSON.parse(response.body)
        data = json["data"]["postMessage"]

        expect(data["errors"][0]["message"]).to eq "fake error"
        expect(data["errors"][0]["path"]).to eq %w[attributes path]
        expect(data["errors"][1]["message"]).to eq "fake error2"
        expect(data["errors"][1]["path"]).to eq %w[attributes path2]
      end
    end
  end
end