import BaseButton from '../components/Shared/BaseButton'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center text-center align-middle h-screen gap-y-10">
      <h1 className="text-9xl group transform">
        <span className="group-hover:text-purple-800 group-hover:-scale-y-100 transform inline-block transition duration-500">
          Twist
        </span>{' '}
        Chat
      </h1>
      <div>
        <Link to="/login">
          <BaseButton text="Login" />
        </Link>
      </div>
    </div>
  )
}

export default HomePage
