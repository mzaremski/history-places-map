import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Container, Menu} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import Home from './pages/Home';



class App extends React.Component {
  render() {
      return (
        <Router>
            <Container fluid>
                <Menu style={{"marginBottom": 0,position: "relative", zIndex: 1000000}}>
                    <Menu.Item header>Historical places map</Menu.Item>
                    <Menu.Item href="/" name='Home'/>
                    <Menu.Item href="/addplace" name='Dodaj Miejsce'/>
                </Menu>

                <Route exact path="/" render={() => <Home appMode="showMarkers"/>} />
                {/* {render={() => <Home sidebar={} />} */}
                <Route exact path="/addplace"  render={() => <Home appMode="addPlace"/>} />

                {/* <Route path="/project/:projectId" component={Project}/> */}
            </Container>
        </Router>
      );
  }
}

export default App;