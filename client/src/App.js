import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Match } from './pages/Match';
import { Profile } from './pages/Profile';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

//import our assets (fonts)
import './assets/fonts/LEMONMILK-Medium.woff';
import './assets/fonts/LEMONMILK-Medium.woff2';
import './assets/fonts/LEMONMILK-Regular.woff';
import './assets/fonts/LEMONMILK-Regular.woff2';

// construct main graphql endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

//in order attach our JWT token to every request as an authorization header
const authLink = setContext((_, { headers }) => {
  //get auth token from local storage
  const token = localStorage.getItem('id_token');
  //return the headers to our App context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//set up our ApolloClient
const client = new ApolloClient({
  //allows client to execute authLink middleware prior to making request to our protected GraphQL API
  link: authLink.concat(httpLink),
  cache: InMemoryCache,
  onError: (e) => console.log(e),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/me' element={<Dashboard />} />
              <Route path='/about' element={<About />} />
              <Route path='/profiles/' element={<Profile />} />
              <Route path='/profiles/:githubUser' element={<Profile />} />
              <Route path='/matches/:githubUser' element={<Match />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
