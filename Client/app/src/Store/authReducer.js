const initialState = {
    auth:{
        isAuthenticated: false
    }
}

export default function auth (state = initialState , action) {
    switch (action.type) {
        case 'LoggedIn': {
            localStorage.setItem('userId',action.userId.toString());
            return {
                auth : {
                    isAuthenticated: true,
                    userId: action.userId
                }
            }
        }
        case 'Logout': {
            localStorage.clear();
            return {
                auth: {
                    isAuthenticated: false
                }
            }
        }
        default :
            return state;
    }



}
