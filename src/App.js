import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavbarComponant from './Components/Navbar/Navbar';
import Home from './Components/Pages/Home/Home';
import Hotels from './Components/Pages/Hotels/Hotels';
import Flight from './Components/Pages/Flight/Flight';
import Holidays from './Components/Pages/Holidays/Holidays';
import NotFound from './Components/Pages/Not-found/NotFound';
import Registeration from './Components/Pages/Registration/Registration';
import Login from './Components/Pages/Login/Login';
import BookHotel from './Components/Pages/BookHotel/BookHotel';

import BookForm from './Components/Shared/BookForm/BookForm';
import { DarkModeProvider } from './context/DarkMode';

import RootGuard from './Guard/RootGuard';
import GuardedRoute from './Guard/RouteGuard';
import UserDetails from './Components/Pages/UserDetails/UserDetails';
import BookHoliday from './Components/Pages/BookHoliday/BookHoliday';
import UserReservations from './Components/Pages/UserReservations/UserReservations';


import React from 'react';
import UserHolidayRes from './Components/Pages/UserReservations/UserHolidayRes';
import Payment from './Components/Payment/Payment';
import Forbiden from './Components/Pages/Forbiden/Forbiden';
import StripePayment from './Components/Shared/Stripe/StripePayment';

function App() {
  return (

    <BrowserRouter>
      <RootGuard>

        <DarkModeProvider >
          <NavbarComponant />
          <Switch>
            <Route
              path={'/'}
              exact
              component={Home}
            />
            <Route
              path={'/home'}
              component={Home}
            />
            <Route
              exact
              path={'/hotels'}
              component={Hotels}
            />

            <Route
              path={'/flight'}
              component={Flight}
            />
            <Route
              exact
              path={'/holidays'}
              component={Holidays}
            />
            <Route
              path={'/holiday'}
              component={Holidays}
            />

            <Route
              path={'/login'}
              component={Login}
            />
            <Route
              path={'/register'}
              component={Registeration}
            />
            <Route
              path={'/book'}
              component={BookForm}
            />
            <Route
              path={'/userholidayReservation'}
              component={UserHolidayRes}
            />
             <Route
              path={'/stripe'}
              component={StripePayment}
            />

            <Route path={"/forbiden"} component={Forbiden} />


            <GuardedRoute
              path={'/holidays/:id'}
              component={BookHoliday}
            />
            <GuardedRoute
              path={'/payment'}
              component={Payment}
            />
            <GuardedRoute
              path={'/reservation'}
              component={UserReservations}
            />

            <GuardedRoute
              path={'/hotels/:id'}
              component={BookHotel}
            />
            <GuardedRoute
              path={'/user/profile'}
              exact
              component={UserDetails} />
            <Route
              path={'*'}
              component={NotFound}
            />
          </Switch>
        </DarkModeProvider>
      </RootGuard>

    </BrowserRouter>

  );
}

export default App;
