import { FaUser, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='header'>
      <div className='user'>
				<Link to='/login'>
					<FaUser style={{color: "black", fontSize: 25}}/>
				</Link>
				<h1>Hamaad Yousaf</h1>
      </div>
			<div>
				<Link to='/cart'>
					<FaShoppingCart style={{color: "black", fontSize: 25}}/>
				</Link>
			</div>
    </header>
  )
}
