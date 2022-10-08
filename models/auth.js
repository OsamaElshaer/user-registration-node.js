let users = [{id:1,username:"osama",password:"1234"}]

module.exports = {
    findBy:(target,value)=>users.find(u=>u[target]===value),
    getUsers : ()=>{users},
    addUser:(user)=>{users.push({id:users.length+1,...user})}
}