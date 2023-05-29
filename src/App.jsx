import { useEffect, useState } from 'react'
import './App.css'

function App() {
	const [users , setUsers] = useState([]);
	
	useEffect( ()=>{
		fetch('http://localhost:5000/users')
		.then(res => res.json())
		.then(data => setUsers(data))

	},[]);

	const handleUserCreate = event => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const user = {name , email};
		console.log(user);

		fetch('http://localhost:5000/users' ,{
			method: 'POST',
			headers: {
				'content-type' : 'application/json',
			},
			body: JSON.stringify(user)
		})
		.then(res => res.json())
		.then(data => {
			form.reset();
			const newUser = [...users , data];
			setUsers(newUser);

			console.log(data)
		})


	}

	


  return (
    <>
		
      <h1>User management System</h1>

	  <form onSubmit={handleUserCreate}>
			<input type="name" name="name" placeholder="your Name"  required/> <br/>
			<input type="email" name="email" placeholder="your email"  required/> <br/>
			<button>Create User</button>
	  </form>
	  {
		users.map(user => <div className="sui" key={user.id}>
			<p>id: {user.id}</p>
			<h5>Name: {user.name}</h5>
			<p>Email: <a href="">{user.email}</a></p>
		</div>)
	  }
    </>
  )
}

export default App
