user = User.create!(
  username: "Admin"
)

general_chat = Chatroom.create!(
  name: "General Chat",
  user: user
)