const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-start text-center h-screen gap-y-10">
      <h1 className="text-2xl group transform">
        <span className="group-hover:text-blue-900 group-hover:-scale-y-100 transform inline-block transition duration-500 mt-10">
          Twist
        </span>{' '}
        Chatrooms
      </h1>
    </div>
  )
}

export default HomePage
