import decode from 'jwt-decode';

export default class Auth {
    // Initializing important variables
    constructor(domain) {
        this.domain = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API :'http://localhost:3000' //API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(email, password) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/api/v1/users/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            this.setToken(res.auth_token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }


    signup(email, password, password_confirmation) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/api/v1/users`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                password_confirmation
            })
        }).then(res => {
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }


    projects(id) {
      console.log(id.user_id)
      return this.fetch(`${this.domain}/api/v1/projects?id=` +id.user_id,{
        method: 'GET',

      }).then(function(data){
        return Promise.resolve(data);
      })
    }

    todos(id) {

      return this.fetch(`${this.domain}/api/v1/todos?id=`+id,{
        method: 'GET',

      }).then(function(data){
        return Promise.resolve(data);
      })
    }



    deleteProject(id){
      return this.fetch(`${this.domain}/api/v1/projects/`+id,{
        method: 'DELETE',
      }).then(function(data){
        return Promise.resolve(data);

      })
    }

    updateCompleted(completed, id){
      console.log(completed)
      return this.fetch(`${this.domain}/api/v1/todos/`+id,{
        method: 'PUT',
        body: JSON.stringify({
            todo: {
              id,
              completed
            }
        })
      }).then(function(data){
        return Promise.resolve(data);

      })
    }


    newProject(name,description, profile) {
      var user_id = profile.user_id
      return this.fetch(`${this.domain}/api/v1/projects`,{
        method: 'POST',
        body: JSON.stringify({
            name,
            description,
            user_id

        })
      }).then(function(data){
        return Promise.resolve(data);
      })
    }


    editProject(name,description,project) {
      return this.fetch(`${this.domain}/api/v1/projects/`+project,{
        method: 'PUT',
        body: JSON.stringify({
            name,
            description,



        })
      }).then(function(data){
        return Promise.resolve(data);
      })
    }


    newTodo(name, project) {
      var project_id = project
      return this.fetch(`${this.domain}/api/v1/todos`,{
        method: 'POST',
        body: JSON.stringify({
            name,
            project_id

        })
      }).then(function(data){
        return Promise.resolve(data);
      })
    }

    deleteTodo(id){
      return this.fetch(`${this.domain}/api/v1/todos/`+id,{
        method: 'DELETE',
      }).then(function(data){
        return Promise.resolve(data);
      })

    }


    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }


}
