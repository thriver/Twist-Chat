# frozen_string_literal: true

require 'rails_helper'
module Mutations
  RSpec.describe CreateChatroom, type: :request do
    def query(username:, name:, prompt:)
      <<-GRAPHQL
          mutation{
            createChatroom(input: {
              username: "#{username}",
              prompt: "#{prompt}",
              name: "#{name}"
            }){
            errors {
                message,
                path
              }
            }
          }
      GRAPHQL
    end
    describe '.resolve' do
      it 'should add a new chatroom if the chatroom does not already exist' do
        user = User.create(username: 'existing_user')
        name = 'name'
        twist = 'twist'
        expect do
          post '/graphql', params: { query: query(username: user.username, name:, prompt: twist) }
        end.to change { Chatroom.count }.by(1)
        expect(Chatroom.where(user_id: user.id)
                          .where(name:).where(prompt: twist).count).to be(1)
      end

      it 'should return the ID of the new chatroom' do
        user = User.create(username: 'existing_user')
        name = 'name'
        twist = 'twist'
        expect do
          post '/graphql', params: { query: query(username: user.username, name:, prompt: twist) }
        end.to change { Chatroom.count }.by(1)
        expect(Chatroom.where(user_id: user.id)
                       .where(name:).where(prompt: twist).count).to be(1)
      end

      it 'should not a new chatroom if the chatroom has a whitespace name' do
        user = User.create(username: 'existing_user')
        name = ' '
        twist = 'twist'
        expect do
          post '/graphql', params: { query: query(username: user.username, name:, prompt: twist) }
        end.to change { Chatroom.count }.by(0)
        expect(Chatroom.where(user_id: user.id)
                          .where(name:).where(prompt: twist).count).to be(0)
      end

      it 'should not add new chatroom if the chatroom has no valid owner' do
        fake_username = 'bob_and_alice'
        name = 'name'
        twist = 'twist'
        expect do
          post '/graphql', params: { query: query(username: fake_username, name:, prompt: twist) }
        end.to change { Chatroom.count }.by(0)
        json = JSON.parse(response.body)
        expect(json['data']['createChatroom']['errors']).to eq [
          {
            'message' => "User, #{fake_username} does not exist",
            'path'    => %w[attributes ArgumentError]
          }
        ]
      end

      it 'should not add new chatroom if the chatroom already exists' do
        user = User.create(username: 'bozo')
        name = 'duplicate'
        twist = 'twist'
        Chatroom.create(user:, name:, prompt: twist)
        expect do
          post '/graphql', params: { query: query(username: user.username, name:, prompt: twist) }
        end.to change { Chatroom.count }.by(0)
        json = JSON.parse(response.body)

        expected_error_message = "Chatroom with owner, #{user.username} and name #{name} already exists."
        expect(json['data']['createChatroom']['errors']).to eq [
          {
            'message' => expected_error_message,
            'path'    => %w[attributes ArgumentError]
          }
        ]
      end

      it 'returns a list of errors if there is an error on save' do
        allow_any_instance_of(Chatroom).to receive(:save) do |room|
          room.errors.add('path', 'fake error')
          room.errors.add('path2', 'fake error2')
          false
        end
        user = User.create(username: 'existing_user')
        name = 'room'
        twist = 'twist'

        post '/graphql', params: { query: query(username: user.username, name:, prompt: twist) }

        json = JSON.parse(response.body)
        data = json['data']['createChatroom']

        expect(data['errors'][0]['message']).to eq 'fake error'
        expect(data['errors'][0]['path']).to eq %w[attributes path]
        expect(data['errors'][1]['message']).to eq 'fake error2'
        expect(data['errors'][1]['path']).to eq %w[attributes path2]
      end
    end
  end
end
