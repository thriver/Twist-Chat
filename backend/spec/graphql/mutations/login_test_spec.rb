require 'rails_helper'
module Mutations
  RSpec.describe LoginUser, type: :request do
    def query(username:)
        <<-GRAPHQL
          mutation{
            login(input: {username: "#{username}"}){
            user {
              username
            },
            errors {
                message,
                path
              }
            }
          }
      GRAPHQL
    end
    describe ".resolve" do
      it "should not create a new record if a username exists" do
        user = User.create(username: "existing_user")
        expect do
          post '/graphql', params: {query: query(username: user.username)}
        end.to change {User.count}.by(0)
      end
      it "should create a new record if a username does not exist" do
        user = User.create(username: "existing_user")
        expect do
          post '/graphql', params: {query: query(username: "new_user")}
        end.to change {User.count}.by(1)
      end
    end

    it "returns the user name when logged in" do
      username = "new_user"
      post '/graphql', params: {query: query(username: username)}
      json = JSON.parse(response.body)
      data = json["data"]["login"]

      expect(data["user"]["username"]).to eq username
      expect(data["errors"]).to be_empty
    end

    it "returns a list of errors if there is an error on save" do
      allow_any_instance_of(User).to receive(:save) do |user|
        user.errors.add("path", "fake error")
        user.errors.add("path2", "fake error2")
        false
      end
      username = "new_user_error"
      post '/graphql', params: {query: query(username: username)}

      json = JSON.parse(response.body)
      data = json["data"]["login"]

      expect(data["user"]).to be_nil
      expect(data["errors"][0]["message"]).to eq "fake error"
      expect(data["errors"][0]["path"]).to eq %w[attributes path]
      expect(data["errors"][1]["message"]).to eq "fake error2"
      expect(data["errors"][1]["path"]).to eq %w[attributes path2]
    end
  end
end