import { FaUser, FaShoppingCart } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

export default function Header() {
	const {user} = useSelector((state) => state.auth)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	function handleLogout(){
		dispatch(logout())
		dispatch(reset())
		navigate('/')
	}

	return (
    <header className='header'>
      <div className='user'>
				{user ? (
					<>
						<FaUser style={{color: "black", fontSize: 25}}/>
						<h1>{user.name} | </h1>
						<button onClick={handleLogout}>
							Logout
						</button>
					</>
				) : (
					<>
						<Link to='/login'>
							<FaUser style={{color: "black", fontSize: 25}}/>
						</Link>
						<Link to='/login' style={{textDecoration: "none"}}>
							<h1>Login</h1>
						</Link>
					</>
				)}
      </div>
			<div className='cart'>
				{user && 
					<Link to='/cart' style={{textDecoration: "none"}}>
						<div className='qty-container'>
							{user.cart ? (
								<h1 className='qty'>{user.cart.length}</h1>
							): (
								<h1 className='qty'>0</h1>
							)}
						</div>
					</Link>
				}
				<Link to={user ? "/cart" : "/login"}>
					<FaShoppingCart style={{color: "black", fontSize: 25}}/>
				</Link>
			</div>
    </header>
	)
}
